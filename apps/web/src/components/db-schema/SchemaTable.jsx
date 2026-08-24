import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Key } from 'lucide-react';

export default function SchemaTable({ table }) {
  if (!table) return null;

  const getConstraintBadge = (constraint) => {
    if (constraint.includes('PK')) return <Badge key={constraint} variant="default" className="bg-purple-600"><Key size={12} className="mr-1"/> PK</Badge>;
    if (constraint.includes('FK')) return <Badge key={constraint} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">FK</Badge>;
    if (constraint.includes('UNIQUE')) return <Badge key={constraint} variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">UNIQUE</Badge>;
    if (constraint.includes('NOT NULL')) return <Badge key={constraint} variant="outline" className="text-red-600 border-red-200 bg-red-50">NOT NULL</Badge>;
    return <Badge key={constraint} variant="outline" className="text-gray-600">{constraint}</Badge>;
  };

  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {table.name}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600 text-base">
              {table.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm font-medium bg-gray-200 text-gray-800">
            {table.columns?.length || 0} columns
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-gray-900">Column Name</TableHead>
                <TableHead className="w-[150px] font-semibold text-gray-900">Data Type</TableHead>
                <TableHead className="font-semibold text-gray-900">Constraints</TableHead>
                <TableHead className="font-semibold text-gray-900">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.columns?.map((col, idx) => (
                <TableRow key={col.name || idx} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{col.name}</TableCell>
                  <TableCell className="font-mono text-sm text-purple-700">{col.type}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {col.constraints?.length > 0 ? col.constraints.map((c) => (
                        getConstraintBadge(c)
                      )) : <span className="text-gray-400 text-sm">-</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">{col.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}