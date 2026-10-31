import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { 
  ShieldAlert, Users, BookOpen, BarChart3, PlusCircle, 
  CheckCircle2, XCircle, Search, Edit3, Trash2, ArrowUpRight, 
  Sparkles, Award, Building2, User, RefreshCw, Key, Filter, Check
} from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('subscriptions'); // 'subscriptions' | 'blog-cms' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  
  // Blog CMS state
  const [blogs, setBlogs] = useState(initialBlogPosts);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    category: 'Class 10',
    excerpt: '',
    content: '',
    tags: 'Class 10, CBSE 2026'
  });

    // Real-time Supabase Live User Tracking State (No Fake Users)
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchRealUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('user_quotas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching live users from Supabase:', error.message);
      }

      if (data && data.length > 0) {
        const mapped = data.map(u => ({
          id: u.id,
          userId: u.user_id,
          name: u.email?.split('@')[0] || 'User',
          email: u.email,
          role: u.role || 'student',
          instituteName: u.role === 'teacher' ? 'Coaching Academy' : 'School Student',
          plan: u.plan_name || (u.is_premium ? 'Premium Board Pass' : 'Starter Free'),
          amount: u.is_premium ? (u.role === 'teacher' ? '₹4,999' : '₹199') : '₹0',
          status: u.is_premium ? 'Active' : 'Free Tier',
          quotaLeft: u.quota_remaining ?? 2,
          quotaMax: u.quota_max ?? 2,
          joinedDate: new Date(u.created_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          subscribedSubjects: u.subscribed_subjects && u.subscribed_subjects.length > 0 ? u.subscribed_subjects : ['General Syllabus']
        }));
        setUsersList(mapped);
      } else {
        setUsersList([]);
      }
    } catch (err) {
      console.warn('Failed to load real users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchRealUsers();
  }, []);

  // Real Database Update: Add Quota (+25)
  const handleAddQuota = async (id, amountToAdd) => {
    const targetUser = usersList.find(u => u.id === id);
    if (!targetUser) return;

    const newLeft = targetUser.quotaLeft + amountToAdd;
    const newMax = targetUser.quotaMax + amountToAdd;

    // Optimistic UI update
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, quotaLeft: newLeft, quotaMax: newMax, status: 'Active' };
      }
      return u;
    }));

    // Persist to Supabase Database
    try {
      await supabase
        .from('user_quotas')
        .update({
          quota_remaining: newLeft,
          quota_max: newMax,
          is_premium: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to persist quota update in Supabase:', e);
    }
  };

  // Real Database Update: Toggle Plan Status
  const handleToggleStatus = async (id) => {
    const targetUser = usersList.find(u => u.id === id);
    if (!targetUser) return;

    const nextIsPremium = targetUser.status !== 'Active';

    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: nextIsPremium ? 'Active' : 'Free Tier' };
      }
      return u;
    }));

    try {
      await supabase
        .from('user_quotas')
        .update({
          is_premium: nextIsPremium,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to persist status toggle in Supabase:', e);
    }
  };

  // Blog CMS Add
  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    const autoSlug = newBlog.slug || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const created = {
      id: autoSlug,
      slug: autoSlug,
      title: newBlog.title,
      excerpt: newBlog.excerpt || newBlog.title,
      category: newBlog.category,
      readTime: '5 min read',
      date: '24 Oct 2026',
      author: 'Gulzar Ahmed (Founder)',
      authorRole: 'Founder & Academic Director',
      tags: newBlog.tags.split(',').map(t => t.trim()),
      content: newBlog.content
    };

    setBlogs([created, ...blogs]);
    setShowAddBlogModal(false);
    setNewBlog({ title: '', slug: '', category: 'Class 10', excerpt: '', content: '', tags: 'Class 10, CBSE 2026' });
  };

  const handleDeleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // Filtered Users List
  const filteredUsers = usersList.filter(u => {
    const matchRole = selectedRoleFilter === 'All' || u.role === selectedRoleFilter;
    const matchSearch = searchQuery === '' || 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.plan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-6 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. TOP ADMIN BANNER */}
      <div className="max-w-7xl mx-auto mb-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#080D24] via-[#120D3D] to-[#080D24] border border-purple-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-[#C4B5FD] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
              <span>Founder & Master Admin Portal</span>
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>System Live • papergenius.in</span>
            </span>
          </div>

                    <div className="flex items-center gap-3 mb-2">
            <img src="/logo.png" alt="PaperGenius Logo" className="w-10 h-10 object-contain rounded-xl shadow-lg" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Digital Gulzar Master Command Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Manage platform subscriptions, manual customer quota unlocks, and blog publication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0C1330] p-3 rounded-xl border border-white/10 text-right">
            <span className="text-[11px] text-[#94A3B8] uppercase block">Total Tracked Users</span>
            <span className="text-xl font-black text-[#5EE7FF]">{usersList.length} Accounts</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* 2. ADMIN NAVIGATION TABS */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#080D24] border border-white/10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User & Subscription Tracker ({usersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blog-cms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'blog-cms'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog CMS & Articles ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Revenue & Analytics</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: USER & SUBSCRIPTION TRACKER ================= */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#080D24] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex bg-[#0C1330] p-1 rounded-xl border border-white/10 w-full sm:w-auto text-xs font-bold">
                {['All', 'student', 'teacher'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRoleFilter(r)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedRoleFilter === r
                        ? 'bg-[#7C3CFF] text-white shadow'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {r === 'All' ? 'All Roles' : r === 'student' ? 'Students Only' : 'Coaching Only'}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0C1330] border border-white/10 text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2.5 placeholder-slate-500 focus:outline-none focus:border-[#7C3CFF]"
                />
              </div>
            </div>

            {/* Subscriptions Table */}
            <div className="overflow-x-auto rounded-2xl bg-[#080D24] border border-white/10 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#0C1330] text-[#67E8F9] font-mono uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-4">User / Institute</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Active Plan</th>
                    <th className="p-4">Subscribed Subjects</th>
                    <th className="p-4">Quota Left</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Quick Access Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#CBD5E1]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{u.name}</div>
                        <div className="text-xs text-[#94A3B8] font-mono">{u.email}</div>
                        {u.instituteName !== '-' && (
                          <div className="text-[11px] text-[#C4B5FD] flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            <span>{u.instituteName}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase ${
                          u.role === 'teacher' ? 'bg-[#7C3CFF]/20 text-[#C4B5FD]' : 'bg-[#06B6D4]/20 text-[#67E8F9]'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-white">{u.plan}</div>
                        <div className="text-xs text-[#10B981] font-mono">{u.amount}</div>
                      </td>

                      <td className="p-4 text-xs">
                        <div className="max-w-[200px] truncate" title={u.subscribedSubjects.join(', ')}>
                          {u.subscribedSubjects.join(', ')}
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold">
                        <span className="text-[#5EE7FF]">{u.quotaLeft}</span>
                        <span className="text-[#94A3B8]"> / {u.quotaMax}</span>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          u.status === 'Active' 
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        }`}>
                          {u.status}
                        </span>
                      </td>

                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleAddQuota(u.id, 25)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#67E8F9] border border-white/10"
                          title="Grant +25 Quota (Manual Override)"
                        >
                          +25 Quota
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-amber-300 border border-white/10"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= TAB 2: BLOG CMS ================= */}
        {activeTab === 'blog-cms' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Blog Content Management (CMS)</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8]">Publish SEO educational articles visible on /blog</p>
              </div>

              <button
                onClick={() => setShowAddBlogModal(true)}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            {/* Add Blog Modal */}
            {showAddBlogModal && (
              <div className="p-6 rounded-2xl bg-[#080D24] border border-[#7C3CFF]/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-bold text-white text-base">Write & Publish New SEO Article</h4>
                  <button onClick={() => setShowAddBlogModal(false)} className="text-xs text-[#94A3B8] hover:text-white">Cancel</button>
                </div>

                <form onSubmit={handleCreateBlog} className="space-y-3 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#94A3B8] block mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5 Pro Tips for CBSE Class 10 Science..."
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3CFF]"
                      />
                    </div>
                    <div>
                      <label className="text-[#94A3B8] block mb-1">Category</label>
                      <select
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3CFF]"
                      >
                        <option value="Class 10">Class 10</option>
                        <option value="Class 12">Class 12</option>
                        <option value="Coaching Tips">Coaching Tips</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#94A3B8] block mb-1">Short Excerpt (Meta Description)</label>
                    <textarea
                      rows={2}
                      placeholder="Brief 2-line summary for Google SEO search preview..."
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#7C3CFF]"
                    />
                  </div>

                  <div>
                    <label className="text-[#94A3B8] block mb-1">Article Markdown Content</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Write your article in markdown (## Heading, - Bullet point, etc.)..."
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full bg-[#0C1330] border border-white/10 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#7C3CFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gradient px-6 py-3 rounded-xl font-bold text-white text-sm shadow-lg"
                  >
                    Publish Article to Live /blog
                  </button>
                </form>
              </div>
            )}

            {/* Existing Blogs List */}
            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-[#080D24] border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#C4B5FD] bg-[#7C3CFF]/15 px-2 py-0.5 rounded">
                      {b.category} • {b.date}
                    </span>
                    <h4 className="text-base font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-[#94A3B8] font-mono">/blog/{b.slug}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 3: REVENUE & ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
              <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Estimated MRR</span>
              <div className="text-3xl font-black text-white">₹14,290</div>
              <p className="text-xs text-emerald-400 font-semibold">+28% growth this month</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
              <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Paid Coaching Centers</span>
              <div className="text-3xl font-black text-[#C4B5FD]">2 Institutes</div>
              <p className="text-xs text-[#94A3B8]">1 Director Pro • 1 Tuition Master</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
              <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Paid Board Students</span>
              <div className="text-3xl font-black text-[#67E8F9]">2 Active Passes</div>
              <p className="text-xs text-[#94A3B8]">Class 10 & Class 12 passes</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
              <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Total AI Checks Run</span>
              <div className="text-3xl font-black text-[#5EE7FF]">348 Evaluations</div>
              <p className="text-xs text-emerald-400 font-semibold">Gemini 3.8-Flash 99.8% Success</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
