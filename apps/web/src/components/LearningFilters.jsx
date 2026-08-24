import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { getCourseCategories, getDifficultyLevels } from '@/data/mockCourses';

const LearningFilters = ({ filters, onFilterChange, onReset }) => {
  const categories = getCourseCategories();
  const difficulties = getDifficultyLevels();
  const priceTypes = ['Free', 'Paid'];

  const handleArrayFilterChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    // Call onFilterChange with the category key and new values
    onFilterChange(category, newValues);
  };

  const handleSingleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Topic / category</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={(filters.categories || []).includes(cat)}
                onCheckedChange={() => handleArrayFilterChange('categories', cat)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Difficulty level</h3>
        <div className="space-y-3">
          {difficulties.map((diff) => (
            <div key={diff} className="flex items-center space-x-3">
              <Checkbox 
                id={`diff-${diff}`} 
                checked={(filters.difficulties || []).includes(diff)}
                onCheckedChange={() => handleArrayFilterChange('difficulties', diff)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`diff-${diff}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {diff}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Price</h3>
        <div className="space-y-3">
          {priceTypes.map((price) => (
            <div key={price} className="flex items-center space-x-3">
              <Checkbox 
                id={`price-${price}`} 
                checked={(filters.price || []).includes(price)}
                onCheckedChange={() => handleArrayFilterChange('price', price)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor={`price-${price}`} className="text-sm font-medium leading-none cursor-pointer text-gray-700">
                {price}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-4">Minimum rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((stars) => (
            <label key={stars} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating"
                checked={filters.minRating === stars}
                onChange={() => handleSingleFilterChange('minRating', stars)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300" 
              />
              <span className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-600 ml-2">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={onReset}
        className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 font-semibold"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default LearningFilters;