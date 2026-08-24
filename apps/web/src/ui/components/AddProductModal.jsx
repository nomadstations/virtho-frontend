import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { Input } from '@/ui/primitives/input';
import { Label } from '@/ui/primitives/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/primitives/select';

export default function AddProductModal({ isOpen, onClose, onSubmit, editingProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    status: 'Active'
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
        status: editingProduct.status
      });
    } else {
      setFormData({
        name: '',
        price: '',
        stock: '',
        status: 'Active'
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (val) => {
    setFormData(prev => ({ ...prev, status: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.price === '' || formData.stock === '') return;
    
    onSubmit({
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
      <div 
        className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl font-bold text-foreground">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Product Name *</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Vintage Leather Jacket" 
              required
              className="text-foreground"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-foreground">Price ($) *</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                min="0"
                value={formData.price} 
                onChange={handleChange} 
                placeholder="0.00"
                required
                className="text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-foreground">Stock Quantity *</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                min="0"
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="0"
                required
                className="text-foreground"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="text-foreground">Status *</Label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full text-foreground">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}