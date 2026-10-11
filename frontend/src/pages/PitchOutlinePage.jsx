import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

function buildOutline(form) {
  return [
    {
      number: 1,
      title: "Title Slide",
      bullets: [
        form.company_name,
        `Industry: ${form.industry}`,
        "Your tagline or one-liner goes here",
        "Contact information",
      ],
      note: "Keep it clean. One sentence that captures your vision.",
    },
    {
      number: 2,
      title: "The Problem",
      bullets: [
        form.problem || "Describe the pain point your customers face",
        "How big is this problem? Who suffers most?",
        "What happens if this problem goes unsolved?",
        "Use a real story or data point to make it vivid",
      ],
      note: "Make the investor feel the pain. Data + story = compelling.",
    },
    {
      number: 3,
      title: "The Solution",
      bullets: [
        form.solution || "Explain how your product solves the problem",
        "Show a product screenshot or demo flow",
        "Highlight the key differentiator",
        "Why is your approach better than alternatives?",
      ],
      note: "Show, don't tell. A screenshot or demo GIF is worth 100 words.",
    },
    {
      number: 4,
      title: "Market Opportunity",
      bullets: [
        `Target market: ${form.target_market || "Define your ideal customer segment"}`,
        "TAM (Total Addressable Market): $__B",
        "SAM (Serviceable Available Market): $__M",
        "SOM (Serviceable Obtainable Market): $__M",
      ],
      note: "Bottom-up sizing is more credible than top-down. Show your math.",
    },
    {
      number: 5,
      title: "Business Model",
      bullets: [
        form.business_model || "How you make money",
        "Pricing tiers or unit economics",
        "Average contract value / ARPU",
        "LTV:CAC ratio (target: >3:1)",
      ],
      note: "Investors want to see you understand unit economics.",
    },
    {
      number: 6,
      title: "Traction & Milestones",
      bullets: [
        form.traction || "Users, revenue, growth metrics",
        "Key milestones achieved",
        "Month-over-month growth rate",
        "Notable customers or partnerships",
      ],
      note: "This is your proof. Show hockey-stick growth if you have it.",
    },
    {
      number: 7,
      title: "Go-to-Market Strategy",
      bullets: [
        "Primary acquisition channels",
        "Sales motion (self-serve, inside sales, enterprise)",
        "Marketing strategy and budget",
        "Partnership or distribution advantages",
      ],
      note: "Show you have a repeatable, scalable way to get customers.",
    },
    {
      number: 8,
      title: "Competitive Landscape",
      bullets: [
        "Key competitors and alternatives",
        "Your competitive advantages",
        "Barriers to entry / moat",
        "Position on a 2x2 matrix (optional)",
      ],
      note: "Never say you have no competition. Show you understand the landscape.",
    },
    {
      number: 9,
      title: "Team",
      bullets: [
        "Founders and key hires",
        "Relevant experience and domain expertise",
        "Key advisors or board members",
        "What makes this team uniquely qualified?",
      ],
      note: "Highlight why YOUR team is the one to build this.",
    },
    {
      number: 10,
      title: "Financial Projections",
      bullets: [
        "3-year revenue projections",
        "Path to profitability",
        "Key assumptions behind the numbers",
        "Current burn rate and runway",
      ],
      note: "Be realistic but ambitious. Show you understand your numbers.",
    },
    {
      number: 11,
      title: "The Ask",
      bullets: [
        form.funding_ask ? `Raising: ${form.funding_ask}` : "Amount you're raising",
        "Use of funds breakdown",
        "Key milestones this funding enables",
        "Expected runway with this raise",
      ],
      note: "Be specific about how you'll use the money and what you'll achieve.",
    },
    {
      number: 12,
      title: "Thank You",
      bullets: [
        form.company_name,
        "Contact email and phone",
        "Website URL",
        "Call to action: schedule a follow-up meeting",
      ],
      note: "End strong. Make it easy for interested investors to reach you.",
    },
  ];
}

export default function PitchOutlinePage() {
  usePageTitle("Pitch Deck Outline Creator");
  const [form, setForm] = useState({
    company_name: "", industry: "", problem: "", solution: "",
    target_market: "", business_model: "", traction: "", funding_ask: "",
  });
  const [slides, setSlides] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const generate = useCallback((e) => {
    e.preventDefault();
    setSlides(buildOutline(form));
  }, [form]);

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
        <div className="ml-auto flex items-center gap-3"><ThemeToggle /></div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">Pitch Deck Outline Creator</h1>
        <p className="text-ink-soft mb-8">Instantly create a structured 12-slide pitch deck outline. No AI needed — works offline.</p>

        <form onSubmit={generate} className="panel space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="po-company" className="block text-sm font-medium mb-1">Company Name</label>
              <input id="po-company" value={form.company_name} onChange={update("company_name")} className="input-field" required />
            </div>
            <div>
              <label htmlFor="po-industry" className="block text-sm font-medium mb-1">Industry</label>
              <input id="po-industry" value={form.industry} onChange={update("industry")} className="input-field" placeholder="e.g. SaaS, FinTech" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Problem</label>
            <textarea value={form.problem} onChange={update("problem")} className="input-field h-20" placeholder="What problem are you solving?" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Solution</label>
            <textarea value={form.solution} onChange={update("solution")} className="input-field h-20" placeholder="How does your product solve it?" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Market</label>
            <input value={form.target_market} onChange={update("target_market")} className="input-field" placeholder="Who are your customers?" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Business Model</label>
            <input value={form.business_model} onChange={update("business_model")} className="input-field" placeholder="How do you make money?" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Traction (optional)</label>
              <input value={form.traction} onChange={update("traction")} className="input-field" placeholder="Users, revenue, growth" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Funding Ask (optional)</label>
              <input value={form.funding_ask} onChange={update("funding_ask")} className="input-field" placeholder="e.g. $2M Seed" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">Create Pitch Outline</button>
        </form>

        {slides && (
          <div className="mt-8 space-y-4" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">{form.company_name || "Your Startup"} — 12-Slide Outline</h2>
            {slides.map((slide) => (
              <div key={slide.number} className="panel">
                <div className="flex items-center gap-2 mb-2">
                  <span className="chip chip-neutral">Slide {slide.number}</span>
                  <h3 className="font-semibold text-ink-strong">{slide.title}</h3>
                </div>
                <ul className="list-disc list-inside text-sm text-ink-soft space-y-1 mb-3">
                  {slide.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <p className="text-xs text-ink-muted italic">Tip: {slide.note}</p>
              </div>
            ))}
            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out my ${slides.length}-slide pitch deck outline for ${form.company_name} on PitchCraft! https://pitch.doaide.com/tools/pitch-deck-outline`)}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just created my pitch deck outline with PitchCraft!`)}&url=${encodeURIComponent("https://pitch.doaide.com/tools/pitch-deck-outline")}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
