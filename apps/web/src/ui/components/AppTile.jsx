import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store, Briefcase, MessageSquare, BookOpen, Heart, Package } from 'lucide-react';

const ICON_MAP = {
  Users,
  Store,
  Briefcase,
  MessageSquare,
  BookOpen,
  Heart
};

export default function AppTile({ app }) {
  const navigate = useNavigate();
  const IconComponent = ICON_MAP[app.icon] || Package;

  return (
    <button
      onClick={() => navigate(app.targetRoute)}
      className="flex flex-col items-center w-[88px] md:w-[112px] group cursor-pointer focus-ring outline-none"
      aria-label={`Open ${app.label}`}
    >
      <div className="relative flex flex-shrink-0 items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-card border border-border rounded-full shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200 mb-2 md:mb-3">
        <IconComponent 
          size={32} 
          className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-foreground transition-colors" 
          strokeWidth={1.5} 
        />
        {app.count !== undefined && app.count > 0 && (
          <div 
            className="absolute top-0 right-0 bg-muted text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-border/50 translate-x-1 -translate-y-1"
            aria-label={`${app.count} notifications`}
          >
            {app.count}
          </div>
        )}
      </div>
      <span className="text-[11px] md:text-xs font-medium text-foreground text-center w-full px-1 whitespace-normal break-words leading-tight transition-colors">
        {app.label}
      </span>
    </button>
  );
}