import React from 'react';
import { Check, Shield, Building2, Home } from 'lucide-react';

const packages = [
  {
    icon: <Home className="w-12 h-12" />,
    name: "Basic Protection",
    price: 99,
    type: "residential",
    features: [
      "Quarterly inspections",
      "Common pest treatment",
      "Free re-service",
      "Basic warranty"
    ]
  },
  {
    icon: <Shield className="w-12 h-12" />,
    name: "Advanced Guard",
    price: 199,
    type: "residential",
    features: [
      "Monthly inspections",
      "All pest treatment",
      "Priority service",
      "Extended warranty",
      "Preventive treatments"
    ]
  },
  {
    icon: <Building2 className="w-12 h-12" />,
    name: "Commercial Elite",
    price: 399,
    type: "commercial",
    features: [
      "Weekly inspections",
      "Complete pest management",
      "24/7 emergency response",
      "Compliance reporting",
      "Staff training",
      "Custom solutions"
    ]
  }
];

export const Services = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Service Packages
          </h2>
          <p className="mt-4 text-xl text-secondary-600 dark:text-secondary-300">
            Choose the perfect protection plan for your needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white dark:bg-secondary-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center text-primary-500 mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white text-center mb-2">
                {pkg.name}
              </h3>
              <p className="text-center text-secondary-600 dark:text-secondary-400 capitalize mb-6">
                {pkg.type}
              </p>
              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-primary-500">${pkg.price}</span>
                <span className="text-secondary-500 dark:text-secondary-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-secondary-700 dark:text-secondary-300">
                    <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};