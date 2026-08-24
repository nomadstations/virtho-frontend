import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function HealthMetricWidget({ 
  label, 
  value, 
  unit, 
  icon, 
  trend, 
  trendValue
}) {
  return (
    <div className="health-project-card p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-1 ${
            trend === 'up' ? 'text-purple-700' : trend === 'down' ? 'text-gray-600' : 'text-gray-500'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'stable' && <Minus className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {unit && <span className="text-sm font-medium text-gray-500">{unit}</span>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </div>
  );
}