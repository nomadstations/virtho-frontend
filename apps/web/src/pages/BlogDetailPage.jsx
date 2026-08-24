import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Share2, Heart, ArrowLeft, Bookmark, AlertCircle, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import CommentSection from '@/components/CommentSection';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { getBlogBySlug, getBlogs } from '@/data/mockBlogs';
import { ROUTES } from '@/constants';
import BlogCard from '@/components/BlogCard';

function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 400)); // Simulate delay
        if (!slug) throw new Error("No blog slug provided.");
        
        const data = getBlogBySlug(slug);
        
        if (!data) {
          throw new Error("Blog not found.");
        }
        
        if (isMounted) {
          setBlog(data);
          // Fetch related blogs (same category, excluding current)
          const all = getBlogs();
          const related = all.filter(b => b.category === data.category && b.slug !== slug).slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        if (isMounted) setError(err.message || "Failed to load blog.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchBlog();
    window.scrollTo(0, 0);

    return () => { isMounted = false; };
  }, [slug]);

  const handleShare = () => {
    toast({
      title: "Link Copied!",
      description: "Blog post link has been copied to your clipboard.",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast({ title: "Liked", description: "You liked this article." });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Saved!" : "Removed",
      description: !isBookmarked ? "Article saved to your bookmarks." : "Article removed from bookmarks.",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{error || "Article Not Found"}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">The article you're looking for doesn't exist, has been moved, or couldn't be loaded.</p>
        <Button onClick={() => navigate(ROUTES.BLOGS)} className="bg-purple-600 text-white hover:bg-purple-700">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
        </Button>
      </div>
    );
  }

  const entityColors = {
    Human: 'bg-blue-50 text-blue-700 border-blue-100',
    Group: 'bg-purple-50 text-purple-700 border-purple-100',
    Organization: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  // Safe Extraction
  const title = blog.title || "Untitled Blog Post";
  const excerpt = blog.excerpt || "No description available";
  const category = blog.category || "Uncategorized";
  const readTime = blog.readTime ? `${blog.readTime} min read` : "Unknown read time";
  const imageUrl = blog.featuredImage || blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop';
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  
  let dateString = "Date not available";
  if (blog.publishedDate) {
    try {
      dateString = new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {}
  }
  
  const contentParagraphs = blog.content ? blog.content.split('\n\n') : ["No content available."];
  
  const authorType = blog.author?.type || "Human";
  const authorName = blog.author?.name || "Anonymous";
  const authorBio = blog.author?.bio || "No author biography available.";
  const authorAvatar = blog.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`;

  const viewsCount = blog.views || 0;
  const likesCount = blog.likes || 0;
  const commentsCount = blog.commentsCount || 0;

  return (
    <>
      <Helmet>
        <title>{title} - Virtho</title>
        <meta name="description" content={excerpt} />
      </Helmet>
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb paths={[...getBreadcrumbPaths(ROUTES.BLOGS), { label: title, href: '#' }]} />
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header Section */}
        <header className="mb-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-md text-sm font-bold tracking-wider uppercase border border-purple-200 shadow-sm">
              {category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
            {title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto font-medium">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{dateString}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{readTime}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{viewsCount.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full aspect-[21/9] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16 bg-gray-100 relative group"
        >
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop';
            }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg prose-purple max-w-none text-gray-800 leading-loose mb-12">
              {contentParagraphs.map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12 items-center">
                <span className="font-bold text-gray-900 mr-2">Tags:</span>
                {tags.map((tag, idx) => (
                  <span key={`tag-${idx}`} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Bar (Likes, Shares, Bookmarks) */}
            <div className="flex items-center justify-between py-6 border-y border-gray-200 mb-12 bg-white sticky bottom-0 lg:static z-20 px-4 -mx-4 lg:px-0 lg:mx-0">
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 font-medium transition-colors ${isLiked ? 'text-rose-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} /> 
                  <span className="text-lg">{isLiked ? (likesCount + 1).toLocaleString() : likesCount.toLocaleString()}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-lg">{commentsCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleBookmark} 
                  className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare} 
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div id="comments">
              <CommentSection blogId={blog.id || slug} />
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Author Card */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Written By</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase shadow-sm border ${entityColors[authorType] || 'bg-gray-100 text-gray-700'}`}>
                    {authorType}
                  </span>
                </div>
                
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-md mb-4 bg-gray-100">
                    <img 
                      src={authorAvatar} 
                      alt={authorName} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1">{authorName}</h3>
                  <Link to={`/community/${authorType.toLowerCase()}/profile`} className="text-sm text-purple-600 hover:text-purple-800 font-semibold mb-4 inline-block">
                    View Profile
                  </Link>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {authorBio}
                  </p>
                </div>
                
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 font-semibold shadow-sm">
                  Follow {authorName.split(' ')[0]}
                </Button>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join the Conversation</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Get the latest insights from our community delivered straight to your inbox every week.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); toast({ title: "Subscribed!", description: "Thanks for joining our newsletter." }) }} className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 shadow-sm" 
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm py-6 font-semibold text-base rounded-xl">
                    Subscribe Now
                  </Button>
                </form>
              </div>

            </div>
          </aside>

        </div>
      </article>

      {/* Related Posts Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">More in <span className="text-purple-600">{category}</span></h2>
              <Link to={ROUTES.BLOGS}>
                <Button variant="outline" className="hidden sm:flex font-semibold">View All Blogs</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogDetailPage;