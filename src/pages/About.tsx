import React from 'react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            About Grinnage Ex
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your trusted partner in property management solutions
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Grinnage Ex, we're dedicated to revolutionizing property management through innovative
              technology solutions. Our platform streamlines the entire property management process,
              making it easier for property managers and tenants alike.
            </p>
          </section>

          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            <ul className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Innovation:</strong> We continuously strive to improve and innovate our
                solutions
              </li>
              <li>
                <strong>Reliability:</strong> We provide dependable service you can count on
              </li>
              <li>
                <strong>Transparency:</strong> We believe in open and honest communication
              </li>
              <li>
                <strong>Excellence:</strong> We maintain high standards in everything we do
              </li>
            </ul>
          </section>

          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our team consists of experienced professionals in property management, technology, and
              customer service. We work together to provide you with the best possible experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
