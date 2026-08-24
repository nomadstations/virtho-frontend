import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Rocket, GraduationCap, ShoppingBag, Users, Building2 } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import BlogSection from '@/components/BlogSection';
import LatestCommunities from '@/components/LatestCommunities';
import LatestJobs from '@/components/LatestJobs';
import LatestLearning from '@/components/LatestLearning';
import LatestMarketplace from '@/components/LatestMarketplace';
import LatestProjects from '@/components/LatestProjects';
import { ROUTES } from '@/constants';
import { Card } from '@/components/SharedUI';

function AboutPage() {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Dashboard',
      description: 'Transform ideas into reality. Manage your projects and track progress in one place.',
      link: ROUTES.DASHBOARD,
      cta: 'Go to Dashboard'
    },
    {
      icon: Rocket,
      title: 'Projects',
      description: 'Create, join or support projects. Collaborate and make a lasting impact together.',
      link: ROUTES.PROJECTS,
      cta: 'Explore Projects'
    },
    {
      icon: GraduationCap,
      title: 'Learning',
      description: 'Create or join courses or events. Expand your skills and expertise.',
      link: ROUTES.LEARNING,
      cta: 'Start Learning'
    },
    {
      icon: ShoppingBag,
      title: 'Marketplace',
      description: 'Buy, rent or sell goods and services. Discover amazing products and opportunities.',
      link: ROUTES.MARKETPLACE,
      cta: 'Shop Now'
    },
    {
      icon: Users,
      title: 'Groups',
      description: 'Create, join or support groups. Collaborate and make a lasting impact together.',
      link: ROUTES.GROUPS,
      cta: 'Join Groups'
    },
    {
      icon: Building2,
      title: 'Organizations',
      description: 'Create, join or support organizations. Build and scale your impact.',
      link: ROUTES.ORGANIZATIONS,
      cta: 'Manage Organizations'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About - Virtho Foundation</title>
        <meta name="description" content="Learn about Virtho Foundation - a human development hub where you can create, join or support projects, groups and organizations. Collaborate and make a lasting impact together." />
      </Helmet>

      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Search Bar Section */}
      <section className="bg-white py-8">
        <SearchBar />
      </section>

      {/* Features/Tools Section */}
      <section className="landing-section bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-900 mb-4"
            >
              Tools to Build Your Vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Everything you need to collaborate, learn, and grow in one comprehensive platform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card hover className="p-6 md:p-8 text-center h-full flex flex-col group border border-gray-100 hover:border-purple-200 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all duration-300 shrink-0">
                    <feature.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                    {feature.description}
                  </p>
                  <Link to={feature.link} className="mt-auto block">
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 font-medium"
                    >
                      {feature.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <LatestProjects />
      <LatestCommunities />
      <LatestJobs />
      <LatestLearning />
      <LatestMarketplace />
      <BlogSection />
    </>
  );
}

export default AboutPage;