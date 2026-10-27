import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, Zap, Building2, BookOpen } from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = initialBlogPosts.find((p) => p.slug === slug);

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
              Evaluate handwritten answer sheets with AI or auto-generate Set A/B/C coaching tests.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              to="/student"
              className="btn-gradient px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Try Student OS</span>
            </Link>
            <Link
              to="/teacher/create-paper"
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs sm:text-sm font-bold"
            >
              Coaching Studio
            </Link>
          </div>
        </div>

      </article>

    </div>
  );
}
