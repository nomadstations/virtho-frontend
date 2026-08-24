import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ServiceTypeBadge from './ServiceTypeBadge';
import ClientAvatar from './ClientAvatar';
import { useToast } from '@/hooks/use-toast';

export default function OrdersTable({ data }) {
  const { toast } = useToast();
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'deadline') {
      aVal = new Date(a.deadline).getTime();
      bVal = new Date(b.deadline).getTime();
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAction = (action, id) => {
    toast({
      title: 'Action Triggered',
      description: `${action} action for Order ${id} is coming soon!`,
    });
  };

  const isUrgent = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  return (
    <div className="rounded-md border border-border/50 bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[100px] cursor-pointer whitespace-nowrap" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">Order ID <ArrowUpDown className="w-3 h-3" /></div>
              </TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('clientName')}>
                <div className="flex items-center gap-1">Client <ArrowUpDown className="w-3 h-3" /></div>
              </TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('serviceType')}>
                <div className="flex items-center gap-1">Service <ArrowUpDown className="w-3 h-3" /></div>
              </TableHead>
              <TableHead className="whitespace-nowrap">Language Pair</TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('deadline')}>
                <div className="flex items-center gap-1">Deadline <ArrowUpDown className="w-3 h-3" /></div>
              </TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></div>
              </TableHead>
              <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((order) => (
              <TableRow key={order.id} className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-primary cursor-pointer hover:underline">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ClientAvatar name={order.clientName} />
                    <span className="font-medium text-foreground whitespace-nowrap">{order.clientName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ServiceTypeBadge type={order.serviceType} />
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {order.languagePair}
                </TableCell>
                <TableCell>
                  <span className={isUrgent(order.deadline) ? 'text-danger font-semibold' : 'text-muted-foreground'}>
                    {new Date(order.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction('View', order.id)}>
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction('Edit', order.id)}>
                      <Edit className="w-4 h-4 text-muted-foreground hover:text-warning" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction('Delete', order.id)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-danger" />
                    </Button>
                  </div>
                  <div className="lg:hidden flex items-center justify-end gap-1">
                    {/* Always show actions on mobile */}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction('View', order.id)}>
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Mockup */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">{sortedData.length}</span> of <span className="font-medium text-foreground">{sortedData.length}</span> results
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}