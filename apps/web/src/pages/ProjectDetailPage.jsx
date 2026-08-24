import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Share2, FolderOpen, Users, Star, Calendar, UserPlus, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/SharedUI';

const allProjects = [
  { id: 'vrth-token-launch', title: 'VRTH Token Launch Platform', description: 'A comprehensive web platform for launching and managing resource-backed tokens with real-time analytics.', author: 'Virtho Team', publishedDate: '2025-12-15', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop', category: 'Web Development', status: 'active', rating: 5, teamSize: 12, tags: ['React', 'Solidity'] }
];

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundProject = allProjects.find(p => p.id === id) || allProjects[0];
    setTimeout(() => { setProject(foundProject); setLoading(false); }, 400);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!project) return <div className="py-20 text-center">Project Not Found</div>;

  return (
    <>
      <Helmet><title>{project.title} - Virtho Projects</title></Helmet>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <DashboardBreadcrumb customCrumbs={[
          { label: 'Dashboard home', path: '/dashboard' },
          { label: 'Projects', path: '/projects' },
          { label: project.title, path: `/project/${project.id}` }
        ]} />

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <img src={project.image} alt={project.title} className="w-full aspect-[16/9] object-cover" />
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full mb-3">{project.category}</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="mb-6 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize flex items-center gap-1.5 ${project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {project.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />} {project.status}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1.5"><Users className="w-4 h-4" /> {project.teamSize} Members</span>
              </div>
              <Button onClick={() => toast({ title: "Request Sent! 🚀" })} className="w-full bg-purple-600 text-white font-bold h-12 text-lg mb-3">
                <UserPlus className="mr-2 h-5 w-5" /> Join Project
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProjectDetailPage;