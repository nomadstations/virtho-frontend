import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProjectForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    status: initialValues.status || 'idea',
    category: initialValues.category || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-6">
      <div>
        <Label htmlFor="title" className="text-gray-700">Project Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400"
          placeholder="Enter project title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 min-h-32"
          placeholder="Describe your project..."
          required
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-gray-700">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400"
          placeholder="e.g., Technology, Education, Healthcare"
          required
        />
      </div>

      <div>
        <Label htmlFor="status" className="text-gray-700">Project Status</Label>
        <Select value={formData.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">💡 Idea</SelectItem>
            <SelectItem value="crowdfunding">💰 Crowdfunding Phase</SelectItem>
            <SelectItem value="active">🚀 Active</SelectItem>
            <SelectItem value="archived">📦 Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1 bg-purple-600 text-white hover:bg-purple-700">
          Save Project
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;