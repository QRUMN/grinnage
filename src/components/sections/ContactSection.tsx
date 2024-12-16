import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    name: 'Phone Support',
    description: 'Mon-Fri from 8am to 6pm.',
    icon: Phone,
    contact: '(555) 123-4567',
  },
  {
    name: 'Email',
    description: '24/7 support for emergencies.',
    icon: Mail,
    contact: 'support@grinnage.com',
  },
  {
    name: 'Office',
    description: 'Visit us at our main office.',
    icon: MapPin,
    contact: '123 Main St, City, ST 12345',
  },
  {
    name: 'Hours',
    description: 'Emergency service available.',
    icon: Clock,
    contact: 'Mon-Fri: 8am-6pm',
  },
];

export const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Contact Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get in Touch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about our services? Need to schedule an appointment? 
              We're here to help you with all your pest control needs.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="lg:order-last">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:order-first">
              <dl className="space-y-10">
                {contactInfo.map((item) => (
                  <div key={item.name} className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </dt>
                    <dd className="flex flex-auto flex-col">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{item.description}</p>
                      <p className="mt-1 text-sm font-medium text-blue-600">{item.contact}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Map */}
              <div className="mt-10 rounded-lg bg-gray-100 p-4">
                <div className="aspect-[4/3] w-full rounded-lg bg-gray-200">
                  {/* Add your map component here */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    Map Component
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};