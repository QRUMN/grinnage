import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AuthGuard } from './components/auth/AuthGuard';
import { Wallet } from './components/wallet/Wallet';
import { AdminWallet } from './pages/dashboard/admin/AdminWallet';
import { useTheme } from './hooks/useTheme';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Dashboard Pages
import { ResidentialDashboard } from './pages/dashboard/residential/ResidentialDashboard';
import { CommercialDashboard } from './pages/dashboard/commercial/CommercialDashboard';
import { AdminDashboard } from './pages/dashboard/admin/AdminDashboard';
import { Overview } from './pages/dashboard/Overview';
import { Appointments } from './pages/dashboard/Appointments';
import { Documents } from './pages/dashboard/Documents';
import { Billing } from './pages/dashboard/Billing';
import { Settings } from './pages/dashboard/Settings';
import { Notifications } from './pages/dashboard/Notifications';
import { Alerts } from './pages/dashboard/Alerts';

function App() {
  const { mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Residential Dashboard */}
          <Route path="/dashboard" element={
            <AuthGuard allowedRoles={['residential']}>
              <DashboardLayout />
            </AuthGuard>
          }>
            <Route index element={<ResidentialDashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="documents" element={<Documents />} />
            <Route path="billing" element={<Billing />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>

          {/* Commercial Dashboard */}
          <Route path="/commercial" element={
            <AuthGuard allowedRoles={['commercial']}>
              <DashboardLayout />
            </AuthGuard>
          }>
            <Route index element={<CommercialDashboard />} />
            <Route path="properties" element={<Overview />} />
            <Route path="contracts" element={<Documents />} />
            <Route path="billing" element={<Billing />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Overview />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={
            <AuthGuard allowedRoles={['admin']}>
              <DashboardLayout />
            </AuthGuard>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Overview />} />
            <Route path="properties" element={<Overview />} />
            <Route path="reports" element={<Overview />} />
            <Route path="wallet" element={<AdminWallet />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logs" element={<Overview />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;