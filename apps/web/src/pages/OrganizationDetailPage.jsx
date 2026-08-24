import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Activity, ShieldCheck, Building2, Globe, Calendar, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { ROUTES } from '@/constants';

function OrganizationDetailPage() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); 
        setOrg({
          id,
          name: 'EcoTech Innovations',
          type: 'Organization',
          description: 'Developing sustainable tech for a better future.',
          details: 'EcoTech Innovations is a leading research and development organization focused on creating scalable, sustainable technologies. From advanced water purification systems to next-generation solar storage, we partner with communities to deploy impactful solutions.',
          location: 'Global',
          website: 'https://example.com',
          activityLevel: 'High',
          verified: true,
          tags: ['Sustainability', 'Tech', 'R&D', 'Environment'],
          memberCount: 320,
          avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=256&h=256&fit=crop',
          timeline: [
            { date: '2023-12-05', action: 'Launched open-source water purifier schematics' },
            { date: '2023-08-14', action: 'Secured new funding for solar research' },
            { date: '2022-11-20', action: 'Organization founded' }
          ]
        });
      } catch (err) {
        setError('Failed to load organization details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !org) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Organization not found'}</h2>
        <Link to={ROUTES.COMMUNITY}>
          <Button variant="outline">Back to Community</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>{org.name} - Organization | Virtho</title></Helmet>
      
      <div className="bg-white border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumb paths={[...getBreadcrumbPaths('/community'), { label: org.name, href: '#' }]} />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl border-4 border-white shadow-lg overflow-hidden shrink-0 bg-gray-100">
              <img src={org.avatar} alt={org.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{org.name}</h1>
                {org.verified && <ShieldCheck className="w-6 h-6 text-blue-600 mt-1" title="Verified Organization" />}
              </div>
              
              <p className="text-xl text-gray-600 mb-4">{org.description}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-100">
                  <Building2 className="w-4 h-4" /> {org.type}
                </span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {org.location}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {org.memberCount} Members</span>
                <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {org.activityLevel} Activity</span>
              </div>
            </div>
            
            <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
              <Button 
                onClick={() => setIsFollowed(!isFollowed)}
                variant={isFollowed ? "outline" : "default"}
                className={`w-full ${!isFollowed ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''} shadow-md`}
              >
                {isFollowed ? <><Check className="w-4 h-4 mr-2" /> Following</> : 'Follow Organization'}
              </Button>
              <Button 
                onClick={() => setIsJoined(!isJoined)}
                className={`w-full text-white shadow-md transition-all ${isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isJoined ? <><Check className="w-4 h-4 mr-2" /> Joined</> : 'Join Organization'}
              </Button>
              <Button variant="outline" className="w-full">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Organization</h2>
              <p className="text-gray-700 leading-relaxed">{org.details}</p>
            </motion.section>
            
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-6 h-6 text-emerald-600" /> Timeline</h2>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {org.timeline.map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 group-[.is-active]:bg-emerald-100 text-gray-500 group-[.is-active]:text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-gray-900 text-sm">{event.date}</div>
                      </div>
                      <div className="text-gray-600">{event.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
          
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-emerald-600" /> Links</h3>
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                <Globe className="w-4 h-4" /> Visit Website
              </a>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {org.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationDetailPage;