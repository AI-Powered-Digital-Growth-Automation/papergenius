import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';

export default function CbseInsights() {
  const featuredPosts = initialBlogPosts.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-xs font-bold uppercase tracking-wider mb-3">
            Knowledge Hub
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            CBSE Insights & Academic Strategy
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Actionable guides on step-marking rubrics, high-yield derivations, and board presentation secrets.
          </p>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#5EE7FF] hover:underline shrink-0"
        >
          <span>Explore All Insights</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (
          <article
            key={post.id}
            className="p-6 rounded-2xl bg-[#080D24] border border-white/10 hover:border-[#7C3CFF]/50 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-[#7C3CFF]/20 text-[#8C78FF] font-bold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#5EE7FF] transition-colors leading-snug mb-3">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">{post.date}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 font-bold text-[#06B6D4] hover:underline"
              >
                <span>Read Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
