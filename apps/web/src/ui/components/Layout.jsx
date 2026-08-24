import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/ui/components/Header';
import Footer from '@/ui/components/Footer';

const Layout = ({ children, setIsCartOpen }) => {
  const location = useLocation();
  
  // Dashboard and Workspace routes should not display the public footer
  const isDashboardRoute = location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/');
  const isWorkspaceRoute = location.pathname.startsWith('/workspace/');
  const hideFooter = isDashboardRoute || isWorkspaceRoute;

  return (
    <div className="flex flex-col min-h-screen relative bg-background overflow-visible text-foreground">
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="flex-grow flex flex-col w-full overflow-visible relative">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;