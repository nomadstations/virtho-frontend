import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactForm = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    email: initialValues.email || '',
    message: initialValues.message || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div>
        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="John Doe" 
          required 
          className="bg-gray-50 border-gray-300 text-gray-900"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="john@example.com" 
          required 
          className="bg-gray-50 border-gray-300 text-gray-900"
        />
      </div>
      <div>
        <Label htmlFor="message" className="text-gray-700">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          placeholder="How can we help you?" 
          rows={5} 
          required 
          className="bg-gray-50 border-gray-300 text-gray-900"
        />
      </div>
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;