import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui/primitives/button';

export default function ProviderWorkspaceLayout({ zone, title, icon: Icon, summaryCards, children }) {
  const navigate = useNavigate();
  const zoneColor = `hsl(var(--zone-${zone}))`;
  const zoneInk = `hsl(var(--zone-${zone}-ink))`;
  const zoneSoft = `hsl(var(--zone-${zone}-soft))`;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background pb-28">
      {/* Header Strip - Dynamic Zone Color */}
      <div 
        className="flex items-center gap-4 px-6 py-8 border-b shadow-sm relative overflow-hidden"
        style={{ 
          backgroundColor: zoneColor,
          borderColor: zoneInk
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')} 
            className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 text-white">
            {Icon && <Icon className="w-8 h-8" />}
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
        </div>
      </div>
      
      {/* Summary Row */}
      {summaryCards && summaryCards.length > 0 && (
        <div className="bg-muted/30 border-b border-border">
          <div className="p-6 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {summaryCards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform" style={{ color: zoneInk }}>
                    {card.number}
                  </div>
                  <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Sections Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8 mt-4">
        {children}
      </div>
    </div>
  );
}