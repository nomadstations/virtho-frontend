import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { ROUTES } from '@/constants';

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('virtho_blog_posts') || '[]');
    const foundPost = posts.find(p => p.id === id);
    setPost(foundPost);
  }, [id]);

  if (!post) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{post.title} - Virtho Blogs</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <section className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb paths={[...getBreadcrumbPaths(ROUTES.BLOGS), { label: post.title, href: '#' }]} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mt-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <span className="text-purple-600 text-sm font-bold uppercase tracking-wider">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-gray-500 mb-8 pb-8 border-b border-gray-100 text-sm font-medium">
              <div className="flex items-center gap-2"><User className="w-5 h-5 text-gray-400" /><span>{post.author}</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-gray-400" /><span>{new Date(post.date).toLocaleDateString()}</span></div>
            </div>

            <div className="prose prose-purple max-w-none prose-lg">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default BlogPostPage;