import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { EmergencyCallout } from '../sections/EmergencyCallout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-light-100 dark:bg-dark-900">
      <EmergencyCallout />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};