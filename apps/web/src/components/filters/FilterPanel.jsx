import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FilterPanel = ({ filterConfig, filters = {}, setFilters, clearFilters, onFilterChange, onReset }) => {
  
  // Helper to map plural config keys to singular state keys for ProjectPage compatibility
  const getStateKey = (configKey) => {
    if (onFilterChange) {
      if (configKey === 'categories') return 'category';
      if (configKey === 'statuses') return 'status';
    }
    return configKey;
  };

  const handleCheckboxChange = (filterType, value) => {
    const stateKey = getStateKey(filterType);
    
    if (onFilterChange) {
      const currentValue = filters[stateKey];
      let newValue;
      
      // Handle array-based multiple selection vs string-based single selection
      if (Array.isArray(currentValue)) {
        newValue = currentValue.includes(value) 
          ? currentValue.filter(v => v !== value) 
          : [...currentValue, value];
      } else {
        // Toggle single string value (radio-like behavior)
        newValue = currentValue === value ? '' : value;
      }
      onFilterChange(stateKey, newValue);
    } else if (setFilters) {
      // Legacy support for setFilters
      setFilters(prev => {
        const currentValues = prev[filterType] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      });
    }
  };

  const handleClear = () => {
    if (onReset) onReset();
    else if (clearFilters) clearFilters();
  };

  const isChecked = (filterType, value) => {
    const stateKey = getStateKey(filterType);
    const stateVal = filters[stateKey];
    if (Array.isArray(stateVal)) return stateVal.includes(value);
    return stateVal === value;
  };

  // Determine if any filters are active
  const hasActiveFilters = Object.values(filters).some(val => 
    Array.isArray(val) ? val.length > 0 : !!val
  );

  return (
    <div className="space-y-6">
      {/* User Types Filter */}
      {filterConfig.userTypes && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">User Type</h3>
          <div className="space-y-2.5">
            {filterConfig.userTypes.map((type) => {
              const typeValue = typeof type === 'object' ? type.value : type;
              const typeLabel = typeof type === 'object' ? type.label : type;
              
              return (
                <div key={typeValue} className="flex items-center space-x-2.5">
                  <Checkbox
                    id={`type-${typeValue}`}
                    checked={isChecked('userTypes', typeValue)}
                    onCheckedChange={() => handleCheckboxChange('userTypes', typeValue)}
                    className="border-gray-300"
                  />
                  <Label
                    htmlFor={`type-${typeValue}`}
                    className="text-sm text-gray-700 cursor-pointer font-medium"
                  >
                    {typeLabel}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locations Filter */}
      {filterConfig.locations && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
          <div className="space-y-2.5">
            {filterConfig.locations.map((location) => (
              <div key={location} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`location-${location}`}
                  checked={isChecked('locations', location)}
                  onCheckedChange={() => handleCheckboxChange('locations', location)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Levels Filter */}
      {filterConfig.activityLevels && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Activity Level</h3>
          <div className="space-y-2.5">
            {filterConfig.activityLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`activity-${level}`}
                  checked={isChecked('activityLevels', level)}
                  onCheckedChange={() => handleCheckboxChange('activityLevels', level)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`activity-${level}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Filter (for other filter types) */}
      {filterConfig.categories && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
          <div className="space-y-2.5">
            {filterConfig.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`category-${category}`}
                  checked={isChecked('categories', category)}
                  onCheckedChange={() => handleCheckboxChange('categories', category)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statuses Filter (for projects) */}
      {filterConfig.statuses && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
          <div className="space-y-2.5">
            {filterConfig.statuses.map((status) => (
              <div key={status} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`status-${status}`}
                  checked={isChecked('statuses', status)}
                  onCheckedChange={() => handleCheckboxChange('statuses', status)}
                  className="border-gray-300"
                />
                <Label
                  htmlFor={`status-${status}`}
                  className="text-sm text-gray-700 cursor-pointer font-medium capitalize"
                >
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={handleClear}
            variant="outline"
            className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-300"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;