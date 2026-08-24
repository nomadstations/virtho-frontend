import React, { useState } from 'react';
import { Store, Plus } from 'lucide-react';
import ProviderWorkspaceLayout from '@/ui/layouts/ProviderWorkspaceLayout';
import ProductsTable from '@/ui/components/ProductsTable';
import OrdersTable from '@/ui/components/OrdersTable';
import AddProductModal from '@/ui/components/AddProductModal';
import { Button } from '@/ui/primitives/button';

export default function MyShopPage() {
  // Mock State
  const [products, setProducts] = useState([
    { id: 'p1', name: 'Handcrafted Wooden Desk', price: 299.99, stock: 12, status: 'Active' },
    { id: 'p2', name: 'Ceramic Coffee Mug set', price: 34.50, stock: 45, status: 'Active' },
    { id: 'p3', name: 'Organic Cotton T-Shirt', price: 28.00, stock: 0, status: 'Inactive' },
    { id: 'p4', name: 'Leather Messenger Bag', price: 159.00, stock: 8, status: 'Active' },
    { id: 'p5', name: 'Vintage Desk Lamp', price: 85.00, stock: 3, status: 'Draft' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'Alice Johnson', product: 'Handcrafted Wooden Desk', amount: 299.99, status: 'Delivered', date: '2026-07-10' },
    { id: 'ORD-002', customer: 'Bob Smith', product: 'Ceramic Coffee Mug set', amount: 34.50, status: 'Shipped', date: '2026-07-15' },
    { id: 'ORD-003', customer: 'Charlie Davis', product: 'Leather Messenger Bag', amount: 159.00, status: 'Processing', date: '2026-07-17' },
    { id: 'ORD-004', customer: 'Diana Ross', product: 'Vintage Desk Lamp', amount: 85.00, status: 'Pending', date: '2026-07-18' },
    { id: 'ORD-005', customer: 'Ethan Hunt', product: 'Ceramic Coffee Mug set', amount: 69.00, status: 'Pending', date: '2026-07-18' },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Derived Summary
  const summaryCards = [
    { number: '$5,432.50', label: 'Total Revenue' },
    { number: products.filter(p => p.status === 'Active').length, label: 'Active Listings' },
    { number: orders.filter(o => o.status === 'Pending').length, label: 'Pending Orders' },
    { number: orders.length, label: 'Total Sales' },
  ];

  // Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
      setProducts([productData, ...products]);
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <ProviderWorkspaceLayout
      zone="economy"
      title="My Shop"
      icon={Store}
      summaryCards={summaryCards}
    >
      {/* Section: My Products */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">My Products</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your inventory and listings.</p>
          </div>
          <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
        
        <ProductsTable 
          products={products} 
          onEdit={handleOpenEditModal} 
          onDelete={handleDeleteProduct} 
        />
      </section>

      {/* Section: Incoming Orders */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Incoming Orders</h2>
          <p className="text-sm text-muted-foreground mt-1">Track and fulfill customer orders.</p>
        </div>
        
        <OrdersTable orders={orders} />
      </section>

      {/* Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleProductSubmit}
        editingProduct={editingProduct}
      />
    </ProviderWorkspaceLayout>
  );
}