import React from 'react';
import { ShoppingCart, Building2, Users, FolderPlus, FileText, BookOpen, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderPanel from './HeaderPanel.jsx';

const ACTIONS = [
  { icon: ShoppingCart, label: 'Create Order', path: '/orders/new' },
  { icon: Building2, label: 'Create Organization', path: '/organizations/new' },
  { icon: Users, label: 'Create Group', path: '/groups/new' },
  { icon: FolderPlus, label: 'Create Project', path: '/projects/new' },
  { icon: FileText, label: 'Write a Post', path: '/blog/new' },
  { icon: BookOpen, label: 'New Course', path: '/courses/new' },
  { icon: Wrench, label: 'New Service', path: '/services/new' },
];

export default function QuickActionsPopover({ isOpen, onClose }) {
  return (
    <HeaderPanel isOpen={isOpen} onClose={onClose} title="Quick Actions">
      {ACTIONS.map((a, i) => {
        const Icon = a.icon;
        return (
          <Link 
            key={i} 
            to={a.path} 
            onClick={onClose} 
            className="flex items-center gap-3 p-3 w-full text-left rounded-md hover:bg-white/10 transition-colors header-panel-item"
          >
            <Icon className="w-5 h-5 text-white" />
            <span className="text-sm text-white/95">{a.label}</span>
          </Link>
        );
      })}
    </HeaderPanel>
  );
}