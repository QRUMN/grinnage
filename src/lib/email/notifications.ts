import { createTransport } from 'nodemailer';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/components/email/EmailTemplate';
import React from 'react';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export type EmailNotificationType =
  | 'WELCOME'
  | 'PASSWORD_RESET'
  | 'ACCOUNT_LOCKED'
  | 'LOGIN_ALERT'
  | 'DOCUMENT_UPLOADED'
  | 'REPORT_READY'
  | 'ROLE_CHANGED';

interface EmailNotificationProps {
  to: string;
  type: EmailNotificationType;
  data: Record<string, any>;
}

export async function sendEmailNotification({
  to,
  type,
  data,
}: EmailNotificationProps) {
  const templates: Record<EmailNotificationType, { subject: string; template: React.ComponentType<any> }> = {
    WELCOME: {
      subject: 'Welcome to Grinnage Ex',
      template: EmailTemplate.Welcome,
    },
    PASSWORD_RESET: {
      subject: 'Password Reset Request',
      template: EmailTemplate.PasswordReset,
    },
    ACCOUNT_LOCKED: {
      subject: 'Account Security Alert',
      template: EmailTemplate.AccountLocked,
    },
    LOGIN_ALERT: {
      subject: 'New Login Detected',
      template: EmailTemplate.LoginAlert,
    },
    DOCUMENT_UPLOADED: {
      subject: 'New Document Upload',
      template: EmailTemplate.DocumentUploaded,
    },
    REPORT_READY: {
      subject: 'Your Report is Ready',
      template: EmailTemplate.ReportReady,
    },
    ROLE_CHANGED: {
      subject: 'Role Update Notification',
      template: EmailTemplate.RoleChanged,
    },
  };

  const { subject, template: Template } = templates[type];
  const html = render(React.createElement(Template, data));

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email notification');
  }
}

// Email queue system for bulk notifications
interface QueuedEmail extends EmailNotificationProps {
  priority: 'high' | 'medium' | 'low';
  scheduledFor?: Date;
}

class EmailQueue {
  private queue: QueuedEmail[] = [];
  private processing = false;

  add(email: QueuedEmail) {
    this.queue.push(email);
    this.process();
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const now = new Date();

    try {
      // Process emails that are scheduled for now or earlier
      const readyEmails = this.queue.filter(
        email => !email.scheduledFor || email.scheduledFor <= now
      );

      // Sort by priority
      readyEmails.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      // Process each email
      for (const email of readyEmails) {
        await sendEmailNotification(email);
        this.queue = this.queue.filter(e => e !== email);
      }
    } catch (error) {
      console.error('Error processing email queue:', error);
    } finally {
      this.processing = false;
      
      // If there are still emails in the queue, continue processing
      if (this.queue.length > 0) {
        setTimeout(() => this.process(), 1000);
      }
    }
  }
}

export const emailQueue = new EmailQueue();
