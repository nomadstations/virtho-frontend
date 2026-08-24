import React from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AVAILABLE_LANGUAGES, CATEGORIES } from '@/hooks/useServiceConfiguration';

export default function LanguagePairCard({ pair, index, onChange, onRemove, errors }) {
  
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="language-pair-card shadow-sm">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground">Language Pair #{index + 1}</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(index)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor={`source-${index}`} className="text-foreground">Source Language</Label>
          <select
            id={`source-${index}`}
            value={pair.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
          >
            <option value="">Select source...</option>
            {AVAILABLE_LANGUAGES.map(lang => (
              <option key={`src-${lang}`} value={lang} disabled={lang === pair.target}>{lang}</option>
            ))}
          </select>
          {errors?.source && <p className="text-xs text-destructive">{errors.source}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`target-${index}`} className="text-foreground">Target Language</Label>
          <select
            id={`target-${index}`}
            value={pair.target}
            onChange={(e) => handleChange('target', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
          >
            <option value="">Select target...</option>
            {AVAILABLE_LANGUAGES.map(lang => (
              <option key={`tgt-${lang}`} value={lang} disabled={lang === pair.source}>{lang}</option>
            ))}
          </select>
          {errors?.target && <p className="text-xs text-destructive">{errors.target}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor={`price-${index}`} className="text-foreground">Base Price ($)</Label>
          <Input 
            id={`price-${index}`}
            type="number" 
            min="0" 
            step="0.01"
            value={pair.basePrice}
            onChange={(e) => handleChange('basePrice', parseFloat(e.target.value))}
            className="text-foreground"
            placeholder="0.00"
          />
          {errors?.basePrice && <p className="text-xs text-destructive">{errors.basePrice}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`unit-${index}`} className="text-foreground">Price Unit</Label>
          <select
            id={`unit-${index}`}
            value={pair.priceUnit}
            onChange={(e) => handleChange('priceUnit', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
          >
            <option value="Per Word">Per Word</option>
            <option value="Per Page">Per Page</option>
            <option value="Per Hour">Per Hour</option>
            <option value="Fixed">Fixed Rate</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`category-${index}`} className="text-foreground">Category</Label>
          <select
            id={`category-${index}`}
            value={pair.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
          >
            {CATEGORIES.map(cat => (
              <option key={`cat-${cat}`} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-2 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`vat-toggle-${index}`}
            checked={pair.vat}
            onCheckedChange={(val) => handleChange('vat', val)}
          />
          <Label htmlFor={`vat-toggle-${index}`} className="text-foreground cursor-pointer">Apply VAT</Label>
        </div>

        {pair.vat && (
          <div className="flex items-center gap-2">
            <Label htmlFor={`vat-percent-${index}`} className="text-foreground whitespace-nowrap">VAT %:</Label>
            <Input 
              id={`vat-percent-${index}`}
              type="number" 
              min="0" 
              max="100"
              value={pair.vatPercentage}
              onChange={(e) => handleChange('vatPercentage', parseInt(e.target.value) || 0)}
              className="w-20 h-8 text-foreground"
            />
          </div>
        )}
      </div>
    </div>
  );
}