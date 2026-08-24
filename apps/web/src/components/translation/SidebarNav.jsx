import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Globe, DollarSign, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/translation-dashboard', exact: true },
  { id: 'orders', label: 'Active Orders', icon: FileText, path: '#orders', badge: '12' },
  { id: 'clients', label: 'Clients', icon: Users, path: '#clients', badge: '84' },
  { id: 'vendors', label: 'Vendors / Linguists', icon: Globe, path: '#vendors', badge: '36' },
  { id: 'services', label: 'Services', icon: Settings, path: '/admin/service-configuration', badge: '8' },
  { id: 'finance', label: 'Financial Reports', icon: DollarSign, path: '#finance' },
];

export default function SidebarNav({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen w-[260px] flex flex-col bg-card border-r border-border/50 shadow-sm transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
          <div className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
            <Globe className="w-6 h-6" />
            <span>TransManage</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExternalHash = item.path.startsWith('#');
            
            // Shared class logic for NavLink and anchor
            const getLinkClasses = (isActive) => cn(
              'flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors group',
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            );

            if (isExternalHash) {
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={getLinkClasses(false)}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary-foreground" />
                    {item.label}
                  </div>
                  {item.badge && (
                    <Badge variant="outline" className="px-1.5 py-0 min-w-[1.5rem] flex justify-center bg-muted">
                      {item.badge}
                    </Badge>
                  )}
                </a>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => getLinkClasses(isActive)}
                onClick={() => setIsOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={cn('w-5 h-5', isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-secondary-foreground')} />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? 'secondary' : 'outline'} 
                        className={cn('px-1.5 py-0 min-w-[1.5rem] flex justify-center', isActive ? 'bg-primary-foreground text-primary' : 'bg-muted')}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@transmanage.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}