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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600">
            Experience the difference with our professional pest control services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-blue-900">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};