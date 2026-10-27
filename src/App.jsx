import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingNavArrows from './components/common/FloatingNavArrows';
import LandingPage from './pages/landing/LandingPage';
import TeacherPage from './pages/teacher/TeacherPage';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import ReportCardGeneratorPage from './pages/teacher/ReportCardGeneratorPage';
import Class10Page from './pages/student/Class10Page';
import Class12Page from './pages/student/Class12Page';
import PricingPage from './pages/pricing/PricingPage';
import DisclaimerPage from './pages/legal/DisclaimerPage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import RefundPage from './pages/legal/RefundPage';
import AuthPage from './pages/auth/AuthPage';
import CreatePaperPage from './pages/teacher/CreatePaperPage';
import StudentEvaluatorPage from './pages/student/StudentEvaluatorPage';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import PercentagePredictorPage from './pages/student/PercentagePredictorPage';
import PyqVaultPage from './pages/pyq/PyqVaultPage';
import BlogListPage from './pages/blog/BlogListPage';
import BlogPostPage from './pages/blog/BlogPostPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#050814] flex flex-col text-[#F3F4F6] relative">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/teacher" element={<TeacherDashboardPage />} />
              <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
              <Route path="/teacher/portal" element={<TeacherPage />} />
              <Route path="/teacher/create-paper" element={<CreatePaperPage />} />
              <Route path="/teacher/report-cards" element={<ReportCardGeneratorPage />} />
              
              <Route path="/student" element={<StudentDashboardPage />} />
              <Route path="/student/dashboard" element={<StudentDashboardPage />} />
              <Route path="/student/evaluator" element={<StudentEvaluatorPage />} />
              <Route path="/predictor" element={<PercentagePredictorPage />} />
              
              <Route path="/class-10" element={<Class10Page />} />
              <Route path="/class-12" element={<Class12Page />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/pyq-vault" element={<PyqVaultPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />

              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/refund-policy" element={<RefundPage />} />
              <Route path="/auth" element={<AuthPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingNavArrows />
        </div>
      </AuthProvider>
    </Router>
  );
}
