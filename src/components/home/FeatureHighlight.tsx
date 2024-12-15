import React from 'react';
import { Bug, ShieldCheck, Leaf, Clock } from 'lucide-react';

const features = [
  {
    icon: <Bug className="w-12 h-12" />,
    title: "Expert Pest Control",
    description: "Our certified technicians use the latest techniques and equipment for effective pest elimination."
  },
  {
    icon: <ShieldCheck className="w-12 h-12" />,
    title: "Safe & Reliable",
    description: "Family and pet-friendly solutions that protect your space without compromising safety."
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: "Eco-Friendly",
    description: "Environmentally conscious pest control methods that are sustainable and effective."
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Support",
    description: "Round-the-clock emergency service for immediate pest control needs."
  }
];

export const FeatureHighlight = () => {
  return (
    <section className="py-24 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-secondary-600 dark:text-secondary-300">
            Professional pest control solutions for your peace of mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-secondary-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6 text-primary-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white text-center">
                {feature.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};