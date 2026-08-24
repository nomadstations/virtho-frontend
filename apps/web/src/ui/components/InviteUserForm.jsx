import React, { useState } from 'react';
import { Send, Users, Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const InviteUserForm = ({ roles, groups, onSubmit, currentUserId }) => {
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(roles.length > 0 ? roles[0].name : '');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGroupToggle = (groupName) => {
    setSelectedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (!selectedRole) {
      setError('Please select a role.');
      return;
    }

    setError('');
    
    onSubmit({
      email,
      role: selectedRole,
      groups: selectedGroups,
      message,
      invitedBy: currentUserId,
      sentAt: new Date().toISOString(),
      status: 'pending'
    });

    // Reset form
    setEmail('');
    setSelectedRole(roles.length > 0 ? roles[0].name : '');
    setSelectedGroups([]);
    setMessage('');
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${email}`,
      variant: "success",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Send className="w-5 h-5 text-primary" />
          Send New Invitation
        </h2>
        <p className="text-sm text-gray-500 mt-1">Invite a new member to join the platform and set their access level.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`bg-white ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                required
              />
              {error && <p className="text-sm text-destructive mt-1">{error}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-gray-400" />
                System Role <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                  required
                >
                  <option value="" disabled>Select a role...</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Determines base permissions and access level.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-1.5">
                Personal Message <span className="text-gray-400 font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Welcome to the team! Here's your invite to..."
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                className="bg-white resize-none h-24"
              />
              <div className="flex justify-end text-xs text-gray-400">
                {message.length} / 500
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              Add to Groups <span className="text-gray-400 font-normal">(Optional)</span>
            </Label>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-[280px] overflow-y-auto">
              {groups.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500">
                  No groups available. Create groups in the Groups section first.
                </div>
              ) : (
                <div className="space-y-2">
                  {groups.map(group => (
                    <label 
                      key={group.id} 
                      className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors border ${
                        selectedGroups.includes(group.name) 
                          ? 'bg-primary-lighter/40 border-primary-light' 
                          : 'bg-white border-gray-200 hover:bg-gray-100/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.name)}
                        onChange={() => handleGroupToggle(group.name)}
                        className="mt-1 shrink-0 accent-primary w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{group.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{group.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button 
            type="submit" 
            className="bg-primary text-primary-foreground hover:bg-primary-dark min-w-[150px]"
            disabled={!email || !selectedRole}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Invitation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InviteUserForm;