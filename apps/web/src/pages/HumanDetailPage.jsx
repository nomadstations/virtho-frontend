import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Activity, ShieldCheck, User, Code, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { ROUTES } from '@/constants';

function HumanDetailPage() {
  const { id } = useParams();
  const [human, setHuman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchHuman = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Fake delay
        setHuman({
          id,
          name: 'Dr. Sarah Mitchell',
          type: 'Human',
          description: 'Lead researcher in renewable energy.',
          bio: 'Dr. Sarah Mitchell has over 15 years of experience in renewable energy systems, focusing on solar panel efficiency and sustainable materials. She is passionate about mentoring the next generation of engineers and actively participates in open-source hardware projects.',
          location: 'North America',
          activityLevel: 'High',
          verified: true,
          tags: ['Researcher', 'Engineering', 'Solar', 'Sustainability'],
          interests: ['Open Source', 'Climate Tech', 'Mentorship'],
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop',
          timeline: [
            { date: '2023-10-15', action: 'Published new research on solar efficiency' },
            { date: '2023-09-02', action: 'Joined Virtho Foundation as a contributor' },
            { date: '2023-08-20', action: 'Spoke at Global Sustainability Summit' }
          ]
        });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchHuman();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !human) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Profile not found'}</h2>
        <Link to={ROUTES.COMMUNITY}>
          <Button variant="outline">Back to Community</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>{human.name} - Profile | Virtho</title></Helmet>
      
      <div className="bg-white border-b border-gray-200 pt-8 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumb paths={[...getBreadcrumbPaths('/community'), { label: human.name, href: '#' }]} />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-gray-100">
              <img src={human.avatar} alt={human.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{human.name}</h1>
                {human.verified && <ShieldCheck className="w-6 h-6 text-blue-600 mt-1" title="Verified" />}
              </div>
              
              <p className="text-xl text-gray-600 mb-4">{human.description}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-100">
                  <User className="w-4 h-4" /> {human.type}
                </span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {human.location}</span>
                <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {human.activityLevel} Activity</span>
              </div>
            </div>
            
            <div className="shrink-0">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{human.bio}</p>
            </motion.section>
            
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-6 h-6 text-purple-600" /> Recent Activity</h2>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {human.timeline.map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 group-[.is-active]:bg-purple-100 text-gray-500 group-[.is-active]:text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
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
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Code className="w-5 h-5 text-purple-600" /> Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {human.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {human.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                    {interest}
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

export default HumanDetailPage;