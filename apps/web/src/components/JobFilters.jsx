import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getJobTypes, getExperienceLevels, getJobCategories } from '@/data/mockJobs';

const JobFilters = ({ filters, setFilters, clearFilters }) => {
  const jobTypes = getJobTypes();
  const experienceLevels = getExperienceLevels();
  const industries = getJobCategories();

  const handleArrayFilterChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [category]: newValues });
  };

  return (
    <div className="space-y-8">
      
      {/* Location Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Location</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="City, state, or 'Remote'" 
            value={filters.location || ''}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="pl-9 bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>
      </div>

      {/* Job Type Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Job type</h3>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox 
                id={`type-${type}`} 
                checked={(filters.types || []).includes(type)}
                onCheckedChange={() => handleArrayFilterChange('types', type)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Experience level</h3>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-3">
              <Checkbox 
                id={`exp-${level}`} 
                checked={(filters.experience || []).includes(level)}
                onCheckedChange={() => handleArrayFilterChange('experience', level)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`exp-${level}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Filter */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xs font-semibold text-gray-900">Min salary</h3>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">
            ${(filters.minSalary / 1000).toFixed(0)}k+
          </span>
        </div>
        <Slider
          value={[filters.minSalary || 0]}
          min={0}
          max={200000}
          step={10000}
          onValueChange={(vals) => setFilters({ ...filters, minSalary: vals[0] })}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>$0</span>
          <span>$200k+</span>
        </div>
      </div>

      {/* Industry Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Industry</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {industries.map((ind) => (
            <div key={ind} className="flex items-center space-x-3">
              <Checkbox 
                id={`ind-${ind}`} 
                checked={(filters.industries || []).includes(ind)}
                onCheckedChange={() => handleArrayFilterChange('industries', ind)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`ind-${ind}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {ind}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 font-semibold"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default JobFilters;