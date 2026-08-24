import React from 'react';
import { Helmet } from 'react-helmet';
import { Users as TeamIcon, UserPlus, Settings, TrendingUp, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';

export default function TeamsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Teams Management - Virtho Foundation</title>
        <meta name="description" content="Create and manage teams, assign members, and track team performance." />
      </Helmet>

      <div className="flex w-full bg-gray-50 min-h-[calc(100vh-5rem)]">
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
          <div className="bg-white border-b border-gray-200 pt-6 pb-8 px-4 md:px-8">
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
                  <DashboardBreadcrumb pageName="Teams" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="Teams Management"
                description="Organize users into teams and manage collaboration"
                icon={TeamIcon}
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TeamIcon className="w-5 h-5 text-lavender-primary" />
                    All Teams
                  </CardTitle>
                  <CardDescription>View and manage all teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Browse all teams, their members, and current projects
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-lavender-primary" />
                    Team Members
                  </CardTitle>
                  <CardDescription>Manage team composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Add or remove members, assign roles and responsibilities
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-lavender-primary" />
                    Team Settings
                  </CardTitle>
                  <CardDescription>Configure team preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Customize team settings, permissions, and workflows
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-lavender-primary" />
                    Performance
                  </CardTitle>
                  <CardDescription>Track team metrics and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Monitor team productivity and project completion rates
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-lavender-light bg-lavender-lightest/50">
              <CardHeader>
                <CardTitle className="text-lavender-dark">🚧 Teams Management Coming Soon</CardTitle>
                <CardDescription className="text-gray-700">
                  Comprehensive team management tools are currently in development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  <strong>Planned Features:</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Create and manage multiple teams</li>
                  <li>Team member assignment and role management</li>
                  <li>Team-based project organization</li>
                  <li>Internal team communication channels</li>
                  <li>Team performance analytics and dashboards</li>
                  <li>Collaborative workspaces for teams</li>
                  <li>Team resource allocation and scheduling</li>
                  <li>Cross-team collaboration tools</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  This feature will enable better team collaboration and project management. Stay tuned for updates!
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}