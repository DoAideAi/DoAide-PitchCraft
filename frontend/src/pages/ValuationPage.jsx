import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

const INDUSTRIES = [
  { key: "saas", label: "SaaS / Software" },
  { key: "fintech", label: "Fintech" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "marketplace", label: "Marketplace" },
  { key: "healthtech", label: "HealthTech" },
  { key: "edtech", label: "EdTech" },
  { key: "cleantech", label: "CleanTech" },
  { key: "biotech", label: "Biotech" },
  { key: "hardware", label: "Hardware" },
  { key: "media", label: "Media / Entertainment" },
  { key: "other", label: "Other" },
];

function fmt(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function shareUrl(result) {
  const text = `My startup valuation estimate: ${fmt(result.pre_money_valuation)} (${result.multiple_used}x ${result.industry} multiple). Try PitchCraft free:`;
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " https://pitch.doaide.com/valuation")}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://pitch.doaide.com/valuation")}`,
  };
}

export default function ValuationPage() {
  usePageTitle("Startup Valuation Calculator");
  const [revenue, setRevenue] = useState("");
  const [growth, setGrowth] = useState("");
  const [industry, setIndustry] = useState("saas");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const calculate = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api.calculateValuation({
        annual_revenue: parseFloat(revenue),
        growth_rate: parseFloat(growth),
        industry,
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [revenue, growth, industry]);

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
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">Startup Valuation Calculator</h1>
        <p className="text-ink-soft mb-8">Estimate your pre-money valuation using revenue multiples by industry.</p>

        <form onSubmit={calculate} className="panel space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Annual Revenue ($)</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="input-field" placeholder="e.g. 500000" required min="1" step="any" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Annual Growth Rate (%)</label>
            <input type="number" value={growth} onChange={(e) => setGrowth(e.target.value)} className="input-field" placeholder="e.g. 50" required min="0" max="1000" step="any" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="input-field">
              {INDUSTRIES.map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}
            </select>
          </div>
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? <span className="spinner" /> : "Calculate Valuation"}
          </button>
        </form>

        {error && <p className="text-bad text-sm mt-4">{error}</p>}

        {result && (
          <div className="panel mt-6" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl mb-4">Valuation Estimate</h2>
            <div className="text-4xl font-bold text-brand mb-2">{fmt(result.pre_money_valuation)}</div>
            <p className="text-ink-soft mb-4">Pre-money valuation ({result.method})</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="panel !p-3">
                <div className="text-ink-soft">Industry</div>
                <div className="font-semibold">{result.industry}</div>
              </div>
              <div className="panel !p-3">
                <div className="text-ink-soft">Revenue Multiple</div>
                <div className="font-semibold">{result.multiple_used}x</div>
              </div>
              <div className="panel !p-3">
                <div className="text-ink-soft">Base Multiple</div>
                <div className="font-semibold">{result.breakdown.base_industry_multiple}x</div>
              </div>
              <div className="panel !p-3">
                <div className="text-ink-soft">Growth Premium</div>
                <div className="font-semibold">{result.breakdown.growth_premium}x</div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a href={shareUrl(result).whatsapp} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={shareUrl(result).twitter} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
