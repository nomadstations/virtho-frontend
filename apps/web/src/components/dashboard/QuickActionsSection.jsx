import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickActionsSection({ quickActions = [], onActionClick, onOpenSettings }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  const handleSettingsClick = () => {
    if (onOpenSettings) {
      onOpenSettings();
    }
  };

  if (!quickActions || quickActions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 sm:p-8 border border-amber-100 text-center"
      >
        <div className="max-w-md mx-auto">
          <Zap className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quick Actions Selected</h3>
          <p className="text-gray-600 mb-6">
            Add quick action buttons to your dashboard for faster workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleSettingsClick}
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize Quick Actions
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {quickActions.length} {quickActions.length === 1 ? 'shortcut' : 'shortcuts'} available
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSettingsClick}
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 flex-shrink-0"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Customize</span>
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
      >
        {/* Dynamic Quick Actions */}
        {quickActions.map((action) => {
          const IconComponent = action.iconComponent;
          
          if (!IconComponent) {
            return null;
          }

          return (
            <motion.button
              key={action.id}
              variants={itemVariants}
              onClick={() => handleActionClick(action)}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group cursor-pointer min-h-[100px] sm:min-h-[120px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={action.label}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/15 group-hover:to-orange-500/15 transition-all duration-300 rounded-full" />
                <IconComponent 
                  className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 group-hover:text-amber-700 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={2}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-amber-900 transition-colors text-center leading-tight px-1">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}