import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SimpleModal } from './SimpleModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TeamManagementSection() {
  const { dashboardData, addTeam, updateTeam, deleteTeam } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { name: '', description: '', image: '', members: '' };
  const [formData, setFormData] = useState(initialForm);

  const filteredTeams = dashboardData.teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (team = null) => {
    if (team) {
      setFormData(team);
      setEditingId(team.id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTeam(editingId, formData);
      toast({ title: 'Success', description: 'Team updated successfully' });
    } else {
      addTeam(formData);
      toast({ title: 'Success', description: 'Team created successfully' });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this team?')) {
      deleteTeam(id);
      toast({ title: 'Deleted', description: 'Team removed' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Teams</h2>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700">
          <Plus size={16} className="mr-2" /> Create Team
        </Button>
      </div>

      <div className="flex bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search teams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-gray-900" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Members Count</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTeams.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No teams found.</td></tr>
            ) : (
              filteredTeams.map(team => {
                const membersCount = team.members ? team.members.split(',').length : 0;
                return (
                  <tr key={team.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{team.name}</td>
                    <td className="px-6 py-4 text-gray-600">{membersCount} members</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[250px]">{team.description}</td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(team)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(team.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Team" : "Create Team"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Members (comma-separated names)</label>
            <Input value={formData.members} onChange={e => setFormData({...formData, members: e.target.value})} placeholder="Alice, Bob, Charlie" className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="text-gray-900"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Logo/Image URL</label>
            <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="text-gray-900"/>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{editingId ? "Save Changes" : "Create Team"}</Button>
        </form>
      </SimpleModal>
    </div>
  );
}