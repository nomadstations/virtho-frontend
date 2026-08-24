import React from 'react';

export default function SummaryCard({ number, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-3xl font-bold text-foreground mb-1">{number}</div>
      <div className="text-sm font-medium text-muted-foreground text-center uppercase tracking-wide">{label}</div>
    </div>
  );
}