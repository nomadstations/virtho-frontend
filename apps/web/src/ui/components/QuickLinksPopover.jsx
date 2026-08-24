import React from 'react';
import { Building, Users, User, Briefcase, BookOpen, Calendar, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderPanel from './HeaderPanel.jsx';

const QUICK_LINKS = [
  { id: 'organizations', name: 'Organizations', icon: Building, path: '/organizations' },
  { id: 'groups', name: 'Groups', icon: Users, path: '/groups' },
  { id: 'users', name: 'Users', icon: User, path: '/dashboard' },
  { id: 'teams', name: 'Teams', icon: Users, path: '/dashboard' },
  { id: 'projects', name: 'Projects', icon: Briefcase, path: '/projects' },
  { id: 'communities', name: 'Communities', icon: Users, path: '/community' },
  { id: 'courses', name: 'Courses', icon: BookOpen, path: '/learning' },
  { id: 'events', name: 'Events', icon: Calendar, path: '/dashboard' },
  { id: 'jobs', name: 'Jobs', icon: Briefcase, path: '/jobs' },
  { id: 'goods-services', name: 'Goods & Services', icon: ShoppingBag, path: '/marketplace' },
];

export default function QuickLinksPopover({ isOpen, onClose }) {
  return (
    <HeaderPanel isOpen={isOpen} onClose={onClose} title="Quick Links" position="dropdown">
      {QUICK_LINKS.map(link => {
        const Icon = link.icon;
        return (
          <Link 
            key={link.id} 
            to={link.path} 
            onClick={onClose} 
            className="flex items-center gap-3 p-3 w-full text-left text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <Icon className="w-5 h-5 text-muted-foreground" />
            {link.name}
          </Link>
        );
      })}
    </HeaderPanel>
  );
}