import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, Zap, Building2, BookOpen } from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';
import { supabase } from '../../services/supabaseClient';

export default function BlogPostPage() {
  const { slug } = useParams();
  
  // 1. Initial check in local hardcoded data
  const localMatch = initialBlogPosts.find((p) => p.slug === slug);
  const [post, setPost] = useState(localMatch || null);
  const [loading, setLoading] = useState(!localMatch);

  useEffect(() => {
    // If already found in local memory, no need to query unless we want to refresh
    if (localMatch) {
      setPost(localMatch);
      setLoading(false);
      return;
    }

    // Otherwise fetch from Supabase blogs table
    async function fetchPostFromDb() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (data && !error) {
          setPost({
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt || data.title,
            category: data.category || 'Class 10',
            readTime: data.read_time || '5 min read',
            date: new Date(data.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            author: data.author || 'PaperGenius Academic Team',
            authorRole: 'Founder & Academic Director',
            tags: ['CBSE', data.category || 'Strategy'],
            content: data.content
          });
        }
      } catch (err) {
        console.warn('Failed to load article from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPostFromDb();
  }, [slug, localMatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Loading Academic Article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-8 px-4 sm:px-6 lg:px-8 text-base">

      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#67E8F9] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto bg-[#080D24] p-8 sm:p-12 rounded-3xl border border-[rgba(140,120,255,0.25)] shadow-2xl space-y-8">

        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/20 text-[#C4B5FD] text-xs font-mono font-bold">
              {post.category}
            </span>
            <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C3CFF] to-[#06B6D4] flex items-center justify-center font-bold text-white">
              GA
            </div>
            <div>
              <div className="text-sm font-bold text-white">{post.author}</div>
              <div className="text-xs text-[#94A3B8]">{post.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-[#CBD5E1] text-base leading-relaxed">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-black text-white pt-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-bold text-[#67E8F9] pt-2">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2">
                  {paragraph.split('\n').map((item, iIdx) => (
                    <li key={iIdx}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Integrated Conversion CTA Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0C1330] to-[#120D3D] border border-[#7C3CFF]/40 space-y-4 shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#67E8F9] uppercase">
              PaperGenius.in Board Engine
            </span>
            <h4 className="text-xl font-black text-white">Put These Strategies Into Practice</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Generate real CBSE blueprint question papers or evaluate handwritten answers with AI step-marking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/student/evaluator"
              className="btn-gradient px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try AI Evaluator Free</span>
            </Link>
            <Link
              to="/teacher/portal"
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#080D24] border border-white/10 hover:border-white/30 text-white flex items-center justify-center gap-1.5 transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Coaching Portal</span>
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}
