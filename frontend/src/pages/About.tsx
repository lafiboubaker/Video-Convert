import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4">
        QuickConvert is a website specialized in converting videos from various platforms to MP4 and MP3 formats easily and quickly.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Fast and efficient conversion</li>
        <li>Support for various platforms (YouTube, Facebook, TikTok, Instagram)</li>
        <li>Simple and user-friendly interface</li>
        <li>No login or personal data required</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Vision</h2>
      <p className="mb-4">
        We aim to provide a simple and effective tool for video conversion while maintaining user privacy.
      </p>
    </div>
  );
};

export default About;
