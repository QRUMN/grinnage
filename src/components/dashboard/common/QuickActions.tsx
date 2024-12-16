import React, { useState } from 'react';
import { Command } from 'cmdk';
import {
  Calendar,
  Search,
  Plus,
  FileText,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Clock,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  shortcut?: string[];
  action: () => void;
}

interface QuickActionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActions = ({ isOpen, onClose }: QuickActionsProps) => {
  const [search, setSearch] = useState('');

  const quickActions: QuickAction[] = [
    {
      id: 'schedule',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Schedule Appointment',
      description: 'Book a new service appointment',
      shortcut: ['⌘', 'K', 'S'],
      action: () => {
        console.log('Schedule appointment');
        onClose();
      },
    },
    {
      id: 'report',
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'Report Issue',
      description: 'Report a pest control issue',
      shortcut: ['⌘', 'K', 'R'],
      action: () => {
        console.log('Report issue');
        onClose();
      },
    },
    {
      id: 'message',
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Send Message',
      description: 'Contact your service provider',
      shortcut: ['⌘', 'K', 'M'],
      action: () => {
        console.log('Send message');
        onClose();
      },
    },
    {
      id: 'document',
      icon: <FileText className="h-5 w-5" />,
      label: 'View Documents',
      description: 'Access service reports and contracts',
      shortcut: ['⌘', 'K', 'D'],
      action: () => {
        console.log('View documents');
        onClose();
      },
    },
    {
      id: 'payment',
      icon: <CreditCard className="h-5 w-5" />,
      label: 'Make Payment',
      description: 'Pay your outstanding balance',
      shortcut: ['⌘', 'K', 'P'],
      action: () => {
        console.log('Make payment');
        onClose();
      },
    },
    {
      id: 'reschedule',
      icon: <Clock className="h-5 w-5" />,
      label: 'Reschedule Service',
      description: 'Change your upcoming appointment',
      shortcut: ['⌘', 'K', 'C'],
      action: () => {
        console.log('Reschedule service');
        onClose();
      },
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed left-1/2 top-1/4 w-full max-w-xl -translate-x-1/2 p-4">
        <Command className="rounded-xl border shadow-md bg-white">
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 shrink-0 text-gray-500" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-gray-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>
            {quickActions.map((action) => (
              <Command.Item
                key={action.id}
                value={action.label}
                onSelect={action.action}
                className="group relative flex cursor-pointer items-center rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white">
                  {action.icon}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                {action.shortcut && (
                  <div className="ml-auto flex items-center">
                    {action.shortcut.map((key, index) => (
                      <React.Fragment key={index}>
                        <kbd className="rounded bg-gray-100 px-2 py-1 text-xs">
                          {key}
                        </kbd>
                        {index < action.shortcut!.length - 1 && (
                          <ChevronRight className="mx-1 h-3 w-3 text-gray-500" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
