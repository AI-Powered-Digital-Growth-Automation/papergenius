import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(true);

  // Device Session Fingerprint (Anti-Sharing Lock)
  const [sessionId] = useState(() => {
    let sid = localStorage.getItem('pg_session_id');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 12);
      localStorage.setItem('pg_session_id', sid);
    }
    return sid;
  });

  // Coaching Subscription Profile (Synced with DB)
  const [coachingSubscription, setCoachingSubscription] = useState({
    instituteName: 'Coaching / Tuition Institute',
    directorName: 'Teacher',
    directorEmail: '',
    plan: 'Starter Trial',
    isPremium: false,
    papersGeneratedThisMonth: 0,
    papersQuota: 2, // 2 lifetime free test papers
    canUseWatermark: false,
    canUseMultiSets: false,
    canGenerateOMR: true
  });

  // Student Freemium vs Premium State (Synced with DB)
  const [studentSubscription, setStudentSubscription] = useState({
    plan: 'Free Trial Student',
    isPremium: false,
    grade: 'Class 10',
    subscribedSubjects: [], // Zero subjects unlocked by default until paid
    evaluationsRemaining: 2, // 2 free trial evaluations
    maxEvaluations: 2,
    hasAccessToFormulas: false,
    hasAccessToMocks: false
  });

  // Fetch or Initialize Real User Quotas from Supabase Postgres Table
  const fetchAndSyncUserQuotas = async (currentUser, userRole) => {
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from('user_quotas')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error reading user_quotas from Supabase:', error.message);
      }

      if (data) {
        // Sync Student Profile from DB
        if (userRole === 'student') {
          setStudentSubscription(prev => ({
            ...prev,
            plan: data.plan_name || 'Free Trial Student',
            isPremium: Boolean(data.is_premium),
            grade: currentUser.user_metadata?.grade || 'Class 10',
            subscribedSubjects: data.subscribed_subjects || [],
            evaluationsRemaining: typeof data.quota_remaining === 'number' ? data.quota_remaining : 2,
            maxEvaluations: typeof data.quota_max === 'number' ? data.quota_max : 2,
            hasAccessToFormulas: Boolean(data.is_premium),
            hasAccessToMocks: Boolean(data.is_premium)
          }));
        } else {
          // Sync Coaching Profile from DB
          setCoachingSubscription(prev => ({
            ...prev,
            instituteName: currentUser.user_metadata?.institute_name || prev.instituteName,
            directorName: currentUser.user_metadata?.full_name || prev.directorName,
            directorEmail: currentUser.email,
            plan: data.plan_name || 'Starter Trial',
            isPremium: Boolean(data.is_premium),
            papersQuota: typeof data.quota_max === 'number' ? data.quota_max : 2,
            papersGeneratedThisMonth: Math.max(0, (data.quota_max || 2) - (data.quota_remaining || 2)),
            canUseWatermark: Boolean(data.is_premium),
            canUseMultiSets: Boolean(data.is_premium) && data.plan_name?.includes('Director'),
            canGenerateOMR: true
          }));
        }
      } else {
        // Initialize Default Record in Supabase DB for new user
        const defaultRecord = {
          user_id: currentUser.id,
          email: currentUser.email,
          role: userRole,
          plan_name: userRole === 'teacher' ? 'Starter Trial' : 'Free Trial Student',
          is_premium: false,
          quota_remaining: 2,
          quota_max: 2,
          subscribed_subjects: []
        };

        const { error: insertErr } = await supabase
          .from('user_quotas')
          .insert([defaultRecord]);

        if (insertErr) {
          console.warn('Auto-init quota record note:', insertErr.message);
        }
      }
    } catch (err) {
      console.warn('Quota sync exception:', err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const userRole = currentUser.user_metadata?.role || 'student';
        setRole(userRole);
        fetchAndSyncUserQuotas(currentUser, userRole);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const userRole = currentUser.user_metadata?.role || 'student';
        setRole(userRole);
        fetchAndSyncUserQuotas(currentUser, userRole);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  const hasSubjectAccess = (subject) => {
    if (!studentSubscription || !studentSubscription.subscribedSubjects) return false;

    const normalize = (name) => {
      const lower = name.toLowerCase().trim();
      if (lower === 'social science' || lower === 'sst') return 'social_science';
      if (lower === 'science') return 'science';
      if (lower.includes('math')) return 'mathematics';
      if (lower === 'physics') return 'physics';
      if (lower === 'chemistry') return 'chemistry';
      if (lower === 'biology') return 'biology';
      if (lower.includes('computer')) return 'computer_science';
      if (lower.includes('informatics')) return 'informatics_practices';
      if (lower.includes('account')) return 'accountancy';
      if (lower.includes('business')) return 'business_studies';
      if (lower.includes('eco')) return 'economics';
      if (lower.includes('english')) return 'english';
      return lower.replace(/[^a-z]/g, '');
    };

    const targetKey = normalize(subject);
    return studentSubscription.subscribedSubjects.some(sub => normalize(sub) === targetKey);
  };

    // Consume Evaluation Quota (Secured via Database Atomic RPC)
  const consumeEvaluationQuota = async () => {
    if (user) {
      try {
        const { data, error } = await supabase.rpc('consume_user_quota', {
          target_user_id: user.id
        });

        if (error) {
          console.warn('RPC quota decrement failed:', error.message);
          return false;
        }

        if (data && data.success) {
          setStudentSubscription(prev => ({
            ...prev,
            evaluationsRemaining: data.quota_remaining
          }));
          return true;
        } else {
          console.warn('Quota exhausted or invalid:', data?.error);
          return false;
        }
      } catch (err) {
        console.warn('Failed to call consume_user_quota RPC:', err);
        return false;
      }
    } else {
      // Offline/Guest fallback
      setStudentSubscription(prev => ({
        ...prev,
        evaluationsRemaining: Math.max(0, prev.evaluationsRemaining - 1)
      }));
      return true;
    }
  };

  // Consume Paper Quota (Secured via Database Atomic RPC)
  const consumePaperQuota = async () => {
    if (user) {
      try {
        const { data, error } = await supabase.rpc('consume_user_quota', {
          target_user_id: user.id
        });

        if (error) {
          console.warn('RPC quota decrement failed:', error.message);
          return false;
        }

        if (data && data.success) {
          setCoachingSubscription(prev => ({
            ...prev,
            papersGeneratedThisMonth: Math.max(0, prev.papersQuota - data.quota_remaining)
          }));
          return true;
        } else {
          console.warn('Quota exhausted or invalid:', data?.error);
          return false;
        }
      } catch (err) {
        console.warn('Failed to call consume_user_quota RPC:', err);
        return false;
      }
    } else {
      // Offline/Guest fallback
      setCoachingSubscription(prev => ({
        ...prev,
        papersGeneratedThisMonth: prev.papersGeneratedThisMonth + 1
      }));
      return true;
    }
  };

  

  const upgradeToPremium = async (planName = 'Class 10 Board Pass', subjects = ['Science', 'Mathematics Standard']) => {
    const maxQ = planName.includes('12') ? 150 : 100;
    setStudentSubscription({
      plan: planName,
      isPremium: true,
      grade: planName.includes('12') ? 'Class 12' : 'Class 10',
      subscribedSubjects: subjects,
      evaluationsRemaining: maxQ,
      maxEvaluations: maxQ,
      hasAccessToFormulas: true,
      hasAccessToMocks: true
    });

    if (user) {
      try {
        await supabase
          .from('user_quotas')
          .update({
            plan_name: planName,
            is_premium: true,
            quota_max: maxQ,
            quota_remaining: maxQ,
            subscribed_subjects: subjects,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } catch (err) {
        console.warn('Failed to persist upgrade:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      setRole,
      sessionId,
      loading,
      signOut,
      studentSubscription,
      setStudentSubscription,
      coachingSubscription,
      setCoachingSubscription,
      hasSubjectAccess,
      consumeEvaluationQuota,
      consumePaperQuota,
      upgradeToPremium
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
