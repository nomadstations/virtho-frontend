import React from 'react';
import { User, Building, Users, Check } from 'lucide-react';
import HeaderPanel from '@/ui/components/HeaderPanel.jsx';

export default function ActingOnBehalfPopover({ 
  isOpen, 
  onClose, 
  actingContext, 
  actingEntity, 
  onContextChange 
}) {
  const options = [
    { id: 'person-alex', type: 'person', name: 'Alex Developer', icon: User },
    { id: 'org-1', type: 'organization', name: 'Tech Corp', icon: Building },
    { id: 'org-2', type: 'organization', name: 'Design Studio', icon: Building },
    { id: 'group-1', type: 'group', name: 'Frontend Team', icon: Users },
    { id: 'group-2', type: 'group', name: 'Backend Team', icon: Users },
  ];

  const handleOptionClick = (option) => {
    onContextChange({ type: option.type, entity: option.name });
    onClose();
  };

  const isSelected = (option) => {
    return option.type === actingContext && option.name === actingEntity;
  };

  return (
    <HeaderPanel isOpen={isOpen} onClose={onClose} title="Acting As">
      <p className="text-xs text-white/65 px-2 mb-2">
        Switch between personal, organization, and group contexts
      </p>

      <div className="space-y-2 header-panel-inner">
        {options.map((option) => {
          const IconComponent = option.icon;
          const selected = isSelected(option);
          
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`flex items-center gap-3 p-3 w-full text-left rounded-lg persona-card hover:bg-white/10 transition-colors ${
                selected ? 'bg-white/5' : ''
              }`}
              aria-label={`Switch to ${option.name}`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 shrink-0">
                <IconComponent 
                  className={`w-5 h-5 ${selected ? 'text-green-500' : 'text-white'}`} 
                  strokeWidth={2} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate text-white/95">
                  {option.name}
                </div>
                <div className="text-xs text-white/65 capitalize">
                  {option.type}
                </div>
              </div>
              {selected && (
                <div className="shrink-0 text-green-500 bg-white/5 p-1 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}

        {options.length === 0 && (
          <div className="p-6 text-center border border-dashed border-white/20 rounded-lg header-panel-inner">
            <p className="text-sm font-semibold text-white/95">No options available</p>
            <p className="text-xs text-white/65 mt-1">Manage your contexts in settings.</p>
          </div>
        )}
      </div>
    </HeaderPanel>
  );
}