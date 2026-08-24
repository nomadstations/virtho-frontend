import React from 'react';
import { useZone } from '@/context/ZoneContext';
import { ZONES } from '@/config/zoneConfig';
import { getRealmsLabel } from '@/utils/realmLabels';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ZoneAssignmentSection() {
  const { moduleZoneMap, setModuleZoneMap } = useZone();

  const handleZoneChange = (moduleKey, newZone) => {
    setModuleZoneMap(prev => ({
      ...prev,
      [moduleKey]: newZone === 'None' ? null : newZone
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">Zone Assignment (Demo)</h3>
        <p className="text-xs text-muted-foreground">Assign modules to zones</p>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {Object.entries(moduleZoneMap).map(([moduleKey, currentZone]) => (
          <div key={moduleKey} className="flex items-center justify-between gap-4 border-b border-border/50 pb-2 last:border-0">
            <span className="text-xs font-medium text-foreground capitalize">{moduleKey}</span>
            <Select
              value={currentZone || 'None'}
              onValueChange={(val) => handleZoneChange(moduleKey, val)}
            >
              <SelectTrigger className="w-[140px] h-7 text-xs bg-background">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                <SelectItem value="None">None</SelectItem>
                {ZONES.map(z => (
                  <SelectItem key={z} value={z} className="capitalize">
                    {getRealmsLabel(z)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}