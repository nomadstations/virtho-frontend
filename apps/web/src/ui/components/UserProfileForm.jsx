import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserProfileForm = ({ formData, setFormData, roles, groups }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGroupToggle = (groupId, checked) => {
    setFormData(prev => {
      const newGroups = checked 
        ? [...prev.groups, groupId]
        : prev.groups.filter(id => id !== groupId);
      return { ...prev, groups: newGroups };
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Profile Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            value={formData.firstName || ''} 
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            value={formData.lastName || ''} 
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
            className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email"
          value={formData.email || ''} 
          onChange={(e) => handleChange('email', e.target.value)}
          required
          className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role || ''} onValueChange={(val) => handleChange('role', val)}>
            <SelectTrigger id="role" className="bg-white border-gray-300 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status || ''} onValueChange={(val) => handleChange('status', val)}>
            <SelectTrigger id="status" className="bg-white border-gray-300 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Groups</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          {groups.map(group => (
            <div key={group.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`group-${group.id}`}
                checked={(formData.groups || []).includes(group.id)}
                onCheckedChange={(checked) => handleGroupToggle(group.id, checked)}
                className="border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`group-${group.id}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {group.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;