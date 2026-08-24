import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Ergonomic Developer Chair', price: 29900, rating: 4.8, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400' },
  { id: '2', title: 'Mechanical Keyboard Pro', price: 15900, rating: 4.9, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400' },
  { id: '3', title: 'Noise Cancelling Headphones', price: 24900, rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: '4', title: '4K Ultra-Wide Monitor', price: 59900, rating: 4.6, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400' },
];

export default function LatestMarketplace() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (product) => {
    addToCart(product, null, 1, 10);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground px-1">Marketplace Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map(product => (
          <div key={product.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group hover:-translate-y-1" style={{ borderColor: 'hsla(var(--zone-economy), 0.2)' }}>
            <div className="h-48 overflow-hidden bg-muted relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-xs text-amber-500 font-medium">
                  <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                  {product.rating}
                </div>
                <span className="font-bold text-foreground">{formatCurrency(product.price)}</span>
              </div>
              <Link to={`/product/${product.id}`} className="font-bold text-foreground mb-4 line-clamp-2 hover:text-primary transition-colors">
                {product.title}
              </Link>
              <button 
                onClick={() => handleAdd(product)}
                className="mt-auto flex items-center justify-center w-full py-2 bg-primary-lighter text-primary-dark text-xs font-semibold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}