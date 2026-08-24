import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InsuranceCard({ provider, policyNumber, type, coverage, expiryDate, status }) {
  return (
    <div className="health-project-card p-6 flex flex-col group h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
            <Shield className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{provider}</h3>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </span>
      </div>
      <div className="space-y-3 mb-6 flex-grow text-sm border-t border-gray-50 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Policy Number</span>
          <span className="font-medium text-gray-900">{policyNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Coverage</span>
          <span className="font-medium text-gray-900">{coverage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Valid Until</span>
          <span className="font-medium text-gray-900">{expiryDate}</span>
        </div>
      </div>
      <div className="flex justify-end mt-auto border-t border-gray-100 pt-4">
        <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
          View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}