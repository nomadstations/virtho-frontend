import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useQuickActions } from '@/hooks/useQuickActions';
import { useQuickLinks } from '@/hooks/useQuickLinks';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { QuickLinksSection } from '@/components/dashboard/QuickLinksSection';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import { FileText, Briefcase, ShoppingBag, Users, Activity, GraduationCap } from 'lucide-react';
import { useCoursesData } from '@/hooks/useCoursesData';

export default function DashboardContent({ onQuickActionClick }) {
  const { currentUser, dashboardData, addProject, getUserProjects } = useAuth();
  const { quickActions } = useQuickActions();
  const { quickLinks } = useQuickLinks();
  const { courses } = useCoursesData();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const userProjects = getUserProjects();

    if (userProjects.length === 0) {
      const defaultProject = {
        name: 'My First Project',
        title: 'My First Project',
        description: 'Your first project - feel free to edit or delete this',
        status: 'active',
        category: 'web-development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        createdDate: new Date().toISOString().split('T')[0],
        author: currentUser.name,
      };

      addProject(defaultProject);
    }
  }, [currentUser, getUserProjects, addProject]);

  const activeCoursesCount = courses.filter(c => c.status?.toLowerCase() === 'active').length;
  const userProjectsCount = getUserProjects().length;

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: <GraduationCap size={24} className="text-secondary" /> },
    { label: 'Active Courses', value: activeCoursesCount, icon: <Activity size={24} className="text-success" /> },
    { label: 'Total Blogs', value: dashboardData.blogs.length, icon: <FileText size={24} className="text-info" /> },
    { label: 'My Projects', value: userProjectsCount, icon: <Briefcase size={24} className="text-primary" /> },
    { label: 'Total Products', value: dashboardData.products.length, icon: <ShoppingBag size={24} className="text-secondary-dark" /> },
    { label: 'Active Teams', value: dashboardData.teams.length, icon: <Users size={24} className="text-primary-dark" /> },
  ];

  const handleActionClick = (action) => {
    if (onQuickActionClick) {
      onQuickActionClick(action);
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-primary-light to-primary-lighter rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg text-primary-darkest w-full"
      >
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 text-primary-dark">
            Here's what's happening with your projects and activities today.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full">
        <QuickLinksSection 
          quickLinks={quickLinks}
          onOpenSettings={handleOpenSettings}
        />
      </div>

      <div className="w-full">
        <QuickActionsSection 
          quickActions={quickActions}
          onActionClick={handleActionClick}
          onOpenSettings={handleOpenSettings}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground mt-1">Your latest actions and updates</p>
          </div>
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-4">
          {dashboardData.activities.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-foreground">{activity.text}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <DashboardSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}