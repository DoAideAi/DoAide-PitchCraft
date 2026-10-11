import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const TYPEWRITER_LINES = [
  "Your Pitch Deck in 5 Minutes",
  "AI-powered financial models, instantly",
  "Know your startup valuation today",
  "Investor-ready decks, zero design skills",
];

function useTypewriter(lines, typingSpeed = 50, pauseMs = 2000) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const line = lines[lineIndex];
    if (!deleting && charIndex < line.length) {
      const t = setTimeout(() => {
        setText(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIndex === line.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setText(line.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, typingSpeed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    }
  }, [charIndex, deleting, lineIndex, lines, typingSpeed, pauseMs]);

  return text;
}

const TOOLS = [
  { icon: "📊", title: "Valuation Calculator", desc: "Estimate your pre-money valuation using industry multiples", to: "/tools/valuation-calculator" },
  { icon: "🎯", title: "Pitch Deck Generator", desc: "AI generates a slide-by-slide outline for your deck", to: "/generator" },
  { icon: "💰", title: "Financial Model", desc: "Build a 3-year P&L projection in seconds", to: "/model" },
  { icon: "🔥", title: "Burn Rate Calculator", desc: "Calculate your runway and monthly cash burn rate", to: "/tools/burn-rate-calculator" },
  { icon: "✅", title: "Readiness Checker", desc: "Score your pitch deck readiness with 10 questions", to: "/tools/investor-readiness-quiz" },
  { icon: "🎤", title: "Elevator Pitch Generator", desc: "AI-crafted 30/60/90-second elevator pitches for your startup", to: "/tools/elevator-pitch-generator" },
  { icon: "❓", title: "Investor Q&A Prep", desc: "Prepare for tough investor questions with AI-generated answers", to: "/tools/investor-qa-prep" },
  { icon: "📋", title: "Pitch Deck Outline", desc: "Instant structured pitch deck outline — no AI, works offline", to: "/tools/pitch-deck-outline" },
];

const FEATURES = [
  { icon: "⚡", title: "5-Minute Decks", desc: "From startup details to investor-ready outline — instantly." },
  { icon: "📈", title: "3-Year Projections", desc: "Revenue, costs, break-even — auto-calculated P&L tables." },
  { icon: "🧠", title: "AI-Powered", desc: "Powered by advanced AI to generate compelling narratives." },
  { icon: "🆓", title: "Free Forever", desc: "Core tools always free. No signup required." },
];

const PRICING = [
  { name: "Free", price: "$0", period: "forever", features: ["Valuation calculator", "Pitch outline generator", "Financial model builder", "Readiness checker"], cta: "Get Started", highlight: false },
  { name: "Pro", price: "$29", period: "/mo", features: ["Everything in Free", "Full AI pitch decks (PDF)", "Detailed financial charts", "Investor matching", "Priority AI processing"], cta: "Upgrade to Pro", highlight: true },
  { name: "Enterprise", price: "$99", period: "/mo", features: ["Everything in Pro", "Custom branding", "Team collaboration", "API access", "Dedicated support"], cta: "Contact Sales", highlight: false },
];

export default function LandingPage() {
  usePageTitle(null);
  const typed = useTypewriter(TYPEWRITER_LINES);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink overflow-x-hidden">
      <header className="flex items-center max-w-7xl w-full mx-auto px-5 py-5">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-2xl font-bold tracking-tight">
            DoAide <span className="text-brand">| PitchCraft</span>
          </span>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          <Link to="/valuation" className="text-sm text-ink-soft hover:text-brand transition-colors hidden sm:inline">Valuation</Link>
          <Link to="/generator" className="text-sm text-ink-soft hover:text-brand transition-colors hidden sm:inline">Generator</Link>
          <Link to="/model" className="text-sm text-ink-soft hover:text-brand transition-colors hidden sm:inline">Model</Link>
          <Link to="/blog" className="text-sm text-ink-soft hover:text-brand transition-colors hidden md:inline">Blog</Link>
          <a href="#pricing" className="text-sm text-ink-soft hover:text-brand transition-colors">Pricing</a>
          <ThemeToggle />
        </nav>
      </header>

      <section
        className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl w-full mx-auto px-5 lg:px-8 py-10 lg:py-20 flex-1"
        style={{ animation: "fade-up 0.8s ease 0.2s both" }}
      >
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--da-glass-feature-bg)] border border-[var(--da-glass-feature-border)] text-sm text-brand mb-4">
            🚀 Free startup tools — no signup
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-brand">{typed}</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-xl mb-8">
            Generate pitch deck outlines, financial models, and startup valuations — all powered by AI. Free tools for founders who move fast.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/generator" className="btn btn-primary text-base px-6 py-3">
              Generate Pitch Deck
            </Link>
            <Link to="/valuation" className="btn btn-ghost text-base px-6 py-3">
              Calculate Valuation
            </Link>
          </div>
        </div>
        <div className="flex-1 min-w-0 max-w-md w-full">
          <AuthForm />
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Free Startup Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="panel hover:border-brand transition-colors group">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-semibold text-ink-strong mb-1 group-hover:text-brand transition-colors">{t.title}</h3>
              <p className="text-sm text-ink-soft">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why PitchCraft?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-ink-strong mb-1">{f.title}</h3>
              <p className="text-sm text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-5xl w-full mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING.map((p) => (
            <div key={p.name} className={`panel text-center ${p.highlight ? "border-brand ring-1 ring-brand" : ""}`}>
              <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
              <div className="text-3xl font-bold text-brand mb-1">{p.price}<span className="text-sm font-normal text-ink-soft">{p.period}</span></div>
              <ul className="text-sm text-ink-soft space-y-2 my-6 text-left">
                {p.features.map((f) => <li key={f}>✓ {f}</li>)}
              </ul>
              <button className={`btn w-full ${p.highlight ? "btn-primary" : "btn-ghost"}`}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-brand bg-[var(--da-glass-feature-bg)] border border-[var(--da-glass-feature-border)] px-2 py-0.5 rounded-full">A DoAide Product</span>
            <span className="text-sm text-ink-soft">© {new Date().getFullYear()} DoAide. All rights reserved.</span>
          </div>
          <div className="flex gap-4 text-sm text-ink-soft">
            <a href="https://doaide.com" className="hover:text-brand transition-colors">DoAide.com</a>
            <Link to="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <Link to="/embed" className="hover:text-brand transition-colors">Embed</Link>
            <Link to="/sitemap" className="hover:text-brand transition-colors">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
