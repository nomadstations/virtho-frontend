import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { generatePublicBreadcrumbs } from '@/config/publicBreadcrumbConfig';

const PublicBreadcrumb = ({ customCrumbs = null }) => {
  const location = useLocation();
  
  // Use custom breadcrumbs if provided, otherwise generate from location
  const breadcrumbs = customCrumbs || generatePublicBreadcrumbs(location.pathname);

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="public-breadcrumb mb-6 w-full overflow-x-auto">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground min-w-max">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span 
                  className="breadcrumb-active text-foreground font-semibold truncate max-w-xs" 
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.path}
                    className="breadcrumb-link text-zone font-medium hover:opacity-80 transition-opacity truncate max-w-xs"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight 
                    className="breadcrumb-separator mx-2 text-muted-foreground flex-shrink-0" 
                    size={16} 
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PublicBreadcrumb;