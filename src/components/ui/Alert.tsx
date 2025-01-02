import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'error' | 'warning' | 'success';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const Icon = {
      default: Info,
      error: XCircle,
      warning: AlertCircle,
      success: CheckCircle2,
    }[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          {
            'bg-gray-50 text-gray-900 border-gray-200': variant === 'default',
            'bg-red-50 text-red-900 border-red-200': variant === 'error',
            'bg-yellow-50 text-yellow-900 border-yellow-200': variant === 'warning',
            'bg-green-50 text-green-900 border-green-200': variant === 'success',
          },
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-4">
          <Icon className="h-5 w-5" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export { Alert };
