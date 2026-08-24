import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SimpleModal } from './SimpleModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PortfolioManagementSection() {
  const { dashboardData, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { title: '', description: '', image: '', technologies: '', link: '' };
  const [formData, setFormData] = useState(initialForm);

  const filteredItems = dashboardData.portfolios.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePortfolioItem(editingId, formData);
      toast({ title: 'Success', description: 'Portfolio item updated' });
    } else {
      addPortfolioItem(formData);
      toast({ title: 'Success', description: 'Portfolio item created' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this portfolio item?')) {
      deletePortfolioItem(id);
      toast({ title: 'Deleted', description: 'Item removed from portfolio' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Portfolio</h2>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Add Item
        </Button>
      </div>

      <div className="flex bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search portfolio..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-gray-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Technologies</th>
              <th className="px-6 py-4">Link</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No items found.</td></tr>
            ) : (
              filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{item.technologies}</td>
                  <td className="px-6 py-4">
                    {item.link ? <a href={item.link} className="text-purple-600 hover:underline">{item.link}</a> : '-'}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Item" : "Add Item"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
            <Input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
            <Input value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="text-gray-900"/>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{editingId ? "Save Changes" : "Save Item"}</Button>
        </form>
      </SimpleModal>
    </div>
  );
}