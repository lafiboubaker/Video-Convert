import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At QuickConvert, we take your privacy seriously. Here's what you should know:
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">What We Don't Collect</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>We don't collect any personal data</li>
        <li>We don't use cookies</li>
        <li>We don't require login</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Data Protection</h2>
      <p className="mb-4">
        All conversions are done securely and instantly, and no data is stored on our servers.
      </p>
    </div>
  );
};

export default Privacy;
