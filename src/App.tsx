import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AuthGuard } from './components/auth/AuthGuard';

// Dashboard Pages
import { Overview } from './pages/dashboard/Overview';
import { Appointments } from './pages/dashboard/Appointments';
import { Documents } from './pages/dashboard/Documents';
import { Billing } from './pages/dashboard/Billing';
import { Settings } from './pages/dashboard/Settings';
import { Notifications } from './pages/dashboard/Notifications';
import { Alerts } from './pages/dashboard/Alerts';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <AuthGuard allowedRoles={['residential']}>
            <DashboardLayout />
          </AuthGuard>
        }>
          <Route index element={<Overview />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="documents" element={<Documents />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>

        {/* Commercial Dashboard */}
        <Route path="/commercial/*" element={
          <AuthGuard allowedRoles={['commercial']}>
            <DashboardLayout />
          </AuthGuard>
        } />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={
          <AuthGuard allowedRoles={['admin']}>
            <DashboardLayout />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
};

export default App;