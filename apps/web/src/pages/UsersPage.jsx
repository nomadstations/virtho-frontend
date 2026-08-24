import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { UserCircle, Users as UsersIcon, Shield, Mail, Menu, Users, History, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';
import { usePeople } from '@/hooks/usePeople';
import OnboardingInProgressWidget from '@/ui/components/OnboardingInProgressWidget';
import RecentActivityWidget from '@/ui/components/RecentActivityWidget';

export default function UsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { users, roles, groups, invitations, activityLog } = usePeople();

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      users: users.length,
      roles: roles.length,
      groups: groups.length,
      pendingInvites: invitations.filter(i => i.status === 'pending').length,
      activitiesToday: activityLog.filter(a => new Date(a.timestamp).toDateString() === today).length
    };
  }, [users, roles, groups, invitations, activityLog]);

  return (
    <>
      <Helmet>
        <title>People Management - Virtho Foundation</title>
        <meta name="description" content="Manage users, permissions, and access control across your organization." />
      </Helmet>

      <div className="flex w-full bg-background min-h-[calc(100vh-5rem)]">
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
          <div className="bg-card border-b border-border pt-6 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <DashboardBreadcrumb pageName="People" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="People Management"
                description="Manage user accounts, roles, groups, and permissions"
                icon={UserCircle}
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* 3 Columns Desktop, 2 Tablet, 1 Mobile */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card 
                className="cursor-pointer hover:bg-muted/30 hover:shadow-md transition-all border-border flex flex-col"
                onClick={() => navigate('/users/directory')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-primary" />
                    All Users
                  </CardTitle>
                  <CardDescription>View and manage all user accounts</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 p-2 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {stats.users} total users
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:bg-muted/30 hover:shadow-md transition-all border-border flex flex-col"
                onClick={() => navigate('/users/roles')} 
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Roles & Permissions
                  </CardTitle>
                  <CardDescription>Configure user roles and access</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 p-2 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {stats.roles} defined roles
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:bg-muted/30 hover:shadow-md transition-all border-border flex flex-col"
                onClick={() => navigate('/users/groups')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Groups
                  </CardTitle>
                  <CardDescription>Manage user groups and permissions</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 p-2 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {stats.groups} active groups
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:bg-muted/30 hover:shadow-md transition-all border-border flex flex-col"
                onClick={() => navigate('/users/invitations')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Invitations
                  </CardTitle>
                  <CardDescription>Send and track user invitations</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 p-2 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {stats.pendingInvites} pending invites
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:bg-muted/30 hover:shadow-md transition-all border-border flex flex-col md:col-span-2 lg:col-span-1"
                onClick={() => navigate('/users/activity-log')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Activity Log
                  </CardTitle>
                  <CardDescription>View all user and system activity</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 p-2 rounded-md w-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {stats.activitiesToday} activities today
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 2 Columns Desktop, 1 Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full">
                <OnboardingInProgressWidget onViewProfile={() => navigate('/users/directory')} />
              </div>
              <div className="w-full">
                <RecentActivityWidget />
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
}