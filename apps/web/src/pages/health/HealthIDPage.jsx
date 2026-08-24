import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Droplet, AlertCircle, Heart, Phone, Activity, Calendar, User, Ruler, Weight, Eye } from 'lucide-react';
import { HealthLayout } from '@/components/HealthLayout';
import { HealthCard } from '@/components/health/HealthCard';
import { EmergencyPanel, EmergencyItem } from '@/components/health/EmergencyPanel';
import { HealthMetricWidget } from '@/components/health/HealthMetricWidget';
import { InsuranceCard } from '@/components/health/InsuranceCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function HealthIDPage() {
  const { toast } = useToast();
  const [healthData, setHealthData] = useState({
    globalHealthId: 'GHI-2026-8472-6391',
    bloodType: 'A+',
    rhFactor: 'Positive',
    organDonor: 'Yes',
    height: '175',
    weight: '72',
    eyeColor: 'Brown',
  });

  const handleSave = () => {
    toast({
      title: 'Health Information Updated',
      description: 'Your health profile has been successfully updated.',
    });
  };

  const handleInputChange = (field, value) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <HealthLayout
      title="Health ID"
      subtitle="View and manage your complete health identification information."
      icon={Shield}
    >
      <Helmet>
        <title>Health ID - Health Dashboard</title>
        <meta name="description" content="View and manage your complete health identification information, medical history, and emergency contacts." />
      </Helmet>

      {/* Health ID Number Callout */}
      <div className="mb-10">
        <div className="health-project-card p-8 bg-purple-50/50 border-purple-100">
          <p className="text-sm text-purple-600 font-semibold mb-2">Global Health ID Number</p>
          <p className="text-3xl md:text-4xl font-mono font-bold tracking-wider text-gray-900">
            {healthData.globalHealthId}
          </p>
        </div>
      </div>

      {/* Blood Type & Emergency Panel */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <HealthCard
          title="Blood Type"
          icon={<Droplet className="w-5 h-5 text-purple-600" />}
        >
          <div className="space-y-5">
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={healthData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
                <SelectTrigger id="bloodType" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm font-medium text-gray-600">Rh Factor</span>
              <span className="text-lg font-bold text-gray-900">{healthData.rhFactor}</span>
            </div>
          </div>
        </HealthCard>

        <div className="lg:col-span-2">
          <EmergencyPanel title="Critical Emergency Information">
            <EmergencyItem
              label="Life-Threatening Allergies"
              value="Penicillin, Peanuts"
              icon={<AlertCircle className="w-5 h-5" />}
            />
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <EmergencyItem
                label="Organ Donor Status"
                value={healthData.organDonor}
                icon={<Heart className="w-5 h-5" />}
              />
              <EmergencyItem
                label="Emergency Contact"
                value="Jane Doe - (555) 123-4567"
                icon={<Phone className="w-5 h-5" />}
              />
            </div>
          </EmergencyPanel>
        </div>
      </div>

      {/* Current Vitals */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Vitals</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <HealthMetricWidget
            label="Blood Pressure"
            value="120/80"
            unit="mmHg"
            icon={<Activity className="w-5 h-5" />}
            trend="stable"
            trendValue="Normal"
          />
          <HealthMetricWidget
            label="Heart Rate"
            value="72"
            unit="bpm"
            icon={<Heart className="w-5 h-5" />}
            trend="stable"
            trendValue="Normal"
          />
          <HealthMetricWidget
            label="BMI"
            value="23.5"
            unit="kg/m²"
            icon={<Activity className="w-5 h-5" />}
            trend="stable"
            trendValue="Healthy"
          />
          <HealthMetricWidget
            label="Last Checkup"
            value="2 mos"
            unit="ago"
            icon={<Calendar className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Biometrics */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Biometric Information</h2>
        <HealthCard
          title="Physical Characteristics"
          icon={<User className="w-5 h-5" />}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <div className="relative mt-2">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="height"
                  type="number"
                  value={healthData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="pl-10"
                  placeholder="175"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative mt-2">
                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="weight"
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="pl-10"
                  placeholder="72"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="eyeColor">Eye Color</Label>
              <div className="relative mt-2">
                <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Select value={healthData.eyeColor} onValueChange={(value) => handleInputChange('eyeColor', value)}>
                  <SelectTrigger id="eyeColor" className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
              Save Biometric Data
            </Button>
          </div>
        </HealthCard>
      </div>

      {/* Insurance Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Coverage</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <InsuranceCard
            provider="National Health Fund"
            policyNumber="NHF-2026-45678"
            type="Primary Health Insurance"
            coverage="Comprehensive Coverage"
            expiryDate="December 31, 2026"
            status="active"
          />
          <InsuranceCard
            provider="Premium Health Plus"
            policyNumber="PHP-789456"
            type="Supplemental Insurance"
            coverage="Dental, Vision, Mental Health"
            expiryDate="June 30, 2026"
            status="active"
          />
        </div>
      </div>
    </HealthLayout>
  );
}