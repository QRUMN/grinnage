import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs';
import {
  MessageSquare,
  Mail,
  Phone,
  Bell,
  Calendar,
  Send,
  Plus,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { propertyApi } from '@/lib/api/property';

const MESSAGE_TEMPLATES = [
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    subject: 'Upcoming Service Appointment Reminder',
    content: 'Dear {clientName},\n\nThis is a reminder of your upcoming service appointment scheduled for {appointmentDate} at {appointmentTime}.\n\nService Details:\n- Type: {serviceType}\n- Location: {location}\n- Technician: {technicianName}\n\nPlease ensure someone is available to provide access to the property.\n\nBest regards,\n{companyName}',
  },
  {
    id: 'service-completion',
    name: 'Service Completion',
    subject: 'Service Completion Report',
    content: 'Dear {clientName},\n\nWe have completed the {serviceType} at {location}. Here is a summary of the work performed:\n\n{serviceDetails}\n\nNext scheduled service: {nextServiceDate}\n\nIf you have any questions or concerns, please don\'t hesitate to contact us.\n\nBest regards,\n{companyName}',
  },
  {
    id: 'payment-reminder',
    name: 'Payment Reminder',
    subject: 'Payment Reminder',
    content: 'Dear {clientName},\n\nThis is a friendly reminder that payment for recent services ({serviceType}) is due. Amount due: ${amount}\n\nPayment can be made through our online portal or by contacting our office.\n\nThank you for your business!\n\nBest regards,\n{companyName}',
  },
];

const NOTIFICATION_TYPES = [
  'Appointment Reminder',
  'Service Completion',
  'Payment Due',
  'Follow-up',
  'Emergency Alert',
];

export function ClientCommunication() {
  const queryClient = useQueryClient();
  const [selectedClient, setSelectedClient] = React.useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [isComposing, setIsComposing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('messages');

  const { data: messages } = useQuery({
    queryKey: ['client-messages', selectedClient],
    queryFn: () => propertyApi.getClientMessages(selectedClient),
  });

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => propertyApi.getNotifications(),
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data: any) => propertyApi.sendMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['client-messages']);
      toast.success('Message sent successfully');
      setIsComposing(false);
    },
    onError: () => {
      toast.error('Failed to send message');
    },
  });

  const scheduleNotificationMutation = useMutation({
    mutationFn: (data: any) => propertyApi.scheduleNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      toast.success('Notification scheduled');
    },
    onError: () => {
      toast.error('Failed to schedule notification');
    },
  });

  const renderMessageHistory = () => (
    <div className="space-y-4">
      {messages?.map((message: any) => (
        <Card
          key={message.id}
          className={`p-4 ${
            message.sender === 'company' ? 'ml-12' : 'mr-12'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                message.sender === 'company'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.sender === 'company' ? (
                <MessageSquare className="h-4 w-4" />
              ) : (
                <Users className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {message.sender === 'company'
                    ? 'Company'
                    : message.senderName}
                </p>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(message.timestamp), 'PPp')}
                </span>
              </div>
              <div className="mt-1">
                <p>{message.content}</p>
                {message.attachments?.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {message.attachments.length} attachment(s)
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center space-x-2">
                {message.status === 'sent' && (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Sent</span>
                  </Badge>
                )}
                {message.status === 'delivered' && (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Delivered</span>
                  </Badge>
                )}
                {message.status === 'read' && (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Read</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notifications?.map((notification: any) => (
        <Card key={notification.id} className="p-4">
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-lg ${
                notification.type === 'Appointment Reminder'
                  ? 'bg-blue-500/10 text-blue-500'
                  : notification.type === 'Payment Due'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : notification.type === 'Emergency Alert'
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-green-500/10 text-green-500'
              }`}
            >
              {notification.type === 'Appointment Reminder' && (
                <Calendar className="h-4 w-4" />
              )}
              {notification.type === 'Payment Due' && (
                <AlertTriangle className="h-4 w-4" />
              )}
              {notification.type === 'Emergency Alert' && (
                <Bell className="h-4 w-4" />
              )}
              {notification.type === 'Service Completion' && (
                <CheckCircle className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.recipient}
                  </p>
                </div>
                <Badge variant="outline">
                  {notification.status}
                </Badge>
              </div>
              <p className="mt-2">{notification.message}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    Scheduled for:{' '}
                    {format(new Date(notification.scheduledFor), 'PPp')}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>
                    Channel: {notification.channel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Client Communication</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              // Handle notification settings
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
          <Button
            onClick={() => setIsComposing(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>New Message</span>
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages and notifications..."
                className="pl-8"
              />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              {/* Client options */}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          {renderMessageHistory()}
        </TabsContent>

        <TabsContent value="notifications">
          <div className="mb-4">
            <Button
              onClick={() => {
                // Handle scheduling notification
              }}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Schedule Notification</span>
            </Button>
          </div>
          {renderNotifications()}
        </TabsContent>
      </Tabs>

      <Dialog
        open={isComposing}
        onClose={() => setIsComposing(false)}
      >
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <Select
                value={selectedTemplate || ''}
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {MESSAGE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Enter subject"
                value={
                  selectedTemplate
                    ? MESSAGE_TEMPLATES.find((t) => t.id === selectedTemplate)
                        ?.subject
                    : ''
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                rows={6}
                value={
                  selectedTemplate
                    ? MESSAGE_TEMPLATES.find((t) => t.id === selectedTemplate)
                        ?.content
                    : ''
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Attachments</label>
              <Input type="file" multiple />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsComposing(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle message sending
                }}
                className="flex items-center space-x-1"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
