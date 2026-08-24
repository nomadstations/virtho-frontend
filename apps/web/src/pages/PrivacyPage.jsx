import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from '@/components/SharedUI';

function PrivacyPage() {
  return (
    <>
      <Helmet><title>Privacy Policy - Virtho Foundation</title></Helmet>
      <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
        <Card className="p-8 prose prose-purple max-w-none">
          <p>Last updated: October 2025</p>
          <p>Virtho Foundation ("us", "we", or "our") operates the virtho.com website (the "Service").</p>
          <h2>1. Information Collection And Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <h2>2. Types of Data Collected</h2>
          <p>Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.</p>
        </Card>
      </main>
    </>
  );
}

export default PrivacyPage;