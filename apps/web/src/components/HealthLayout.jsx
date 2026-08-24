import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Shield, FileText } from 'lucide-react';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';

export function HealthLayout({ children, title, subtitle, icon: Icon, controlBar }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/health/wellness', alias: '/health', label: 'Wellness', icon: Heart },
    { path: '/health/health-id', label: 'Health ID', icon: Shield },
    { path: '/health/legal-and-insurance', label: 'Legal & Insurance', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Area */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PublicBreadcrumb />
        </div>
      </div>
      
      {/* Lightweight Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto">
            {Icon && (
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Icon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            )}
            {title && <h1 className="text-gray-900 mb-2 text-2xl md:text-3xl font-extrabold">{title}</h1>}
            {subtitle && <p className="text-gray-600 text-sm md:text-base leading-relaxed">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Control Bar (Optional) */}
      {controlBar && (
        <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {controlBar}
          </div>
        </div>
      )}

      {/* Main Container Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-36">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname === item.alias;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Page Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}