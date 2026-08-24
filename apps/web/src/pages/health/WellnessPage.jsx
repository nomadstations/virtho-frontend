import React from 'react';
import { Helmet } from 'react-helmet';
import { Heart, Activity, Brain, Droplet, Shield, FileText, Grid, List, SlidersHorizontal } from 'lucide-react';
import { HealthLayout } from '@/components/HealthLayout';
import { MetricCard } from '@/components/health/MetricCard';
import { QuickAccessCard } from '@/components/health/QuickAccessCard';
import { AppointmentCard } from '@/components/health/AppointmentCard';
import { LabResultCard } from '@/components/health/LabResultCard';
import { GoalCard } from '@/components/health/GoalCard';
import SearchComponent from '@/components/SearchComponent';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function WellnessPage() {
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: 'Feature Coming Soon',
      description: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    });
  };

  const controlBar = (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="w-full md:w-96">
        <SearchComponent
          placeholder="Search your health records..."
          onChange={() => {}}
        />
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button variant="ghost" size="sm" className="bg-white shadow-sm text-purple-700 rounded">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 rounded">
            <List className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );

  return (
    <HealthLayout
      title="Wellness"
      subtitle="Track your health metrics and manage your care."
      icon={Heart}
      controlBar={controlBar}
    >
      <Helmet>
        <title>Wellness Dashboard - Health</title>
        <meta name="description" content="Monitor your health metrics, track wellness goals, and access your complete health information." />
      </Helmet>

      {/* Today's Activity Metrics */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Activity</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Steps" 
            value="8,432" 
            unit="steps" 
            icon={<Activity className="w-5 h-5" />} 
            trend="up" 
            trendValue="+12%" 
          />
          <MetricCard 
            label="Heart Rate" 
            value="72" 
            unit="bpm" 
            icon={<Heart className="w-5 h-5" />} 
            trend="stable" 
            trendValue="Normal" 
          />
          <MetricCard 
            label="Sleep" 
            value="7.5" 
            unit="hours" 
            icon={<Brain className="w-5 h-5" />} 
            trend="up" 
            trendValue="+0.5h" 
          />
          <MetricCard 
            label="Water" 
            value="6" 
            unit="glasses" 
            icon={<Droplet className="w-5 h-5" />} 
            trend="down" 
            trendValue="-2" 
          />
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <QuickAccessCard
            title="Health ID"
            description="View your complete health profile, emergency contacts, and vital information."
            icon={<Shield className="w-6 h-6" />}
            path="/health/health-id"
          />
          <QuickAccessCard
            title="Legal & Insurance"
            description="Manage your healthcare legal documents, living wills, and active insurance policies."
            icon={<FileText className="w-6 h-6" />}
            path="/health/legal-and-insurance"
          />
        </div>
      </div>

      {/* Bottom Focus Area */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ongoing Care</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <AppointmentCard 
            title="Annual Checkup" 
            doctor="Dr. Sarah Johnson" 
            date="Tomorrow" 
            time="10:00 AM" 
          />
          <LabResultCard 
            results={[
              {name: 'Cholesterol', status: 'Normal'},
              {name: 'Blood Sugar', status: 'Normal'},
              {name: 'Blood Pressure', status: 'Normal'}
            ]} 
          />
          <GoalCard 
            goals={[
              {name: 'Daily Steps', progress: 84}, 
              {name: 'Water Intake', progress: 75}
            ]} 
          />
        </div>
      </div>
    </HealthLayout>
  );
}