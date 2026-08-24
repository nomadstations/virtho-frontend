import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from '@/components/SharedUI';

function TermsPage() {
  return (
    <>
      <Helmet><title>Terms of Use - Virtho Foundation</title></Helmet>
      <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Use</h1>
        <Card className="p-8 prose prose-purple max-w-none">
          <p>Last updated: October 2025</p>
          <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the Virtho Foundation platform.</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
          <h2>2. User Accounts</h2>
          <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times.</p>
        </Card>
      </main>
    </>
  );
}

export default TermsPage;