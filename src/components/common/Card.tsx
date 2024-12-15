import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'glass';
}

export const Card = ({ children, className, variant = 'solid' }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-300',
        variant === 'solid' && 'bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl',
        variant === 'glass' && 'bg-white/90 dark:bg-dark-800/90 backdrop-blur-lg border border-dark-200/20 dark:border-dark-700/20',
        className
      )}
    >
      {children}
    </div>
  );
};