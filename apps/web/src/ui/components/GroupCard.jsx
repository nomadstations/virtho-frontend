import React from 'react';
import { Users, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const GroupCard = ({ group, onEdit, onDelete, onClick }) => {
  const overridesCount = Object.keys(group.permissionOverrides || {}).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm relative group hover:border-primary-light hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
      <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          onClick={(e) => { e.stopPropagation(); onEdit(group); }}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={(e) => { e.stopPropagation(); onDelete(group); }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-4 pr-16">
        <div className="w-12 h-12 rounded-xl bg-primary-lighter text-primary-darkest flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-lg">
            {group.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {group.description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          {group.memberIds?.length || 0} Members
        </Badge>
        {overridesCount > 0 && (
          <Badge variant="outline" className="bg-secondary/10 text-secondary-darkest border-secondary/30">
            {overridesCount} Permission Override{overridesCount !== 1 && 's'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default GroupCard;