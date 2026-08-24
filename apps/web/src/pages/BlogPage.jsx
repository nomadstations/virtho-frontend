import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card } from '@/components/SharedUI';
import SearchComponent from '@/components/SearchComponent';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { ROUTES } from '@/constants';
import { useSearch } from '@/hooks/useSearch';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('virtho_blog_posts') || '[]');
    if (storedPosts.length === 0) {
      const defaultPosts = [
        { id: '1', title: 'Welcome to Virtho Foundation', excerpt: 'Discover how our platform empowers innovators and changemakers to bring their ideas to life.', content: 'Full blog post content here...', author: 'Virtho Team', date: '2025-10-20', category: 'Announcements' },
        { id: '2', title: 'Building Successful Projects: A Guide', excerpt: 'Learn the essential steps to create and manage impactful projects on our platform.', content: 'Full blog post content here...', author: 'Virtho Team', date: '2025-10-18', category: 'Guides' }
      ];
      localStorage.setItem('virtho_blog_posts', JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    } else {
      setPosts(storedPosts);
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    const lowerQuery = searchTerm.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) || 
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery)
    );
  }, [posts, searchTerm]);

  return (
    <>
      <Helmet>
        <title>Blog - Virtho Foundation</title>
        <meta name="description" content="Read the latest news, guides, and insights from Virtho Foundation. Stay updated with our community and learn how to make the most of our platform." />
      </Helmet>
      
      <section className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb paths={getBreadcrumbPaths('/blog')} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 mt-4">
          <h1 className="text-gray-900 mb-4">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Insights, updates, and stories from the Virtho Foundation community</p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-10 flex justify-center">
          <div className="w-full max-w-md">
            <SearchComponent 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Search blog posts..." 
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <p className="text-gray-500">No blog posts found matching your search.</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-purple-600 hover:text-purple-800 font-medium">
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div key="blog-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredPosts.map((post, idx) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Link to={`${ROUTES.BLOG}/${post.id}`}>
                    <Card hover className="p-6 h-full flex flex-col">
                      <span className="text-purple-600 mb-2 font-semibold text-sm">{post.category}</span>
                      <h2 className="text-gray-800 text-xl font-bold mb-3">{post.title}</h2>
                      <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{post.author}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{new Date(post.date).toLocaleDateString()}</span></div>
                      </div>
                      <div className="mt-4 flex items-center text-purple-600 font-medium">
                        Read more <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default BlogPage;