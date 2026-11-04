import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Clock, Calendar, ArrowRight, User, Tag, Search } from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';
import { supabase } from '../../services/supabaseClient';

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(initialBlogPosts);

  useEffect(() => {
    async function loadSupabaseBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(b => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt || b.title,
            category: b.category || 'Class 10',
            readTime: b.read_time || '5 min read',
            date: new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            author: b.author || 'PaperGenius Academic Team',
            authorRole: 'Founder & Academic Director',
            tags: ['CBSE', b.category || 'Strategy'],
            content: b.content
          }));
          // Merge: Supabase blogs first, then hardcoded fallbacks without duplicates
          setPosts([...mapped, ...initialBlogPosts.filter(p => !mapped.some(m => m.slug === p.slug))]);
        }
      } catch (err) {
        console.warn('Could not load blogs from Supabase, using local:', err);
      }
    }
    loadSupabaseBlogs();
  }, []);

  const categories = ['All', 'Class 10', 'Class 12', 'Coaching Tips'];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-xs sm:text-sm font-bold text-[#C4B5FD]">
          <BookOpen className="w-4 h-4 text-[#C4B5FD]" />
          <span>PaperGenius CBSE Academic Insights & Strategy Blog</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Board Exam Strategy, Rubrics & AI Insights
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Master CBSE board presentation, step-marking allocations, derivation checklists, and coaching management insights authored by education technologists.
        </p>

        {/* Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex bg-[#0C1330] p-1 rounded-xl border border-white/10 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0C1330] border border-white/10 text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2.5 placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
            />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-3xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/20 text-[#C4B5FD] font-mono font-bold">
                  {post.category}
                </span>
                <span className="text-[#94A3B8] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-[#67E8F9] transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {(post.tags || []).map((t, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-[#67E8F9] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-[#94A3B8] mt-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </span>

              <Link
                to={`/blog/${post.slug}`}
                className="font-bold text-[#C4B5FD] group-hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
