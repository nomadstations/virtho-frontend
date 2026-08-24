import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import { ROUTES } from '@/constants';

function ContactPage() {
    const { toast } = useToast();
    
    useEffect(() => {
        toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
    }, [toast]);

  return (
    <>
      <Helmet>
        <title>Contact - Virtho Foundation</title>
        <meta name="description" content="Get in touch with Virtho Foundation." />
      </Helmet>
      
      <main className="container mx-auto px-4 py-16 flex flex-grow items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Mail className="mx-auto h-24 w-24 text-purple-300 mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us Page Coming Soon!</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">We're setting up the best ways for you to get in touch. Stay tuned!</p>
              <Link to={ROUTES.HOME}>
                  <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 font-bold">
                      Back to Home
                  </Button>
              </Link>
          </motion.div>
      </main>
    </>
  );
}

export default ContactPage;