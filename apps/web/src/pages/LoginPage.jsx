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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      toast({ title: "Welcome back!", description: "You've successfully logged in." });
      navigate(ROUTES.DASHBOARD);
    } else {
      toast({ title: "Login failed", description: result.error, variant: "destructive" });
    }
  };

  return (
    <>
      <Helmet><title>Login - Virtho</title></Helmet>
      <div className="flex-grow flex items-center justify-center p-4 bg-background">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="p-8 shadow-md border-border bg-card">
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Login to continue your journey</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="text-foreground font-medium mb-1 block">Email</Label>
                <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="bg-background border-border h-12" placeholder="your@email.com"/>
              </div>
              <div>
                <Label className="text-foreground font-medium mb-1 block">Password</Label>
                <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="bg-background border-border h-12" placeholder="••••••••"/>
              </div>
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-bold text-lg mt-2">Login</Button>
            </form>
            <p className="text-center text-muted-foreground mt-6 text-sm">Don't have an account? <Link to={ROUTES.REGISTER} className="text-primary-dark font-bold hover:underline">Register here</Link></p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;