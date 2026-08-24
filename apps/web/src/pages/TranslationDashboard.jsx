import React, { useState } from 'react';
import { Menu, Search, Bell, Clock, Briefcase, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarNav from '@/components/translation/SidebarNav';
import MetricCard from '@/components/translation/MetricCard';
import OrdersTable from '@/components/translation/OrdersTable';
import { Helmet } from 'react-helmet';

// Sample Data
const mockOrders = [
  { id: 'ORD-2026-001', clientName: 'Acme Corp', serviceType: 'Technical Translation', languagePair: 'EN → ES', deadline: '2026-05-18', status: 'In Progress' },
  { id: 'ORD-2026-002', clientName: 'Global Law LLC', serviceType: 'Legalization', languagePair: 'FR → EN', deadline: '2026-05-16', status: 'Overdue' },
  { id: 'ORD-2026-003', clientName: 'Medika Tech', serviceType: 'Medical Translation', languagePair: 'DE → EN', deadline: '2026-05-20', status: 'Paid' },
  { id: 'ORD-2026-004', clientName: 'StartUp Inc', serviceType: 'Website Translation', languagePair: 'EN → JA', deadline: '2026-05-22', status: 'Pending' },
  { id: 'ORD-2026-005', clientName: 'Euro Logistics', serviceType: 'Document Translation', languagePair: 'IT → EN', deadline: '2026-05-12', status: 'Completed' },
  { id: 'ORD-2026-006', clientName: 'Gov Solutions', serviceType: 'Notarized Translation', languagePair: 'RU → EN', deadline: '2026-05-17', status: 'In Progress' },
  { id: 'ORD-2026-007', clientName: 'Nexus Games', serviceType: 'Localization', languagePair: 'EN → KO', deadline: '2026-05-25', status: 'Paid' },
  { id: 'ORD-2026-008', clientName: 'Apex Financial', serviceType: 'Certified Translation', languagePair: 'ZH → EN', deadline: '2026-05-15', status: 'In Progress' },
];

export default function TranslationDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Translation & Legalization Dashboard</title>
        <meta name="description" content="Manage translation orders, clients, and localization services efficiently." />
      </Helmet>

      <SidebarNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="lg:pl-[260px] flex flex-col min-h-screen transition-all duration-300">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-card border-b border-border/50 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search orders, clients..." 
                className="w-full pl-9 bg-muted/50 border-border/50 focus-visible:ring-primary h-9" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-card" />
            </Button>
            <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground h-9">
              + New Order
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage your translation projects and team performance.</p>
            </div>
            <Button className="sm:hidden w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              + New Order
            </Button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <MetricCard 
              title="Active Orders" 
              value="12" 
              icon={Briefcase} 
              trend="+2" 
              trendLabel="from last week" 
              statusColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            />
            <MetricCard 
              title="Monthly Revenue" 
              value="$14,500" 
              icon={FileCheck} 
              trend="+15%" 
              trendLabel="from last month" 
              statusColor="bg-success-subtle text-success"
            />
            <MetricCard 
              title="Urgent Deadlines" 
              value="3" 
              icon={Clock} 
              trend="-1" 
              trendLabel="from yesterday" 
              statusColor="bg-danger-subtle text-danger"
            />
          </div>

          {/* Orders Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Recent Orders</h2>
              <Button variant="outline" size="sm" className="h-8 text-xs font-medium">View All</Button>
            </div>
            <OrdersTable data={mockOrders} />
          </div>
        </main>
      </div>
    </div>
  );
}