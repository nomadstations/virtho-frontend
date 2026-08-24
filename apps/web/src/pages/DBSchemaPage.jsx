import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDBSchema } from '@/contexts/DBSchemaContext';
import SchemaTable from '@/components/db-schema/SchemaTable';
import SchemaRelationships from '@/components/db-schema/SchemaRelationships';
import SchemaOverview from '@/components/db-schema/SchemaOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Database } from 'lucide-react';

export default function DBSchemaPage() {
  const { schema } = useDBSchema();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTables = (schema?.tables || []).filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.columns.some(col => col.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pt-8 pb-20">
      <Helmet>
        <title>Database Schema Documentation - Virtho</title>
        <meta name="description" content="Comprehensive database schema documentation, relationships, and tracking for the Virtho platform." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                <Database className="text-purple-600" size={32} />
                Database Schema Explorer
              </h1>
              <p className="text-gray-500 mt-2 text-lg">Interactive documentation of data models, constraints, and relationships.</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 w-full justify-start h-auto rounded-lg flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-6 py-2.5">
              Overview & Best Practices
            </TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-6 py-2.5">
              Table Definitions
            </TabsTrigger>
            <TabsTrigger value="relationships" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-6 py-2.5">
              Relationships Map
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-6 py-2.5">
              Recent Activity Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-in fade-in duration-300">
            <SchemaOverview />
          </TabsContent>

          <TabsContent value="tables" className="animate-in fade-in duration-300">
            <div className="mb-6 flex bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search tables, columns, or descriptions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-none shadow-none focus-visible:ring-0 text-base"
                />
              </div>
            </div>

            <div className="space-y-8">
              {filteredTables.length > 0 ? (
                filteredTables.map(table => (
                  <SchemaTable key={table.name} table={table} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <Database className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No tables found</h3>
                  <p className="text-gray-500">Try adjusting your search query.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="relationships" className="animate-in fade-in duration-300">
            <SchemaRelationships tables={schema?.tables} />
          </TabsContent>

          <TabsContent value="activity" className="animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Operations Log</h3>
              {schema?.operations?.length > 0 ? (
                <div className="space-y-4">
                  {schema.operations.map(op => (
                    <div key={op.id} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        op.action === 'CREATE' ? 'bg-green-100 text-green-800' :
                        op.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                        op.action === 'DELETE' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {op.action}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Table: {op.entity_type}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(op.timestamp).toLocaleString()}</p>
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded text-gray-600 font-mono break-all">
                          {JSON.stringify(op).substring(0, 150)}...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No CRUD operations tracked yet. Operations will appear here as they happen.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}