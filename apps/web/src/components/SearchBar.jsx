import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ZONES } from '@/config/zoneConfig';
import { getRealmsLabel } from '@/utils/realmLabels';

export default function SearchBar({ onSearch, className = '' }) {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ query, scope });
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center w-full max-w-2xl bg-card border border-border rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all ${className}`}>
      <select 
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        className="bg-muted text-foreground text-sm pl-4 pr-8 py-2.5 border-r border-border outline-none cursor-pointer hidden md:block focus:ring-0"
      >
        <option value="all">All Realms</option>
        {ZONES.map(z => (
          <option key={z} value={z}>{getRealmsLabel(z)}</option>
        ))}
      </select>
      
      <div className="relative flex-1 flex items-center">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all realms..." 
          className="w-full bg-transparent text-sm pl-10 pr-4 py-2.5 outline-none placeholder:text-muted-foreground"
        />
      </div>
      
      <button 
        type="submit"
        className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors focus-ring"
      >
        Search
      </button>
    </form>
  );
}