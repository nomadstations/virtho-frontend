import React from 'react';

export default function BulkImportSummary({ validCount, totalCount }) {
  return (
    <div className="text-sm font-medium py-2 px-1 text-gray-700 flex items-center gap-2">
      <span className="flex h-6 items-center rounded-full bg-primary/10 px-2.5 text-xs font-semibold text-primary-dark">
        {validCount} valid
      </span>
      <span>of {totalCount} rows importable</span>
    </div>
  );
}