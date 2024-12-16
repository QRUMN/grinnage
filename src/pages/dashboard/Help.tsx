import React from 'react';
import { Search, Book, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Help() {
  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using our residential pest control services',
      icon: <Book className="h-5 w-5" />,
    },
    {
      title: 'Contact Support',
      description: 'Get in touch with our customer support team',
      icon: <Phone className="h-5 w-5" />,
    },
    {
      title: 'Email Us',
      description: 'Send us an email with your questions',
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Help Center</h2>
        <p className="text-sm text-muted-foreground">
          Find answers to your questions and get support
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="pl-9"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="grid gap-4 md:grid-cols-2">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {topic.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                  <Button variant="link" className="p-0">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
