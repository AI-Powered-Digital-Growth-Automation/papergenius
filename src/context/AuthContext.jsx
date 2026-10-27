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

  // Coaching Subscription Profile
  const [coachingSubscription, setCoachingSubscription] = useState({
    instituteName: 'Apex Science Academy & Coaching',
    directorName: 'Gulzar Ahmed (Director)',
    directorEmail: 'digitalgulzarservices@gmail.com',
    plan: 'Coaching Director Pro',
    papersGeneratedThisMonth: 14,
    papersQuota: 150,
    canUseWatermark: true,
    canUseMultiSets: true,
    canGenerateOMR: true
  });

  // Student Freemium vs Premium State
  const [studentSubscription, setStudentSubscription] = useState({
    plan: 'Free Trial Student',
    isPremium: false,
    grade: 'Class 10',
    subscribedSubjects: ['Science', 'Mathematics Standard'],
    evaluationsRemaining: 2,
    maxEvaluations: 2,
    hasAccessToFormulas: false,
    hasAccessToMocks: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = session.user.user_metadata?.role || 'student';
        setRole(userRole);

        const isUserPremium = session.user.user_metadata?.is_premium || false;
        if (isUserPremium) {
          setStudentSubscription({
            plan: 'Class 10 Board Pass',
            isPremium: true,
            grade: 'Class 10',
            subscribedSubjects: ['Science', 'Mathematics Standard'],
            evaluationsRemaining: 98,
            maxEvaluations: 100,
            hasAccessToFormulas: true,
            hasAccessToMocks: true
          });
        }
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userRole = session.user.user_metadata?.role || 'student';
        setRole(userRole);
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

  const consumeEvaluationQuota = () => {
    setStudentSubscription(prev => ({
      ...prev,
      evaluationsRemaining: Math.max(0, prev.evaluationsRemaining - 1)
    }));
  };

  const consumePaperQuota = () => {
    setCoachingSubscription(prev => ({
      ...prev,
      papersGeneratedThisMonth: prev.papersGeneratedThisMonth + 1
    }));
  };

  const upgradeToPremium = (planName = 'Class 10 Board Pass', subjects = ['Science', 'Mathematics Standard']) => {
    setStudentSubscription({
      plan: planName,
      isPremium: true,
      grade: planName.includes('12') ? 'Class 12' : 'Class 10',
      subscribedSubjects: subjects,
      evaluationsRemaining: planName.includes('12') ? 150 : 100,
      maxEvaluations: planName.includes('12') ? 150 : 100,
      hasAccessToFormulas: true,
      hasAccessToMocks: true
    });
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
