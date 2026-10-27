import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Shell from "./components/Shell";
import { SkeletonPanel } from "./components/Skeleton";
import useSEO from "./hooks/useSEO";
import { useAuth } from "./hooks/useAuth";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import CheckerPage from "./pages/CheckerPage";
import DashboardPage from "./pages/DashboardPage";
import ElevatorPitchPage from "./pages/ElevatorPitchPage";
import EmbedPage from "./pages/EmbedPage";
import GeneratorPage from "./pages/GeneratorPage";
import InvestorQAPage from "./pages/InvestorQAPage";
import LandingPage from "./pages/LandingPage";
import ModelPage from "./pages/ModelPage";
import PitchOutlinePage from "./pages/PitchOutlinePage";
import PricingPage from "./pages/PricingPage";
import SitemapPage from "./pages/SitemapPage";
import BurnRatePage from "./pages/BurnRatePage";
import ValuationPage from "./pages/ValuationPage";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <SkeletonPanel lines={5} label="Checking your session" />
      </div>
    );
  }
  if (!user) return <Navigate to="/" replace />;
  return (
    <Shell>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Shell>
  );
}

function Home() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <SkeletonPanel lines={5} label="Checking your session" />
      </div>
    );
  }
  if (!user) return <LandingPage />;
  return (
    <Shell>
      <ErrorBoundary>
        <DashboardPage />
      </ErrorBoundary>
    </Shell>
  );
}

export default function App() {
  useSEO(useLocation().pathname.replace(/\/+$/, "") || "/");
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Home />} />

      {/* Free tools — no login required */}
      <Route path="/valuation" element={<ValuationPage />} />
      <Route path="/tools/valuation-calculator" element={<ValuationPage />} />
      <Route path="/generator" element={<GeneratorPage />} />
      <Route path="/model" element={<ModelPage />} />
      <Route path="/tools/burn-rate-calculator" element={<BurnRatePage />} />
      <Route path="/burn-rate" element={<BurnRatePage />} />
      <Route path="/checker" element={<CheckerPage />} />
      <Route path="/tools/investor-readiness-quiz" element={<CheckerPage />} />
      <Route path="/tools/elevator-pitch-generator" element={<ElevatorPitchPage />} />
      <Route path="/elevator-pitch" element={<ElevatorPitchPage />} />
      <Route path="/tools/investor-qa-prep" element={<InvestorQAPage />} />
      <Route path="/investor-qa" element={<InvestorQAPage />} />
      <Route path="/tools/pitch-deck-outline" element={<PitchOutlinePage />} />
      <Route path="/pitch-outline" element={<PitchOutlinePage />} />

      {/* SEO & content pages */}
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/embed" element={<EmbedPage />} />
      <Route path="/sitemap" element={<SitemapPage />} />

      {/* Protected app routes */}
      <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
