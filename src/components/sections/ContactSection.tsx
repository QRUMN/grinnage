import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-4 text-xl text-dark-600 dark:text-dark-300">
            Get in touch with our pest control experts today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-dark-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-dark-900 dark:text-white">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-dark-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white shadow-sm focus:border-mint-400 focus:ring-mint-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-dark-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white shadow-sm focus:border-mint-400 focus:ring-mint-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-dark-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white shadow-sm focus:border-mint-400 focus:ring-mint-400"
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-dark-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-dark-900 dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-mint-400 mr-4" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Phone</p>
                  <p className="text-dark-600 dark:text-dark-400">1-800-PEST-CONTROL</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-mint-400 mr-4" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Email</p>
                  <p className="text-dark-600 dark:text-dark-400">contact@grinnage-extermination.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-mint-400 mr-4" />
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Address</p>
                  <p className="text-dark-600 dark:text-dark-400">123 Pest Control Street</p>
                  <p className="text-dark-600 dark:text-dark-400">City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};