import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle2, Shield, Zap } from 'lucide-react';
import { useDBSchema } from '@/contexts/DBSchemaContext';

export default function SchemaOverview() {
  const { schema } = useDBSchema();
  const lastUpdated = schema?.lastUpdated ? new Date(schema.lastUpdated).toLocaleString() : 'Never';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md border-none">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-purple-100 font-medium mb-1">Total Entities</p>
              <h3 className="text-4xl font-bold">{schema?.tables?.length || 0}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-400/30 flex items-center gap-2 text-sm text-purple-100">
              <DatabaseIcon className="w-4 h-4" /> Core tables mapped
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-500 font-medium mb-1">Last Schema Update</p>
              <h3 className="text-xl font-bold text-gray-900">{lastUpdated}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-green-600 font-medium">
              <Clock className="w-4 h-4" /> Real-time sync active
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-500 font-medium mb-1">Tracked Operations</p>
              <h3 className="text-xl font-bold text-gray-900">{schema?.operations?.length || 0}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-blue-600 font-medium">
              <Zap className="w-4 h-4" /> Activity logs recorded
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <CheckCircle2 className="text-green-500" />
              Best Practices & Design Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>
              The Virtho Platform database is structured around a highly normalized relational model emphasizing data integrity and performance.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>UUID Primary Keys:</strong> All tables use UUIDs for security against ID enumeration and distributed scale compatibility.</li>
              <li><strong>Soft Deletes:</strong> Entities utilize <code>status</code> or <code>isActive</code> flags instead of destructive hard deletes.</li>
              <li><strong>Timestamps:</strong> Every table implements standard <code>createdAt</code> and <code>updatedAt</code> tracking.</li>
              <li><strong>Polymorphic Relations:</strong> The Comments table implements a polymorphic approach using <code>post_type</code> and <code>post_id</code> to attach across different entities.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Shield className="text-blue-500" />
              Validation & Security Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>
              Strict database constraints provide the first layer of defense against invalid state:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Unique Constraints:</strong> Applied to critical identification fields like <code>email</code>, <code>slug</code>, and <code>sku</code>.</li>
              <li><strong>Referential Integrity:</strong> All foreign keys enforce strict relational constraints ensuring orphaned records are impossible.</li>
              <li><strong>Default Values:</strong> Application state logic is simplified via sensible defaults (e.g., status defaults to 'active' or 'draft').</li>
              <li><strong>Audit Logging:</strong> The <code>ActivityLogs</code> table maintains an immutable record of all destructive changes within the system.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}