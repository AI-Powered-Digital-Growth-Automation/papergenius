import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { 
  ShieldAlert, Users, BookOpen, BarChart3, PlusCircle, 
  CheckCircle2, XCircle, Search, Trash2,
  Edit3, Check,
  CreditCard, Clock, Building2, User, RefreshCw
} from 'lucide-react';
import { initialBlogPosts } from '../../data/blogData';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('subscriptions'); // 'subscriptions' | 'payments' | 'blog-cms' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  
  // Blog CMS state
  const [blogs, setBlogs] = useState(initialBlogPosts);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    category: 'Class 10',
    excerpt: '',
    content: '',
    image: '',
    tags: 'Class 10, CBSE 2026'
  });

  // Real-time Supabase Live User Tracking State
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Payment Requests State
  const [paymentsList, setPaymentsList] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

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

  const fetchPaymentRequests = async () => {
    setLoadingPayments(true);
    try {
      const { data, error } = await supabase
        .from('payment_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPaymentsList(data);
      }
    } catch (err) {
      console.warn('Failed to fetch payment requests:', err);
    } finally {
      setLoadingPayments(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map(b => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || b.title,
          category: b.category || 'General',
          readTime: b.read_time || '5 min read',
          date: new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          author: b.author || 'PaperGenius Academic Team',
          authorRole: 'Academic Director',
          tags: ['CBSE', b.category || 'Class 10'],
          content: b.content
        }));
        setBlogs([...mapped, ...initialBlogPosts.filter(p => !mapped.some(m => m.slug === p.slug))]);
      }
    } catch (err) {
      console.warn('Failed to fetch blogs from Supabase:', err);
    }
  };

  useEffect(() => {
    fetchRealUsers();
    fetchBlogs();
    fetchPaymentRequests();
  }, []);

  // Approve UTR Payment & Auto-credit Quota
  const handleApprovePayment = async (payment) => {
    let quotaBonus = 25;
    if (payment.amount?.includes('4,999') || payment.plan_name?.toLowerCase().includes('director')) {
      quotaBonus = 150;
    } else if (payment.amount?.includes('799') || payment.plan_name?.toLowerCase().includes('master')) {
      quotaBonus = 12;
    } else if (payment.amount?.includes('599') || payment.plan_name?.toLowerCase().includes('booster')) {
      quotaBonus = 25;
    } else if (payment.amount?.includes('499')) {
      quotaBonus = 20;
    } else if (payment.amount?.includes('199')) {
      quotaBonus = 10;
    }

    // 1. Update payment_requests status
    setPaymentsList(prev => prev.map(p => p.id === payment.id ? { ...p, status: 'approved' } : p));

    try {
      await supabase
        .from('payment_requests')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: 'Gulzar Ahmed (Founder)'
        })
        .eq('id', payment.id);

      // 2. Add Quota to user if existing in user_quotas
      const existingUser = usersList.find(u => u.email?.toLowerCase() === payment.email?.toLowerCase());
      if (existingUser) {
        await handleAddQuota(existingUser.id, quotaBonus);
      } else {
        // Upsert new quota row for user
        await supabase.from('user_quotas').upsert({
          email: payment.email.toLowerCase(),
          role: payment.plan_name?.toLowerCase().includes('director') || payment.plan_name?.toLowerCase().includes('master') ? 'teacher' : 'student',
          plan_name: payment.plan_name,
          is_premium: true,
          quota_remaining: quotaBonus,
          quota_max: quotaBonus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });
        fetchRealUsers();
      }
    } catch (err) {
      console.error('Failed to approve payment:', err);
    }
  };

  // Reject UTR Payment
  const handleRejectPayment = async (id) => {
    setPaymentsList(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
    try {
      await supabase
        .from('payment_requests')
        .update({ status: 'rejected' })
        .eq('id', id);
    } catch (err) {
      console.error('Failed to reject payment:', err);
    }
  };

  // Real Database Update: Add Quota (+25)
  const handleAddQuota = async (id, amountToAdd) => {
    const targetUser = usersList.find(u => u.id === id);
    if (!targetUser) return;

    const newLeft = targetUser.quotaLeft + amountToAdd;
    const newMax = targetUser.quotaMax + amountToAdd;

    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, quotaLeft: newLeft, quotaMax: newMax, status: 'Active' };
      }
      return u;
    }));

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

    // Device Image File Upload Handler
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBlog(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const resetBlogForm = () => {
    setNewBlog({ title: '', slug: '', category: 'Class 10', excerpt: '', content: '', image: '', tags: 'Class 10, CBSE 2026' });
    setEditingBlogId(null);
    setShowAddBlogModal(false);
  };

  const handleStartEditBlog = (blog) => {
    setEditingBlogId(blog.id || blog.slug);
    setNewBlog({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Class 10',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || blog.image_url || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || 'Class 10, CBSE 2026')
    });
    setShowAddBlogModal(true);
  };

  // Persistent Blog CMS Add
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    const autoSlug = newBlog.slug || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newRecord = {
      slug: autoSlug,
      title: newBlog.title,
      excerpt: newBlog.excerpt || newBlog.title,
      content: newBlog.content,
      category: newBlog.category || 'Class 10',
      read_time: '5 min read',
      author: 'Gulzar Ahmed (Founder)',
      is_published: true
    };

    const createdLocal = {
      id: autoSlug,
      ...newRecord,
      readTime: '5 min read',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      authorRole: 'Founder & Academic Director',
      tags: (newBlog.tags || 'Class 10, CBSE').split(',').map(t => t.trim())
    };
    setBlogs([createdLocal, ...blogs]);
    setShowAddBlogModal(false);
    setNewBlog({ title: '', slug: '', category: 'Class 10', excerpt: '', content: '',
    image: '', tags: 'Class 10, CBSE 2026' });

    try {
      const { error } = await supabase.from('blogs').upsert([newRecord], { onConflict: 'slug' });
      if (error) {
        console.error('Failed to persist blog to Supabase:', error.message);
      }
    } catch (err) {
      console.error('Error saving blog to database:', err);
    }
  };

  // Persistent Blog CMS Delete
  const handleDeleteBlog = async (id) => {
    const targetBlog = blogs.find(b => b.id === id || b.slug === id);
    setBlogs(prev => prev.filter(b => b.id !== id && b.slug !== id));

    if (targetBlog) {
      try {
        await supabase.from('blogs').delete().or(`id.eq.${id},slug.eq.${id}`);
      } catch (err) {
        console.error('Failed to delete blog from Supabase:', err);
      }
    }
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

    // Dynamic Real Analytics Calculations
  const totalApprovedRevenue = paymentsList
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => {
      const num = parseInt((p.amount || '').replace(/[^0-9]/g, ''), 10) || 0;
      return sum + num;
    }, 0);

  const paidCoachingCount = usersList.filter(u => u.role === 'teacher' && u.status === 'Active').length;
  const paidStudentCount = usersList.filter(u => u.role === 'student' && u.status === 'Active').length;
  const totalQuotasIssued = usersList.reduce((acc, u) => acc + (u.quotaMax || 0), 0);
  const pendingPaymentsCount = paymentsList.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#050814] text-[#F3F4F6] pb-24 pt-6 px-4 sm:px-6 lg:px-8 text-base">
      
      {/* 1. TOP ADMIN BANNER */}
      <div className="max-w-7xl mx-auto mb-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#080D24] via-[#120D3D] to-[#080D24] border border-purple-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEditBlog(b)}
                      className="p-2 rounded-lg bg-[#7C3CFF]/20 hover:bg-[#7C3CFF]/40 text-[#C4B5FD] border border-[#7C3CFF]/30 transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
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
              <span>Users & Quotas ({usersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-gradient-to-r from-[#7C3CFF] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>UTR Approvals</span>
              {pendingPaymentsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                  {pendingPaymentsCount}
                </span>
              )}
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

        {/* ================= TAB 2: PAYMENT APPROVALS (UTR QUEUE) ================= */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#080D24] border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Payment Requests & UTR Verification</h3>
                <p className="text-xs text-[#94A3B8]">Review submitted UPI/PhonePe UTRs and activate instant user quotas</p>
              </div>
              <button
                onClick={fetchPaymentRequests}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Queue</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-[#080D24] border border-white/10 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#0C1330] text-[#67E8F9] font-mono uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer Email</th>
                    <th className="p-4">Plan / Price</th>
                    <th className="p-4">Submitted UTR</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#CBD5E1]">
                  {paymentsList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 font-mono text-xs">
                        No payment requests submitted yet.
                      </td>
                    </tr>
                  ) : (
                    paymentsList.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 text-xs font-mono text-slate-400">
                          {new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4 font-semibold text-white">
                          {p.email}
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-cyan-300">{p.plan_name}</span>
                          <span className="block text-[11px] font-mono text-emerald-400">{p.amount}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-white select-all">
                          {p.utr_number}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            p.status === 'approved'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                              : p.status === 'rejected'
                              ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          {p.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleApprovePayment(p)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow"
                              >
                                Approve & Credit
                              </button>
                              <button
                                onClick={() => handleRejectPayment(p.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 text-xs border border-red-500/30"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-500 font-mono">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: BLOG CMS ================= */}
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

                                  {/* Featured Banner Image Upload Field */}
                <div>
                  <label className="text-[#94A3B8] block mb-1 font-semibold text-xs">Featured Banner Image</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <label className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md shrink-0">
                      <span>📁 Choose Image File</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileUpload} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="url"
                      placeholder="Or paste image URL (https://...)"
                      value={newBlog.image || ''}
                      onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                      className="flex-1 bg-[#0C1330] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#7C3CFF]"
                    />
                  </div>
                  {newBlog.image && (
                    <div className="mt-2.5 flex items-center gap-3 p-2.5 bg-[#0C1330] rounded-xl border border-white/10">
                      <img 
                        src={newBlog.image} 
                        alt="Banner Preview" 
                        className="w-20 h-12 object-cover rounded-lg border border-white/20 shadow"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="flex-1 text-left">
                        <span className="text-xs text-emerald-400 font-semibold block">✓ Banner Image Selected</span>
                        <button 
                          type="button" 
                          onClick={() => setNewBlog({ ...newBlog, image: '' })}
                          className="text-[11px] text-red-400 hover:underline mt-0.5"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
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
                      onClick={() => handleStartEditBlog(b)}
                      className="p-2 rounded-lg bg-[#7C3CFF]/20 hover:bg-[#7C3CFF]/40 text-[#C4B5FD] border border-[#7C3CFF]/30 transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
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

        {/* ================= TAB 4: REVENUE & ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
                <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Total Approved Revenue</span>
                <div className="text-3xl font-black text-emerald-400">?{totalApprovedRevenue.toLocaleString('en-IN')}</div>
                <p className="text-xs text-[#94A3B8]">Verified PhonePe / UPI UTR credits</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
                <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Paid Coaching Centers</span>
                <div className="text-3xl font-black text-[#C4B5FD]">{paidCoachingCount} Institutes</div>
                <p className="text-xs text-[#94A3B8]">Active Director & Coaching Passes</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
                <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Paid Board Students</span>
                <div className="text-3xl font-black text-[#67E8F9]">{paidStudentCount} Active Passes</div>
                <p className="text-xs text-[#94A3B8]">Class 10 & 12 Board Passes</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080D24] border border-white/10 space-y-2">
                <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Total Quota Allocated</span>
                <div className="text-3xl font-black text-[#5EE7FF]">{totalQuotasIssued} Papers</div>
                <p className="text-xs text-emerald-400 font-semibold">Live capacity across all tiers</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0C1330] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Live Payment Verification Queue</h4>
                <p className="text-xs text-[#94A3B8]">{pendingPaymentsCount} pending manual UTR approvals waiting in queue.</p>
              </div>
              <button
                onClick={() => setActiveTab('payments')}
                className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white shadow"
              >
                Go to Approvals ({pendingPaymentsCount})
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
