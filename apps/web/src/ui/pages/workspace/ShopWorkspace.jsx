import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShopWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] bg-background">
      <div className="flex items-center gap-4 p-6 border-b border-border bg-card">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Store className="w-6 h-6 text-zone" />
          <h1 className="text-2xl font-bold text-foreground">My Shop</h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-zone-soft">
        <div className="bg-card p-10 rounded-2xl shadow-sm border border-border text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-foreground mb-4">My Shop workspace</h2>
          <p className="text-muted-foreground">Coming in D5</p>
        </div>
      </div>
    </div>
  );
}