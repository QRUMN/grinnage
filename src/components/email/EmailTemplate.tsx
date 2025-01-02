import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  previewText: string;
  heading: string;
  body: string;
  footerText?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  previewText,
  heading,
  body,
  footerText,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Text style={heading}>{heading}</Text>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>{body}</Text>
          </Section>
          {footerText && (
            <Section style={footer}>
              <Text style={footerContent}>{footerText}</Text>
            </Section>
          )}
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logo = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const content = {
  padding: '0 20px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  padding: '0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525f7f',
};

const footer = {
  padding: '32px 20px 0',
};

const footerContent = {
  fontSize: '12px',
  color: '#8898aa',
  lineHeight: '16px',
  textAlign: 'center' as const,
};
