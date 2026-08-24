import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Simple Dashboard Breadcrumb Component
 * 
 * Displays: "Dashboard home > {pageName}"
 * - "Dashboard home" is a clickable link to /dashboard
 * - Current page name is static text (not a link)
 * 
 * @param {string} pageName - The name of the current dashboard page
 */
function DashboardBreadcrumb({ pageName }) {
  return (
    <nav aria-label="Dashboard breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link
            to="/dashboard"
            className="hover:text-lavender-primary transition-colors font-medium"
          >
            Dashboard home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
        </li>
        <li>
          <span className="text-gray-900 font-semibold" aria-current="page">
            {pageName}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default DashboardBreadcrumb;