import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/store/auth';
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
  const { user } = useAuth();

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
          <Route
            element={
              <AuthGuard allowedRoles={['residential' as UserRole]}>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route path="/dashboard" element={<ResidentialDashboard />} />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/wallet" element={<Wallet />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/alerts" element={<Alerts />} />
          </Route>

          {/* Commercial Dashboard */}
          <Route
            element={
              <AuthGuard allowedRoles={['commercial' as UserRole]}>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route path="/commercial" element={<CommercialDashboard />} />
            <Route path="/commercial/properties" element={<Overview />} />
            <Route path="/commercial/contracts" element={<Documents />} />
            <Route path="/commercial/billing" element={<Billing />} />
            <Route path="/commercial/wallet" element={<Wallet />} />
            <Route path="/commercial/settings" element={<Settings />} />
            <Route path="/commercial/reports" element={<Overview />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            element={
              <AuthGuard allowedRoles={['admin' as UserRole]}>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Overview />} />
            <Route path="/admin/properties" element={<Overview />} />
            <Route path="/admin/reports" element={<Overview />} />
            <Route path="/admin/wallet" element={<AdminWallet />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/logs" element={<Overview />} />
          </Route>

          {/* Redirect root to appropriate dashboard based on user role */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={
                    user.role === 'admin'
                      ? '/admin'
                      : user.role === 'commercial'
                      ? '/commercial'
                      : '/dashboard'
                  }
                  replace
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;