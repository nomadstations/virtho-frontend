import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, Building2, Briefcase, Share2, CheckCircle2, BookmarkPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { mockJobs } from '@/data/mockJobs';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/SharedUI';

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundJob = mockJobs.find(j => j.id === id);
    setTimeout(() => { setJob(foundJob || null); setLoading(false); }, 400);
  }, [id]);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      toast({ title: "Application Started! 🎉", description: `Redirecting to ${job.company}.` });
    }, 800);
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <div className="py-20 text-center text-xl text-gray-600">Job not found.</div>;

  return (
    <>
      <Helmet><title>{job.title} at {job.company}</title></Helmet>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb paths={[...getBreadcrumbPaths('/jobs'), { label: job.title, href: '#' }]} />

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8 mt-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <img src={job.logo} alt={job.company} className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-gray-100 shadow-sm shrink-0" />
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                <div className="text-xl text-purple-700 font-semibold mb-4">{job.company}</div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button onClick={handleApply} disabled={isApplying} className="bg-purple-600 text-white font-bold h-12 px-8">
                {isApplying ? 'Processing...' : 'Apply Now'}
              </Button>
              <div className="flex gap-2">
                <Button onClick={() => setIsSaved(!isSaved)} variant="outline" className={`flex-1 ${isSaved ? 'text-purple-600 bg-purple-50 border-purple-200' : 'text-gray-600'}`}>
                  <BookmarkPlus className="h-5 w-5 md:mr-2" /><span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="prose prose-purple max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-700 leading-relaxed mb-8">{job.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4"><DollarSign className="w-5 h-5 text-purple-600 mt-0.5" /><div><div className="text-sm text-gray-500 font-medium">Salary</div><div className="font-semibold">{job.salary}</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default JobDetailsPage;