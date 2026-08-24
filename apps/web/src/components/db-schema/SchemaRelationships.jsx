import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRightLeft, Link as LinkIcon, Database } from 'lucide-react';

export default function SchemaRelationships({ tables }) {
  // Extract all relationships into a flat list
  const relationships = (tables || []).flatMap(table => 
    (table.relationships || []).map(rel => ({
      sourceTable: table.name,
      ...rel
    }))
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Database size={20} className="text-purple-600" />
            Entity Relationship Map
          </CardTitle>
          <CardDescription>
            Overview of foreign key connections and dependencies between database tables.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relationships.map((rel, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{rel.sourceTable}</span>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {rel.foreignKey}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {rel.type}
                  </div>
                </div>
                
                <div className="px-4 text-purple-400 group-hover:text-purple-600 transition-colors">
                  <ArrowRightLeft size={20} />
                </div>
                
                <div className="flex-1 text-right">
                  <span className="font-bold text-gray-900 inline-flex items-center gap-1">
                    <LinkIcon size={14} className="text-gray-400" />
                    {rel.target}
                  </span>
                  <div className="text-sm text-gray-500 font-medium">
                    References ID
                  </div>
                </div>
              </div>
            ))}
            
            {relationships.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No explicit relationships defined.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}