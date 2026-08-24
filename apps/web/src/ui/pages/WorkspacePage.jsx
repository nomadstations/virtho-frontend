import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Store, Briefcase, MessageSquare, BookOpen, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROVIDER_APPS } from '@/config/providerApps.js';
import MyShopPage from '@/ui/pages/MyShopPage';

const ICON_MAP = {
  Users,
  Store,
  Briefcase,
  MessageSquare,
  BookOpen,
  Heart
};

export default function WorkspacePage() {
  const { appKey } = useParams();
  const navigate = useNavigate();

  // Conditionally render specialized workspace components
  if (appKey === 'my-shop') {
    return <MyShopPage />;
  }

  // Fallback / Placeholder for other workspaces
  const app = PROVIDER_APPS.find(a => a.targetRoute === `/workspace/${appKey}`);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-8">
        <h1 className="text-2xl font-bold text-destructive mb-4">Workspace Not Found</h1>
        <p className="text-muted-foreground mb-6">The workspace you are looking for does not exist.</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const IconComponent = ICON_MAP[app.icon] || Package;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] bg-background pb-20">
      <div className="flex items-center gap-4 p-6 border-b border-border bg-card">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <IconComponent className="w-6 h-6" style={{ color: `hsl(var(--zone-${app.zone}-ink))` }} />
          <h1 className="text-2xl font-bold text-foreground">{app.label}</h1>
        </div>
      </div>
      <div 
        className="flex-1 flex items-center justify-center p-8 transition-colors duration-300"
        style={{ backgroundColor: `hsl(var(--zone-${app.zone}-soft))` }}
      >
        <div 
          className="bg-card p-10 rounded-2xl shadow-sm bg-card/90 backdrop-blur-sm text-center max-w-md w-full transition-all duration-300"
          style={{ 
            border: `2px solid hsl(var(--zone-${app.zone}))`
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: `hsl(var(--zone-${app.zone}-ink))` }}
          >
            {app.label}
          </h2>
          <p className="text-muted-foreground">Workspace - coming soon</p>
        </div>
      </div>
    </div>
  );
}