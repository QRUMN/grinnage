import React from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Section = ({ children, className, title, subtitle }: SectionProps) => {
  return (
    <section className={cn('py-24', className)}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl font-bold text-dark-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-xl text-dark-600 dark:text-dark-300">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};