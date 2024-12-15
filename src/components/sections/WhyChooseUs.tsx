import React from 'react';
import { Shield, Clock, Award, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Licensed & Insured",
    description: "Fully certified professionals with comprehensive insurance coverage for your peace of mind."
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "24/7 Emergency Service",
    description: "Round-the-clock support for urgent pest control needs with rapid response times."
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Guaranteed Results",
    description: "Our proven methods ensure lasting results, backed by our satisfaction guarantee."
  },
  {
    icon: <Leaf className="w-12 h-12" />,
    title: "Eco-Friendly Solutions",
    description: "Environmental-conscious pest control methods safe for your family and pets."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-white">
            Why Choose Us
          </h2>
          <p className="mt-4 text-xl text-dark-600 dark:text-dark-300">
            Experience the difference with our professional pest control services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4 text-mint-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-dark-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-dark-600 dark:text-dark-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};