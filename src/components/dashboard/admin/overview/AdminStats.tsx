import React from 'react';
import { Users, Building2, ShieldCheck, Activity } from 'lucide-react';
import { StatCard } from '../../common/StatCard';

export const AdminStats = () => {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: <Users className="w-8 h-8 text-[#56e39f]" />,
      change: "+12%"
    },
    {
      label: "Active Businesses",
      value: "456",
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      change: "+5%"
    },
    {
      label: "System Health",
      value: "98%",
      icon: <Activity className="w-8 h-8 text-green-500" />,
      change: "+1%"
    },
    {
      label: "Security Status",
      value: "Secure",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      change: "Stable"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          trend={stat.change}
        />
      ))}
    </div>
  );
};