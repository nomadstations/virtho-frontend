import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FilterSection = ({ title, options, selectedValues, onChange }) => (
  <div className="py-2">
    <h4 className="font-medium text-sm text-gray-900 mb-2">{title}</h4>
    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${title}-${option.value}`}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked) => onChange(option.value, checked)}
          />
          <Label htmlFor={`${title}-${option.value}`} className="text-sm font-normal cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  </div>
);

const UserFilters = ({ selectedFilters, onFilterChange, groups, roles }) => {
  const handleToggle = (category, value, checked) => {
    const current = selectedFilters[category];
    const updated = checked 
      ? [...current, value] 
      : current.filter((item) => item !== value);
    
    onFilterChange(category, updated);
  };

  const clearFilters = () => {
    onFilterChange('role', []);
    onFilterChange('status', []);
    onFilterChange('group', []);
    onFilterChange('verified', []);
  };

  const activeCount = Object.values(selectedFilters).reduce((acc, val) => acc + val.length, 0);

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' }
  ];

  const verifiedOptions = [
    { label: 'Verified', value: 'verified' },
    { label: 'Unverified', value: 'unverified' }
  ];

  const roleOptions = roles.map(r => ({ label: r.name, value: r.name }));
  const groupOptions = groups.map(g => ({ label: g.name, value: g.id }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-dark text-white text-xs">
              {activeCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4 space-y-4">
        <FilterSection 
          title="Role" 
          options={roleOptions} 
          selectedValues={selectedFilters.role} 
          onChange={(val, checked) => handleToggle('role', val, checked)} 
        />
        <div className="border-t border-gray-100" />
        <FilterSection 
          title="Status" 
          options={statusOptions} 
          selectedValues={selectedFilters.status} 
          onChange={(val, checked) => handleToggle('status', val, checked)} 
        />
        <div className="border-t border-gray-100" />
        <FilterSection 
          title="Verification" 
          options={verifiedOptions} 
          selectedValues={selectedFilters.verified} 
          onChange={(val, checked) => handleToggle('verified', val, checked)} 
        />
        <div className="border-t border-gray-100" />
        <FilterSection 
          title="Groups" 
          options={groupOptions} 
          selectedValues={selectedFilters.group} 
          onChange={(val, checked) => handleToggle('group', val, checked)} 
        />
        
        {activeCount > 0 && (
          <>
            <div className="border-t border-gray-100 mt-2 pt-2" />
            <Button variant="ghost" onClick={clearFilters} className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive/10">
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserFilters;