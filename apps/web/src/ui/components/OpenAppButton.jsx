import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  Store, 
  BookOpen, 
  Heart, 
  Box, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Users,
  MessageSquare,
  Briefcase,
  Store,
  BookOpen,
  Heart
};

export default function OpenAppButton({ app, isActive, onClick, onClose }) {
  const Icon = iconMap[app.icon] || Box;
  const isEconomy = app.zone === 'economy';
  
  const activeStyle = isEconomy ? {
    backgroundColor: 'hsl(var(--zone-economy-soft))',
    color: 'hsl(var(--zone-economy-ink))',
    boxShadow: '0 0 0 2px hsl(var(--zone-economy)) inset'
  } : {
    backgroundColor: `hsl(var(--zone-${app.zone}))`,
    color: '#fff',
    boxShadow: '0 0 0 2px rgba(255,255,255,0.3) inset'
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm min-w-[120px]",
        !isActive && "bg-white/10 text-white/80 hover:bg-white/20"
      )}
      style={isActive ? activeStyle : {}}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-xs font-semibold truncate flex-1">{app.label}</span>
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="hover:bg-black/20 rounded-full p-0.5 shrink-0 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}