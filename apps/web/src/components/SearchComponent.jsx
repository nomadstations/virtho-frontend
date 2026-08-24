import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ZONES } from '@/config/zoneConfig';
import { getRealmsLabel } from '@/utils/realmLabels';

export default function SearchComponent({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ query, scope });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center bg-card border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all shadow-sm">
      <select
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        className="bg-muted text-foreground text-sm px-3 py-2 border-r border-border outline-none cursor-pointer hidden sm:block"
        aria-label="Search scope"
      >
        <option value="all">All Realms</option>
        {ZONES.map(z => (
          <option key={z} value={z}>{getRealmsLabel(z)}</option>
        ))}
      </select>
      <div className="flex-1 flex items-center px-3">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-sm px-2 py-2 placeholder:text-muted-foreground"
        />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors focus-ring">
        Find
      </button>
    </form>
  );
}