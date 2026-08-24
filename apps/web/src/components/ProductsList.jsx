import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, PackageX } from 'lucide-react';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';
import MarketplaceProductCard from './MarketplaceProductCard';
import MarketplaceListView from './MarketplaceListView';

// Product image overrides for specific products with missing/broken images
const PRODUCT_IMAGE_OVERRIDES = {
  "Professional Camera Kit": "https://horizons-cdn.hostinger.com/dd40932c-3fd8-4239-81a1-2a739c0fce93/f73fb80c539aefd0435afe0e5b9f8725.png"
};

const ProductsList = ({ 
  searchTerm = '', 
  filters = {}, 
  sortBy = 'relevance',
  viewMode = 'grid',
  currentPage = 1,
  pageSize = 12,
  onTotalItemsChange
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (!productsResponse || !productsResponse.products || productsResponse.products.length === 0) {
          setProducts([]);
          if (onTotalItemsChange) onTotalItemsChange(0);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        if (quantitiesResponse && quantitiesResponse.variants) {
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });
        }

        // Add mocked fields for marketplace UI testing and apply image overrides
        const enrichedProducts = productsResponse.products.map(product => {
          // Generate deterministic mock data based on ID
          const idNum = product.id ? product.id.charCodeAt(0) : 0;
          const categories = ['Digital', 'Merchandise', 'Services'];
          
          // Apply image override if product title matches
          const overrideImage = PRODUCT_IMAGE_OVERRIDES[product.title];
          
          return {
            ...product,
            image: overrideImage || product.image, // Override image if available
            mockRating: (idNum % 2) + 4, // 4 or 5
            mockReviews: (idNum * 3) % 150 + 12,
            mockCategory: categories[idNum % categories.length],
            mockBrand: idNum % 3 === 0 ? 'Virtho' : 'Partner',
            variants: product.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };
        });

        setProducts(enrichedProducts);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Apply Filters
    result = result.filter(product => {
      // Search Term Filter
      const matchesSearch = !searchTerm || 
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      // Category Filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.mockCategory)) return false;
      }

      // Rating Filter
      if (filters.minRating && product.mockRating < filters.minRating) {
        return false;
      }

      // Price Range Filter
      const productPrice = product.variants[0]?.sale_price_in_cents || product.variants[0]?.price_in_cents;
      const priceInDollars = productPrice ? productPrice / 100 : 0;
      
      if (filters.maxPrice && priceInDollars > filters.maxPrice) return false;

      // Availability Filter
      if (filters.inStockOnly) {
         const isOutOfStock = !product.purchasable || (product.variants[0] && product.variants[0].manage_inventory && product.variants[0].inventory_quantity <= 0);
         if (isOutOfStock) return false;
      }

      return true;
    });

    // 2. Apply Sorting
    result.sort((a, b) => {
      const priceA = a.variants[0]?.sale_price_in_cents || a.variants[0]?.price_in_cents || 0;
      const priceB = b.variants[0]?.sale_price_in_cents || b.variants[0]?.price_in_cents || 0;

      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return (b.mockRating || 0) - (a.mockRating || 0);
        case 'newest':
          return new Date(b.created_at || b.updated_at) - new Date(a.created_at || a.updated_at);
        case 'relevance':
        default:
          return 0; // Keep original order or apply custom relevance logic
      }
    });

    // Notify parent of total items after filtering (before pagination)
    if (onTotalItemsChange) {
      onTotalItemsChange(result.length);
    }

    return result;
  }, [products, searchTerm, filters, sortBy, onTotalItemsChange]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedProducts.slice(startIndex, startIndex + pageSize);
  }, [processedProducts, currentPage, pageSize]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-6">
        <Loader2 className="h-16 w-16 text-purple-600 animate-spin" />
        <p className="text-gray-600 font-semibold text-lg">Loading the marketplace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-12 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
        <p className="font-bold text-xl mb-2">Error loading products</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 p-20 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <PackageX className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
        <p className="text-lg">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product, index) => (
            <MarketplaceProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {paginatedProducts.map((product, index) => (
            <MarketplaceListView key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;