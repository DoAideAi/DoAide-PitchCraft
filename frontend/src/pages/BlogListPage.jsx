import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const POSTS = [
  {
    slug: "startup-funding-india-guide-2025",
    title: "Complete Guide to Startup Funding in India 2025: Seed to Series A",
    excerpt: "Everything Indian founders need to know about raising startup funding in 2025 — stages, top VCs, valuations, government schemes, and how to prepare your pitch.",
    date: "2025-04-01",
    readTime: "12 min read",
  },
  {
    slug: "investor-pitch-tips-india",
    title: "How to Pitch to Indian Investors: 10 Tips That Actually Work in 2025",
    excerpt: "Actionable tips for pitching to Indian VCs and angel networks — unit economics, warm intros, INR financials, and what Indian investors really look for.",
    date: "2025-03-22",
    readTime: "10 min read",
  },
  {
    slug: "pitch-deck-templates-indian-startups",
    title: "Best Pitch Deck Templates for Indian Startups: Formats That Win Funding in 2025",
    excerpt: "Discover pitch deck templates tailored for Indian startups — formats used by Sequoia Surge, 100X.VC, and YC-backed Indian founders.",
    date: "2025-03-15",
    readTime: "11 min read",
  },
  {
    slug: "perfect-elevator-pitch-formula",
    title: "The Perfect Elevator Pitch: A Step-by-Step Formula for Founders",
    excerpt: "Master the art of the 30-second pitch with a proven formula that hooks investors and opens doors.",
    date: "2024-12-01",
    readTime: "6 min read",
  },
  {
    slug: "top-investor-questions-startup-founders",
    title: "Top 20 Investor Questions Every Startup Founder Must Prepare For",
    excerpt: "From 'What's your moat?' to 'Why now?' — the questions VCs always ask and how to answer them confidently.",
    date: "2024-12-05",
    readTime: "9 min read",
  },
  {
    slug: "pitch-deck-mistakes-to-avoid",
    title: "7 Pitch Deck Mistakes That Kill Your Fundraising Chances",
    excerpt: "Common pitch deck mistakes founders make and actionable fixes to make your deck stand out to investors.",
    date: "2024-12-10",
    readTime: "7 min read",
  },
  {
    slug: "how-to-create-winning-pitch-deck",
    title: "How to Create a Winning Pitch Deck in 2024",
    excerpt: "Learn the 12 essential slides every investor expects and how to craft a compelling narrative that gets you funded.",
    date: "2024-11-15",
    readTime: "8 min read",
  },
  {
    slug: "startup-valuation-methods-explained",
    title: "Startup Valuation Methods Explained: Which One Is Right for You?",
    excerpt: "From revenue multiples to DCF analysis — understand the valuation methods VCs use and how to pick the right one for your stage.",
    date: "2024-11-10",
    readTime: "6 min read",
  },
  {
    slug: "financial-model-first-time-founders",
    title: "Building Your First Financial Model: A Guide for First-Time Founders",
    excerpt: "Stop guessing your numbers. Build a credible 3-year financial model that investors will actually believe.",
    date: "2024-11-05",
    readTime: "7 min read",
  },
];

export default function BlogListPage() {
  usePageTitle("Blog");

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center max-w-5xl w-full mx-auto px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-xl font-bold tracking-tight">DoAide <span className="text-brand">| PitchCraft</span></span>
        </Link>
        <div className="ml-auto"><ThemeToggle /></div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">PitchCraft Blog</h1>
        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="panel block group hover:border-brand transition-colors">
              <h2 className="font-semibold text-lg text-ink-strong group-hover:text-brand transition-colors mb-2">{post.title}</h2>
              <p className="text-sm text-ink-soft mb-3">{post.excerpt}</p>
              <div className="flex gap-4 text-xs text-ink-muted">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export { POSTS };
