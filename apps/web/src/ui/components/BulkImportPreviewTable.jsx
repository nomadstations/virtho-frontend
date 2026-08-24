import React from 'react';
import BulkImportPreviewRow from './BulkImportPreviewRow';

export default function BulkImportPreviewTable({ rows }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <div className="overflow-x-auto max-h-[300px]">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm outline outline-1 outline-gray-200">
            <tr>
              <th className="px-3 py-2 font-semibold text-gray-600 w-10 text-center">Status</th>
              <th className="px-3 py-2 font-semibold text-gray-600">First Name</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Last Name</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Email</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Role</th>
              <th className="px-3 py-2 font-semibold text-gray-600">State</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Verified</th>
              <th className="px-3 py-2 font-semibold text-gray-600">Groups</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <BulkImportPreviewRow key={idx} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}