import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function CommentSection({ blogId }) {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jordan Lee',
      avatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=random&color=fff',
      date: '2026-03-01T10:00:00Z',
      text: 'This is an incredibly insightful perspective. I especially resonated with the points about decentralized governance challenges. Great read!'
    },
    {
      id: 2,
      author: 'Casey Smith',
      avatar: 'https://ui-avatars.com/api/?name=Casey+Smith&background=random&color=fff',
      date: '2026-03-02T14:30:00Z',
      text: 'Thanks for sharing these strategies. I plan to implement some of these ideas in my own projects this week.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: 'Current User', // In a real app, get from auth context
      avatar: 'https://ui-avatars.com/api/?name=Current+User&background=random&color=fff',
      date: new Date().toISOString(),
      text: newComment
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: 'Comment posted',
      description: 'Your comment has been successfully added.',
    });
  };

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-purple-600" />
        Comments ({comments.length})
      </h3>

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-10 shadow-sm">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 pr-16 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none min-h-[120px] transition-shadow text-gray-900"
            required
          />
          <div className="absolute bottom-4 right-4">
            <Button 
              type="submit" 
              disabled={!newComment.trim()}
              className="rounded-full w-10 h-10 p-0 bg-purple-600 hover:bg-purple-700 text-white shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200"
            >
              No comments yet. Be the first to share your thoughts!
            </motion.p>
          ) : (
            comments.map((comment) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="shrink-0">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author} 
                    className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{comment.author}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CommentSection;