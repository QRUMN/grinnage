import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ArrowRight, Award, Clock, Shield, Users } from 'lucide-react';

const features = [
  {
    name: 'Expert Team',
    description: 'Our certified professionals bring years of experience in pest control and management.',
    icon: Users,
  },
  {
    name: 'Quality Guarantee',
    description: 'We stand behind our work with a 100% satisfaction guarantee on all services.',
    icon: Award,
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock customer support for emergencies and inquiries.',
    icon: Clock,
  },
  {
    name: 'Safe Methods',
    description: 'Eco-friendly and pet-safe pest control solutions for your peace of mind.',
    icon: Shield,
  },
];

const stats = [
  { id: 1, name: 'Years in Business', value: '15+' },
  { id: 2, name: 'Satisfied Customers', value: '10,000+' },
  { id: 3, name: 'Service Areas', value: '50+' },
  { id: 4, name: 'Success Rate', value: '99%' },
];

export const AboutSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">About Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Trusted Partner in Pest Control
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Since 2009, Grinnage Pest Solutions has been providing top-tier pest control services
              to residential and commercial properties. Our commitment to excellence and customer
              satisfaction has made us a leader in the industry.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          <div className="mt-16 flex items-center justify-center gap-x-6">
            <Button variant="default" size="lg">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
