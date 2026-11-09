import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingNavArrows from './components/common/FloatingNavArrows';
import WhatsAppButton from './components/common/WhatsAppButton';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Core Landing Page loaded directly for instant First Contentful Paint (FCP)
import LandingPage from './pages/landing/LandingPage';

// Lazy-loaded routes for 10x faster mobile performance & code-splitting
const TeacherPage = lazy(() => import('./pages/teacher/TeacherPage'));
const TeacherDashboardPage = lazy(() => import('./pages/teacher/TeacherDashboardPage'));
const ReportCardGeneratorPage = lazy(() => import('./pages/teacher/ReportCardGeneratorPage'));
const Class10Page = lazy(() => import('./pages/student/Class10Page'));
const Class12Page = lazy(() => import('./pages/student/Class12Page'));
const PricingPage = lazy(() => import('./pages/pricing/PricingPage'));
const DisclaimerPage = lazy(() => import('./pages/legal/DisclaimerPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage'));
const RefundPage = lazy(() => import('./pages/legal/RefundPage'));
const AuthPage = lazy(() => import('./pages/auth/AuthPage'));
const CreatePaperPage = lazy(() => import('./pages/teacher/CreatePaperPage'));
const StudentEvaluatorPage = lazy(() => import('./pages/student/StudentEvaluatorPage'));
const StudentDashboardPage = lazy(() => import('./pages/student/StudentDashboardPage'));
const PercentagePredictorPage = lazy(() => import('./pages/student/PercentagePredictorPage'));
const PyqVaultPage = lazy(() => import('./pages/pyq/PyqVaultPage'));
const VerifyPaperPage = lazy(() => import('./pages/pyq/VerifyPaperPage'));
const BlogListPage = lazy(() => import('./pages/blog/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/blog/BlogPostPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));

// Sleek fallback loading spinner
function RouteLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono text-slate-400">Loading PaperGenius OS...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#050814] flex flex-col text-[#F3F4F6] relative">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                {/* Public Discovery & Academic Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/class-10" element={<Class10Page />} />
                <Route path="/class-12" element={<Class12Page />} />
                <Route path="/teacher/portal" element={<TeacherPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/predictor" element={<PercentagePredictorPage />} />
                <Route path="/pyq-vault" element={<PyqVaultPage />} />
                <Route path="/verify-paper/:paperId" element={<VerifyPaperPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected Teacher OS Routes */}
                <Route
                  path="/teacher"
                  element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <TeacherDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <TeacherDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/create-paper"
                  element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <CreatePaperPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teacher/report-cards"
                  element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <ReportCardGeneratorPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Student OS Routes */}
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/evaluator"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentEvaluatorPage />
                    </ProtectedRoute>
                  }
                />

                {/* Legal Pages */}
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/refund-policy" element={<RefundPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <FloatingNavArrows />
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </Router>
  );
}
