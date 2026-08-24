import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function BulkImportPreviewRow({ row }) {
  return (
    <tr className={`hover:bg-muted/50 transition-colors ${!row.isValid ? 'bg-destructive/10 hover:bg-destructive/20' : ''}`}>
      <td className="px-3 py-2 text-center" title={row.errorMessage || 'Valid'}>
        {row.isValid ? (
          <CheckCircle2 className="w-4 h-4 text-success mx-auto" />
        ) : (
          <XCircle className="w-4 h-4 text-destructive mx-auto cursor-help" />
        )}
      </td>
      <td className="px-3 py-2 text-gray-900 truncate max-w-[120px]">{row.firstName || '-'}</td>
      <td className="px-3 py-2 text-gray-900 truncate max-w-[120px]">{row.lastName || '-'}</td>
      <td className="px-3 py-2 text-gray-600 truncate max-w-[150px]">{row.email || '-'}</td>
      <td className="px-3 py-2 text-gray-600">{row.role || '-'}</td>
      <td className="px-3 py-2 text-gray-600">{row.status || '-'}</td>
      <td className="px-3 py-2 text-gray-600">{row.verified || '-'}</td>
      <td className="px-3 py-2 text-gray-600 truncate max-w-[120px]">{row.groups || '-'}</td>
    </tr>
  );
}