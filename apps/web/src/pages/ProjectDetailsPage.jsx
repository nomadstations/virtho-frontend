import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, FolderOpen, Globe, UserPlus } from 'lucide-react';

function ProjectDetailsPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [emailToAdd, setEmailToAdd] = useState('');

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('virtho_projects') || '[]');
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject);
  }, [id]);

  const handleAddMember = () => {
    const users = JSON.parse(localStorage.getItem('virtho_users') || '[]');
    const userToAdd = users.find(u => u.email === emailToAdd);

    if (!userToAdd) {
      toast({
        title: "User not found",
        description: "No user exists with this email address.",
        variant: "destructive",
      });
      return;
    }

    if (project.members.includes(userToAdd.id)) {
      toast({
        title: "Already a member",
        description: "This user is already part of the project.",
        variant: "destructive",
      });
      return;
    }

    const projects = JSON.parse(localStorage.getItem('virtho_projects') || '[]');
    const updatedProjects = projects.map(p => {
      if (p.id === id) {
        return { ...p, members: [...p.members, userToAdd.id] };
      }
      return p;
    });

    localStorage.setItem('virtho_projects', JSON.stringify(updatedProjects));
    setProject({ ...project, members: [...project.members, userToAdd.id] });
    setEmailToAdd('');

    toast({
      title: "Member added!",
      description: `${userToAdd.name} has been added to the project.`,
    });
  };

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-gray-900 text-center py-20">Loading...</div>
      </DashboardLayout>
    );
  }

  const users = JSON.parse(localStorage.getItem('virtho_users') || '[]');
  const members = users.filter(u => project.members.includes(u.id));

  return (
    <>
      <Helmet>
        <title>{project.title} - Virtho Foundation</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex gap-4 mt-4">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
                {project.category}
              </span>
              <span className="px-4 py-2 bg-purple-600 rounded-full text-white text-sm capitalize">
                {project.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link to={`/project/${id}/resources`} className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <FolderOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Resources</h3>
                <p className="text-gray-700">Manage project files and documents</p>
              </motion.div>
            </Link>

            <Link to={`/project/${id}/microsite`} className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Microsite</h3>
                <p className="text-gray-700">View public project page</p>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Members</h3>
              <p className="text-gray-700">{members.length} member{members.length !== 1 ? 's' : ''}</p>
            </motion.div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Members</h2>
            <div className="space-y-3 mb-6">
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3 bg-gray-100 rounded-lg p-3 shadow-sm">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{member.name}</p>
                    <p className="text-gray-500 text-sm">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Input
                value={emailToAdd}
                onChange={(e) => setEmailToAdd(e.target.value)}
                placeholder="Enter email to add member"
                className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400"
              />
              <Button onClick={handleAddMember} className="bg-purple-600 text-white hover:bg-purple-700">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
}

export default ProjectDetailsPage;