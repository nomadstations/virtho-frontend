import React from 'react';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';
import HeaderPanel from './HeaderPanel.jsx';

export default function CartPopover({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({ title: 'Cart empty', description: 'Add products before checking out.', variant: 'destructive' });
      return;
    }
    try {
      const items = cartItems.map(i => ({ variant_id: i.variant.id, quantity: i.quantity }));
      const { url } = await initializeCheckout({ items, successUrl: `${window.location.origin}/success`, cancelUrl: window.location.href });
      clearCart();
      window.location.href = url;
    } catch (e) {
      toast({ title: 'Checkout Error', description: 'Failed to initialize checkout.', variant: 'destructive' });
    }
  };

  return (
    <HeaderPanel isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      {cartItems.length === 0 ? (
        <div className="p-6 text-center header-panel-item-secondary text-sm flex flex-col items-center gap-3 header-panel-inner">
          <ShoppingBag className="w-10 h-10 opacity-40 header-panel-icon" />
          Your cart is empty.
        </div>
      ) : (
        cartItems.map(item => (
          <div key={item.variant.id} className="flex gap-3 p-3 w-full text-left text-sm rounded-md header-panel-item border border-transparent">
            <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover rounded-md border border-white/10 shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="font-semibold truncate">{item.product.title}</div>
                <div className="text-xs header-panel-item-secondary truncate mt-0.5">{item.variant.title}</div>
              </div>
              <div className="font-medium mt-1">{item.variant.sale_price_formatted}</div>
            </div>
            <div className="flex flex-col items-end justify-between shrink-0">
              <button onClick={() => removeFromCart(item.variant.id)} className="header-panel-item-secondary hover:text-red-400 p-1 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center border border-white/20 rounded overflow-hidden">
                <button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} className="p-1 header-panel-item header-panel-item-secondary hover:text-white"><Minus className="w-3 h-3" /></button>
                <span className="px-1.5 text-xs font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="p-1 header-panel-item header-panel-item-secondary hover:text-white"><Plus className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))
      )}
      
      {cartItems.length > 0 && (
        <div className="mt-2 p-4 border-t border-white/10 shrink-0 header-panel-inner">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-white">Total</span>
            <span className="font-bold text-lg text-white">{getCartTotal()}</span>
          </div>
          <button onClick={handleCheckout} className="w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary-dark transition-colors shadow-sm">
            Proceed to Checkout
          </button>
        </div>
      )}
    </HeaderPanel>
  );
}