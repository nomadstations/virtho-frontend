import React from 'react';
import { Helmet } from 'react-helmet';
import { Gamepad2 } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <Helmet><title>Games - Virtho Foundation</title></Helmet>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center" style={{ borderTop: '4px solid hsl(var(--zone-culture))' }}>
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: 'hsl(var(--zone-culture-soft))', color: 'hsl(var(--zone-culture))' }}>
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Games</h1>
        <p className="text-gray-600 mb-6">Interactive experiences, simulations, and community-driven entertainment are coming soon.</p>
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: 'hsl(var(--zone-culture-soft))', color: 'hsl(var(--zone-culture-ink))' }}>
          Culture & Art Realm
        </div>
      </div>
    </div>
  );
}