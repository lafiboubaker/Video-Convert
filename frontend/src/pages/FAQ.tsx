import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">How does QuickConvert work?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            QuickConvert works by processing the video URL you provide, extracting the video, and converting it to your desired format.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Is QuickConvert free to use?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Yes, QuickConvert is completely free to use with no hidden fees.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">What platforms are supported?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We support YouTube, Facebook, TikTok, Instagram, and many other video platforms.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Is there a limit to how many videos I can convert?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            There is no strict limit, but we may implement fair usage policies during high traffic periods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
