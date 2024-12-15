import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AuthGuard } from './components/auth/AuthGuard';

// Dashboards
import { ResidentialDashboard } from './components/dashboard/residential/ResidentialDashboard';
import { CommercialDashboard } from './components/dashboard/commercial/CommercialDashboard';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard/*" element={
          <AuthGuard allowedRoles={['residential']}>
            <ResidentialDashboard />
          </AuthGuard>
        } />

        <Route path="/commercial/*" element={
          <AuthGuard allowedRoles={['commercial']}>
            <CommercialDashboard />
          </AuthGuard>
        } />

        <Route path="/admin/*" element={
          <AuthGuard allowedRoles={['admin']}>
            <AdminDashboard />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
};

export default App;