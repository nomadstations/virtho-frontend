import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/ui/primitives/button';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/ui/primitives/use-toast';
import { formatCurrency } from '@/api/EcommerceApi';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const MarketplaceProductCard = ({ product, index }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} className="block h-full group">
        <div className="h-full flex flex-col rounded-xl border border-gray-100 bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-6">
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
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
            
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
               <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white text-gray-900 hover:bg-purple-50 hover:text-purple-600 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  onClick={(e) => { e.preventDefault(); navigate(`/product/${product.id}`); }}
                >
                  <Eye className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-700 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <span className="text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wider">{product.mockCategory || 'Product'}</span>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight flex-grow mb-2 group-hover:text-purple-700 transition-colors">
              {product.title}
            </h3>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (product.mockRating || 4) ? 'fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-500 ml-2">({product.mockReviews || 0} reviews)</span>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
              <div>
                {hasSale && (
                  <span className="text-sm text-gray-400 line-through block">{originalPrice}</span>
                )}
                <span className="text-2xl font-extrabold text-gray-900">{displayPrice}</span>
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 py-2 h-auto flex flex-col items-center justify-center shadow-sm"
                disabled={isOutOfStock}
              >
                <span className="font-bold leading-none mb-1">Add</span>
                <span className="text-[10px] leading-none uppercase tracking-wide opacity-90">To Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MarketplaceProductCard;