import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We are not responsible for any copyright infringement that may occur by users.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Fair Use Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The site should be used for personal purposes only and in accordance with copyright laws.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Service Limitations</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right to limit or terminate the service at any time without prior notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
