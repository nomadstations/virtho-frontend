import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ROUTES } from '@/constants';
import { Card } from '@/components/SharedUI';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast({ title: "Passwords don't match", variant: "destructive" });
    }
    const result = register({ name: formData.name, email: formData.email, password: formData.password });
    if (result.success) {
      toast({ title: "Welcome to Virtho!" });
      navigate(ROUTES.DASHBOARD);
    } else {
      toast({ title: "Registration failed", description: result.error, variant: "destructive" });
    }
  };
  
  return (
    <>
      <Helmet><title>Join Virtho</title></Helmet>
      <div className="flex-grow flex items-center justify-center p-4 bg-gray-50 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="p-8 shadow-md border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Join Virtho</h1>
            <p className="text-gray-600 mb-8">Create your account to get started</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label className="text-gray-700 font-medium mb-1 block">First and Last Name</Label><Input name="name" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} required className="bg-gray-50 border-gray-200 h-11"/></div>
              <div><Label className="text-gray-700 font-medium mb-1 block">Email</Label><Input type="email" name="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} required className="bg-gray-50 border-gray-200 h-11"/></div>
              <div><Label className="text-gray-700 font-medium mb-1 block">Password</Label><Input type="password" name="password" value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} required className="bg-gray-50 border-gray-200 h-11"/></div>
              <div><Label className="text-gray-700 font-medium mb-1 block">Confirm Password</Label><Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={e=>setFormData({...formData, confirmPassword:e.target.value})} required className="bg-gray-50 border-gray-200 h-11"/></div>
              <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg mt-4">Create Account</Button>
            </form>
            <p className="text-center text-gray-600 mt-6 text-sm">Already have an account? <Link to={ROUTES.LOGIN} className="text-purple-600 font-bold hover:underline">Login here</Link></p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default RegisterPage;