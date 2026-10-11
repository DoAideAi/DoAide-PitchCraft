import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const PAGES = [
  { section: "Tools", links: [
    { to: "/tools/valuation-calculator", label: "Startup Valuation Calculator" },
    { to: "/generator", label: "AI Pitch Deck Generator" },
    { to: "/model", label: "Financial Model Builder" },
    { to: "/tools/burn-rate-calculator", label: "Burn Rate Calculator" },
    { to: "/tools/investor-readiness-quiz", label: "Investor Readiness Quiz" },
    { to: "/tools/elevator-pitch-generator", label: "Elevator Pitch Generator" },
    { to: "/tools/investor-qa-prep", label: "Investor Q&A Prep" },
    { to: "/tools/pitch-deck-outline", label: "Pitch Deck Outline Creator" },
  ]},
  { section: "Resources", links: [
    { to: "/blog", label: "Blog" },
    { to: "/blog/perfect-elevator-pitch-formula", label: "The Perfect Elevator Pitch Formula" },
    { to: "/blog/top-investor-questions-startup-founders", label: "Top Investor Questions for Founders" },
    { to: "/blog/pitch-deck-mistakes-to-avoid", label: "Pitch Deck Mistakes to Avoid" },
    { to: "/blog/how-to-create-winning-pitch-deck", label: "How to Create a Winning Pitch Deck" },
    { to: "/blog/startup-valuation-methods-explained", label: "Startup Valuation Methods Explained" },
    { to: "/blog/financial-model-first-time-founders", label: "Building Your First Financial Model" },
  ]},
  { section: "Product", links: [
    { to: "/pricing", label: "Pricing" },
    { to: "/embed", label: "Embed Widget" },
    { to: "/sitemap", label: "Sitemap" },
  ]},
];

export default function SitemapPage() {
  usePageTitle("Sitemap");

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
        <h1 className="font-bold text-3xl mb-8">Sitemap</h1>
        <div className="grid sm:grid-cols-3 gap-8">
          {PAGES.map((section) => (
            <div key={section.section}>
              <h2 className="font-semibold text-ink-strong mb-3">{section.section}</h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-ink-soft hover:text-brand transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
