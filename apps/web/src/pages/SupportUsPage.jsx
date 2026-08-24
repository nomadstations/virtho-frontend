import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ROUTES } from '@/constants';
import { EmptyState } from '@/components/SharedUI';

function SupportUsPage() {
  return (
    <>
      <Helmet>
        <title>Support Us - Virtho Foundation</title>
      </Helmet>
      
      <main className="container mx-auto px-4 py-16 flex flex-grow items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">
              <EmptyState 
                icon={Heart} 
                title="Support Our Mission" 
                description="This page is currently under construction. Check back soon for ways to contribute to the Human Development Hub."
              />
              <div className="mt-8 text-center">
                <Link to={ROUTES.HOME}>
                    <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 font-bold">
                        Back to Home
                    </Button>
                </Link>
              </div>
          </motion.div>
      </main>
    </>
  );
}

export default SupportUsPage;