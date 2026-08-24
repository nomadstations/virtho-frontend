import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { mockCourses } from '@/data/mockCourses';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/SharedUI';

function LearningDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundCourse = mockCourses.find(c => c.id === id);
    setTimeout(() => { setCourse(foundCourse || null); setLoading(false); window.scrollTo(0,0); }, 400);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!course) return <div className="py-20 text-center text-xl text-gray-600">Course not found.</div>;

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      toast({ title: "Successfully Enrolled! 🎉", description: `You have access to ${course.title}.` });
    }, 800);
  };

  return (
    <>
      <Helmet><title>{course.title} - Virtho Learning</title></Helmet>

      <div className="bg-gray-900 text-white pt-8 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="[&_nav_ol]:text-gray-400 [&_nav_a]:text-gray-400 hover:[&_nav_a]:text-white [&_nav_span.text-gray-900]:text-white [&_nav_span.mx-2]:text-gray-500">
            <Breadcrumb paths={[...getBreadcrumbPaths('/learning'), { label: course.title, href: '#' }]} />
          </div>
          <div className="grid lg:grid-cols-3 gap-12 items-start mt-6">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 max-w-6xl -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-12 bg-white rounded-t-3xl pt-8">
            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span className="text-gray-700 leading-snug">{obj}</span></div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden sticky top-24 -mt-32 lg:-mt-48 z-20 p-8">
              <div className="text-4xl font-extrabold text-gray-900 mb-6">{course.price}</div>
              <Button onClick={handleEnroll} disabled={isEnrolling} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-14 text-lg mb-4">
                {isEnrolling ? 'Processing...' : 'Enroll Now'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LearningDetailsPage;