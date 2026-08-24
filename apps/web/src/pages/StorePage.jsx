import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import ProductsList from '@/components/ProductsList';
import ShoppingCart from '@/components/ShoppingCart';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/hooks/useCart';
import Footer from '@/components/Footer';

function StorePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>Store - Virtho Foundation</title>
        <meta name="description" content="Browse and purchase products from Virtho Foundation's online store." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white flex flex-col">
        <main className="container mx-auto px-4 py-16 flex-grow">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search store products by name or description..." 
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 relative"
          >
            <div className="absolute top-0 right-0 hidden md:block">
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2 rounded-full px-6 shadow-md"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>View Cart ({totalItems})</span>
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Virtho Store</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-6">
              Support our mission by purchasing exclusive merchandise and products
            </p>
            
            <div className="md:hidden flex justify-center mb-8">
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2 rounded-full px-6 shadow-md"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>View Cart ({totalItems})</span>
              </Button>
            </div>
          </motion.div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <ProductsList searchTerm={searchTerm} />
          </div>
        </main>

        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

        <Footer variant="dark" className="mt-12" />
      </div>
    </>
  );
}

export default StorePage;