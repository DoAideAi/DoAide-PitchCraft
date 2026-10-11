import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Startup valuation calculator",
      "Pitch deck outline generator",
      "3-year financial model builder",
      "Pitch readiness checker",
      "WhatsApp & Twitter sharing",
    ],
    cta: "Get Started Free",
    to: "/generator",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    features: [
      "Everything in Free",
      "Full AI-generated pitch decks",
      "PDF export",
      "Detailed financial charts",
      "Investor matching suggestions",
      "Priority AI processing",
    ],
    cta: "Upgrade to Pro",
    to: "#",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: [
      "Everything in Pro",
      "Custom branding on decks",
      "Team collaboration",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    to: "#",
    highlight: false,
  },
];

export default function PricingPage() {
  usePageTitle("Pricing");

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

      <main className="max-w-5xl mx-auto px-5 py-12">
        <h1 className="font-bold text-4xl text-center mb-3">Simple, Transparent Pricing</h1>
        <p className="text-center text-ink-soft mb-12 max-w-xl mx-auto">
          Start free with powerful tools. Upgrade when you need full AI pitch decks and advanced features.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className={`panel text-center flex flex-col ${p.highlight ? "border-brand ring-1 ring-brand" : ""}`}>
              {p.highlight && <div className="chip chip-warn mx-auto mb-3">Most Popular</div>}
              <h2 className="font-semibold text-xl mb-1">{p.name}</h2>
              <div className="text-4xl font-bold text-brand mb-1">
                {p.price}<span className="text-sm font-normal text-ink-soft">{p.period}</span>
              </div>
              <ul className="text-sm text-ink-soft space-y-2.5 my-6 text-left flex-1">
                {p.features.map((f) => <li key={f}>✓ {f}</li>)}
              </ul>
              <Link to={p.to} className={`btn w-full ${p.highlight ? "btn-primary" : "btn-ghost"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
