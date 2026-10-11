import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

function shareUrl(outline) {
  const text = `Just generated a ${outline.total_slides}-slide pitch deck for ${outline.company_name} with PitchCraft! Try it free:`;
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " https://pitch.doaide.com/generator")}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://pitch.doaide.com/generator")}`,
  };
}

export default function GeneratorPage() {
  usePageTitle("Pitch Deck Generator");
  const [form, setForm] = useState({
    company_name: "", industry: "", problem: "", solution: "",
    target_market: "", business_model: "", traction: "", funding_ask: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const generate = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api.generateOutline(form);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
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
        <h1 className="font-bold text-3xl mb-2">AI Pitch Deck Generator</h1>
        <p className="text-ink-soft mb-8">Enter your startup details and our AI will generate a slide-by-slide outline.</p>

        <form onSubmit={generate} className="panel space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input value={form.company_name} onChange={update("company_name")} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input value={form.industry} onChange={update("industry")} className="input-field" placeholder="e.g. SaaS, FinTech" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Problem</label>
            <textarea value={form.problem} onChange={update("problem")} className="input-field h-20" placeholder="What problem are you solving?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Solution</label>
            <textarea value={form.solution} onChange={update("solution")} className="input-field h-20" placeholder="How does your product solve it?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Market</label>
            <input value={form.target_market} onChange={update("target_market")} className="input-field" placeholder="Who are your customers?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Business Model</label>
            <input value={form.business_model} onChange={update("business_model")} className="input-field" placeholder="How do you make money?" required />
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
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? <><span className="spinner" /> Generating with AI...</> : "Generate Pitch Outline"}
          </button>
        </form>

        {error && <p className="text-bad text-sm mt-4">{error}</p>}

        {result && (
          <div className="mt-8 space-y-4" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">{result.company_name} — {result.total_slides} Slides</h2>
            {result.slides.map((slide) => (
              <div key={slide.slide_number} className="panel">
                <div className="flex items-center gap-2 mb-2">
                  <span className="chip chip-neutral">Slide {slide.slide_number}</span>
                  <h3 className="font-semibold text-ink-strong">{slide.title}</h3>
                </div>
                <ul className="list-disc list-inside text-sm text-ink-soft space-y-1 mb-3">
                  {slide.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <details className="text-xs text-ink-muted">
                  <summary className="cursor-pointer hover:text-brand">Speaker notes</summary>
                  <p className="mt-1">{slide.speaker_notes}</p>
                </details>
              </div>
            ))}
            <div className="flex gap-3">
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
