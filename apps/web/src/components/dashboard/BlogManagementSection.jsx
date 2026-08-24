import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SimpleModal } from './SimpleModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { REALM_LABELS } from '@/utils/realmLabels';

export default function BlogManagementSection() {
  const { dashboardData, addBlog, updateBlog, deleteBlog } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const initialForm = { title: '', author: '', date: '', category: 'Tech', image: '', excerpt: '', content: '', realms: [] };
  const [formData, setFormData] = useState(initialForm);

  const filteredBlogs = dashboardData.blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || b.category === categoryFilter)
  );

  const handleOpenModal = (blog = null) => {
    setFormErrors({});
    if (blog) {
      setFormData({ ...initialForm, ...blog, realms: blog.realms || [] });
      setEditingId(blog.id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleRealmChange = (realmKey, isChecked) => {
    const currentRealms = formData.realms || [];
    const newRealms = isChecked 
      ? [...currentRealms, realmKey]
      : currentRealms.filter(r => r !== realmKey);
    setFormData({ ...formData, realms: newRealms });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.realms || formData.realms.length === 0) {
      setFormErrors({ realms: 'Please select at least one realm.' });
      return;
    }

    if (editingId) {
      updateBlog(editingId, formData);
      toast({ title: 'Success', description: 'Blog updated successfully' });
    } else {
      addBlog(formData);
      toast({ title: 'Success', description: 'Blog created successfully' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
      toast({ title: 'Deleted', description: 'Blog has been removed' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Blogs</h2>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Create Blog
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search blogs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-gray-900" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px] text-gray-900">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBlogs.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No blogs found.</td></tr>
              ) : (
                filteredBlogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{blog.title}</td>
                    <td className="px-6 py-4 text-gray-600">{blog.author}</td>
                    <td className="px-6 py-4 text-gray-600">{blog.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-semibold">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Blog" : "Create Blog"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="text-gray-900"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <Input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="text-gray-900"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="text-gray-900"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                <SelectTrigger className="text-gray-900"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="text-gray-900"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Realms <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(REALM_LABELS).map(([key, label]) => {
                const isChecked = (formData.realms || []).includes(key);
                return (
                  <label key={key} className={`flex items-center gap-2 px-3 py-1.5 border rounded-full cursor-pointer transition-colors ${isChecked ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-gray-50 border-gray-200'}`}>
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={(e) => handleRealmChange(key, e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                );
              })}
            </div>
            {formErrors.realms && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.realms}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <Textarea required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="text-gray-900"/>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{editingId ? "Save Changes" : "Create Blog"}</Button>
        </form>
      </SimpleModal>
    </div>
  );
}