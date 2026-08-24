import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Star, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/api/EcommerceApi';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const MarketplaceListView = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  
  const displayPrice = useMemo(() => {
    if (hasSale && displayVariant.sale_price_in_cents) {
       return typeof formatCurrency === 'function' ? formatCurrency(displayVariant.sale_price_in_cents, { code: 'USD' }) : displayVariant.sale_price_formatted;
    }
    return typeof formatCurrency === 'function' && displayVariant.price_in_cents ? formatCurrency(displayVariant.price_in_cents, { code: 'USD' }) : displayVariant.price_formatted;
  }, [displayVariant, hasSale]);
  
  const originalPrice = useMemo(() => {
    if (!hasSale) return null;
    return typeof formatCurrency === 'function' && displayVariant.price_in_cents ? formatCurrency(displayVariant.price_in_cents, { code: 'USD' }) : displayVariant.price_formatted;
  }, [displayVariant, hasSale]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Added to Cart! 🛒",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error adding to cart",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isOutOfStock = !product.purchasable || (displayVariant && displayVariant.manage_inventory && displayVariant.inventory_quantity <= 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row group"
    >
      <Link to={`/product/${product.id}`} className="relative overflow-hidden md:w-1/3 lg:w-1/4 aspect-square md:aspect-auto md:min-h-[240px] flex-shrink-0 bg-gray-50 flex items-center justify-center p-6 cursor-pointer">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image || placeholderImage}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        {product.ribbon_text && (
          <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
            {product.ribbon_text}
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
            Out of Stock
          </div>
        )}
      </Link>
      
      <div className="p-6 flex flex-col flex-grow justify-center">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">{product.mockCategory || 'Product'}</span>
            {product.userType && (
              <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                <User className="w-3 h-3 mr-1" />
                {product.userType}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < (product.mockRating || 4) ? 'fill-current' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-500 ml-2 hidden sm:inline-block">({product.mockReviews || 0} reviews)</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {product.description || 'No description available for this item. Check out the product details page for more information.'}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-auto gap-4 pt-4 border-t border-gray-100">
          <div>
            {hasSale && (
              <span className="text-sm text-gray-400 line-through block">{originalPrice}</span>
            )}
            <span className="text-3xl font-extrabold text-gray-900">{displayPrice}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to={`/product/${product.id}`}>
              <Button 
                variant="outline" 
                className="hidden sm:flex border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold gap-2 h-auto py-2 px-5 rounded-xl"
              >
                <Eye className="w-4 h-4" />
                Details
              </Button>
            </Link>
            <Button 
              onClick={handleAddToCart} 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-2 h-auto flex items-center shadow-md w-full sm:w-auto gap-3"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="w-5 h-5" />
              <div className="flex flex-col items-start text-left">
                <span className="font-bold leading-none mb-1">Add</span>
                <span className="text-[10px] leading-none uppercase tracking-wide opacity-90">To Cart</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketplaceListView;