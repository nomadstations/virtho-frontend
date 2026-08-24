import React from 'react';
import { Users, Store, Briefcase, MessageSquare, BookOpen, Heart, Package, Plus } from 'lucide-react';

const ICON_MAP = {
  Users,
  Store,
  Briefcase,
  MessageSquare,
  BookOpen,
  Heart,
  Plus
};

export default function StartMenuItem({ item, onClick, isCreate = false }) {
  const IconComponent = isCreate ? Plus : (ICON_MAP[item.icon] || Package);

  return (
    <button
      onClick={() => onClick(item)}
      aria-label={item.label}
      className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-foreground hover:bg-muted/80 transition-colors cursor-pointer group focus-ring rounded-md"
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted group-hover:bg-background transition-colors shadow-sm">
        <IconComponent size={16} className="text-muted-foreground group-hover:text-foreground" />
      </div>
      <span className="truncate">{item.label}</span>
    </button>
  );
}