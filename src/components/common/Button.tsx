import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
        variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500',
        variant === 'secondary' && 'bg-light-100 text-dark-900 hover:bg-light-200 dark:bg-dark-800 dark:text-light-50 dark:hover:bg-dark-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};