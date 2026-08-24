import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickLinksSection({ quickLinks, onOpenSettings }) {
  console.log('[QuickLinksSection] ========================================');
  console.log('[QuickLinksSection] 🔍 COMPONENT RENDER START');
  console.log('[QuickLinksSection] ========================================');
  
  // Inject the Translation Dashboard link if it's not already present
  const extendedQuickLinks = useMemo(() => {
    const baseLinks = quickLinks || [];
    const hasTranslation = baseLinks.some(l => l.id === 'translation-dashboard');
    
    if (hasTranslation) return baseLinks;
    
    return [
      {
        id: 'translation-dashboard',
        name: 'Translation Dashboard',
        icon: LayoutDashboard,
        type: 'navigation',
        path: '/translation-dashboard'
      },
      ...baseLinks
    ];
  }, [quickLinks]);

  console.log('[QuickLinksSection] ✅ Received quickLinks prop:', quickLinks);
  console.log('[QuickLinksSection] ✅ Quick links count (visible only):', extendedQuickLinks.length);
  console.log('[QuickLinksSection] ✅ Quick link names:', extendedQuickLinks.map(l => l.name));

  if (!extendedQuickLinks || extendedQuickLinks.length === 0) {
    console.log('[QuickLinksSection] No visible quick links - showing empty state');
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-lavender-lightest to-lavender-lighter rounded-xl p-6 sm:p-8 border border-lavender-light text-center h-full w-full"
      >
        <div className="max-w-md mx-auto">
          <Settings className="w-12 h-12 text-lavender-light mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quick Links Visible</h3>
          <p className="text-gray-600 mb-6">
            Either no quick links are selected, or all selected items are hidden in menu settings.
            Customize your dashboard to show quick links.
          </p>
          <Button
            onClick={onOpenSettings}
            className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm"
          >
            <Settings className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Open Dashboard Settings
          </Button>
        </div>
      </motion.div>
    );
  }

  console.log('[QuickLinksSection] ========================================');
  console.log('[QuickLinksSection] 🎨 RENDERING TILES');
  console.log('[QuickLinksSection] ========================================');

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 h-full w-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Quick Links</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Fast access to your favorite sections ({extendedQuickLinks.length} visible)
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSettings}
          className="text-lavender-primary hover:text-lavender-dark hover:bg-lavender-lightest"
        >
          <Settings className="w-4 h-4 mr-2" strokeWidth={1.5} />
          <span className="hidden sm:inline">Customize</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 w-full">
        {extendedQuickLinks.map((link, index) => {
          const IconComponent = link.icon;
          
          if (!IconComponent) {
            console.error('[QuickLinksSection] ✗ Missing icon for link:', link.name);
            return null;
          }
          
          const isNavigation = link.type === 'navigation' && link.path;
          
          const TileContent = () => (
            <div className="group flex flex-col items-center justify-center text-center cursor-pointer w-full p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 h-full min-h-[140px] sm:min-h-[160px]">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center flex-shrink-0">
                {/* Background circle with border */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full border-2 border-gray-200 group-hover:border-lavender-light transition-all duration-300 group-hover:shadow-lg" />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-lavender-primary/0 to-lavender-light/0 group-hover:from-lavender-primary/10 group-hover:to-lavender-light/10 transition-all duration-300 rounded-full" />
                
                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <IconComponent 
                    className="text-lavender-primary transition-transform duration-300 group-hover:scale-110"
                    size={40}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ 
                      width: '40px', 
                      height: '40px',
                      minWidth: '40px',
                      minHeight: '40px',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fill: 'none',
                      stroke: 'currentColor'
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              
              {/* Label */}
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-lavender-primary transition-colors w-full whitespace-normal break-words px-1 leading-tight">
                {link.name}
              </h3>
              
              {/* Arrow indicator on hover */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-3 h-3 text-lavender-primary mx-auto" strokeWidth={1.5} />
              </div>
            </div>
          );
          
          return (
            <motion.div 
              key={link.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              className="w-full h-full"
            >
              {isNavigation ? (
                <Link to={link.path} className="block w-full h-full">
                  <TileContent />
                </Link>
              ) : (
                <div className="block w-full h-full">
                  <TileContent />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Debug info in development */}
      {import.meta.env.DEV && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600 border-2 border-blue-500">
          <div className="font-bold text-blue-800 mb-2">🔍 DEBUG INFO - MENU FILTERING:</div>
          <div>
            <strong>Visible quick links:</strong> {extendedQuickLinks.length}
            <br />
            <span className="text-xs text-gray-500">
              (Hidden menu items are automatically filtered out)
            </span>
          </div>
          {extendedQuickLinks.length > 0 && (
            <div className="mt-2 text-green-700 font-semibold bg-green-100 p-2 rounded">
              ✅ Displaying {extendedQuickLinks.length} visible quick link{extendedQuickLinks.length !== 1 ? 's' : ''}
              <br />
              ✅ Hidden menu items are excluded
            </div>
          )}
        </div>
      )}
      
      <div className="sr-only" aria-live="polite">
        {extendedQuickLinks.length} quick links displayed
      </div>
    </div>
  );
}