import React from 'react';
import { Helmet } from 'react-helmet';
import { FileText, Scale, UserCheck, Heart, FileSignature, ShieldCheck } from 'lucide-react';
import { DocumentCard } from '@/components/health/DocumentCard';
import { HealthLayout } from '@/components/HealthLayout';

export default function LegalAndInsurancePage() {
  const legalDocuments = {
    consents: [
      {
        title: 'Informed Consent for Surgery',
        type: 'Medical Consent',
        dateCreated: 'January 15, 2026',
        dateModified: 'January 15, 2026',
        status: 'active',
        content: 'I hereby give my informed consent for the surgical procedure as discussed with my physician. I understand the risks, benefits, and alternatives to the proposed treatment.',
        icon: <FileSignature className="w-5 h-5 text-purple-600" />,
      },
      {
        title: 'General Treatment Consent',
        type: 'Healthcare Consent',
        dateCreated: 'March 10, 2025',
        dateModified: 'January 5, 2026',
        status: 'active',
        content: 'I consent to receive medical treatment and procedures as deemed necessary by my healthcare providers at authorized medical facilities.',
        icon: <FileSignature className="w-5 h-5 text-purple-600" />,
      },
    ],
    livingWill: [
      {
        title: 'Advance Healthcare Directive',
        type: 'Living Will',
        dateCreated: 'June 20, 2024',
        dateModified: 'December 1, 2025',
        status: 'active',
        content: 'This document outlines my wishes regarding medical treatment in the event that I become unable to communicate my decisions. I have specified my preferences for life-sustaining treatment, pain management, and organ donation.',
        icon: <Heart className="w-5 h-5 text-purple-600" />,
      },
      {
        title: 'Do Not Resuscitate Order',
        type: 'DNR Order',
        dateCreated: 'June 20, 2024',
        dateModified: 'June 20, 2024',
        status: 'draft',
        content: 'Instructions regarding cardiopulmonary resuscitation and emergency medical interventions in specific medical scenarios.',
        icon: <Heart className="w-5 h-5 text-purple-600" />,
      },
    ],
    powerOfAttorney: [
      {
        title: 'Healthcare Power of Attorney',
        type: 'Medical POA',
        dateCreated: 'August 5, 2024',
        dateModified: 'November 12, 2025',
        status: 'active',
        content: 'I designate Jane Doe as my healthcare agent to make medical decisions on my behalf if I am unable to do so. This includes decisions about treatment, procedures, and end-of-life care.',
        icon: <UserCheck className="w-5 h-5 text-purple-600" />,
      },
      {
        title: 'Financial Power of Attorney',
        type: 'Financial POA',
        dateCreated: 'August 5, 2024',
        dateModified: 'August 5, 2024',
        status: 'active',
        content: 'Authorization for designated individual to manage financial affairs and make financial decisions related to healthcare expenses and insurance claims.',
        icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      },
    ],
  };

  return (
    <HealthLayout
      title="Legal Documents & Directives"
      subtitle="Manage your healthcare legal documents and authorizations"
      icon={Scale}
    >
      <Helmet>
        <title>Legal Documents - Health Dashboard</title>
        <meta name="description" content="Manage your legal healthcare documents, advanced directives, and power of attorney designations." />
      </Helmet>

      {/* Informed Consents Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Informed Consents</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.consents.map((doc, idx) => (
            <DocumentCard key={idx} {...doc} />
          ))}
        </div>
      </div>

      {/* Living Will Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Living Will & Advanced Directives</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.livingWill.map((doc, idx) => (
            <DocumentCard key={idx} {...doc} />
          ))}
        </div>
      </div>

      {/* Power of Attorney Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Power of Attorney</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.powerOfAttorney.map((doc, idx) => (
            <DocumentCard key={idx} {...doc} />
          ))}
        </div>
      </div>

      {/* Information Banner */}
      <div className="health-project-card p-6 bg-purple-50/50 border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600 flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Document Security & Privacy</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All legal documents are encrypted and stored securely. Only authorized healthcare providers and designated individuals can access these documents. You can update or revoke access at any time through your account settings.
            </p>
          </div>
        </div>
      </div>
    </HealthLayout>
  );
}