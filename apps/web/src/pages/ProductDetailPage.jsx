import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getProduct, getProductQuantities, formatCurrency } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart as ShoppingCartIcon, Minus, Plus } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import Gallery from '@/components/Gallery';
import { LoadingSpinner } from '@/components/SharedUI';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const p = await getProduct(id);
        const q = await getProductQuantities({ fields: 'inventory_quantity', product_ids: [p.id] });
        
        const vMap = new Map();
        q.variants.forEach(v => vMap.set(v.id, v.inventory_quantity));
        
        const fullP = { 
          ...p, 
          variants: p.variants.map(v => ({ 
            ...v, 
            inventory_quantity: vMap.get(v.id) ?? v.inventory_quantity 
          })) 
        };
        
        setProduct(fullP);
        if (fullP.variants.length > 0) setSelectedVariant(fullP.variants[0]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    if (!product || !selectedVariant) return;
    try {
      await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity);
      toast({ title: "Added to Cart! 🛒" });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !product) return <div className="py-20 text-center text-red-500">Error loading product.</div>;

  const price = selectedVariant?.sale_price_in_cents 
    ? formatCurrency(selectedVariant.sale_price_in_cents, selectedVariant.currency_info || { code: 'USD' }) 
    : formatCurrency(selectedVariant?.price_in_cents, selectedVariant?.currency_info || { code: 'USD' });
    
  const canAddToCart = (!selectedVariant?.manage_inventory || quantity <= selectedVariant?.inventory_quantity) && product.purchasable;

  return (
    <>
      <Helmet><title>{product.title} - Marketplace</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0 h-full">
            <div className="border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50 flex flex-col p-8">
               <ProductGallery images={product.images || []} productName={product.title} ribbonText={product.ribbon_text}/>
               <div className="mt-8 w-full">
                 <Gallery />
               </div>
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
              <div className="mb-6"><span className="text-4xl font-black text-gray-900">{price}</span></div>
              
              <div className="prose prose-sm sm:prose text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />
              
              {product.variants && product.variants.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Select Variant</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedVariant?.id === v.id 
                            ? 'bg-purple-600 text-white border-purple-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600'
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden h-12 w-full sm:w-32">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-gray-500 hover:bg-gray-100 transition-colors"><Minus size={18}/></button>
                    <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-gray-500 hover:bg-gray-100 transition-colors"><Plus size={18}/></button>
                  </div>
                  <Button onClick={handleAdd} disabled={!canAddToCart} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition-all">
                    <ShoppingCartIcon className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
                {selectedVariant?.manage_inventory && (
                  <div className="mt-3 text-sm text-center sm:text-left">
                    {selectedVariant.inventory_quantity > 0 
                      ? <span className="text-green-600 font-medium">{selectedVariant.inventory_quantity} in stock</span>
                      : <span className="text-red-500 font-medium">Out of stock</span>
                    }
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetailPage;