import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

const STAGES = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B+" },
];

const CATEGORY_COLORS = {
  Market: "chip-neutral",
  Competition: "chip-warn",
  Financials: "chip-good",
  Product: "chip-neutral",
  Team: "chip-neutral",
  Traction: "chip-good",
  Risk: "chip-bad",
};

export default function InvestorQAPage() {
  usePageTitle("Investor Q&A Prep");
  const [form, setForm] = useState({
    company_name: "", industry: "", stage: "seed", problem: "",
    solution: "", business_model: "", traction: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (i) => setExpanded((ex) => ({ ...ex, [i]: !ex[i] }));

  const generate = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api.generateInvestorQA(form);
      setResult(data);
      setExpanded({});
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [form]);

  const shareText = result
    ? `Prepped for ${result.questions.length} tough investor questions for ${result.company_name} with PitchCraft! Try it free:`
    : "";

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
        <h1 className="font-bold text-3xl mb-2">Investor Q&A Prep</h1>
        <p className="text-ink-soft mb-8">AI generates tough investor questions with suggested answers tailored to your startup.</p>

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
            <label className="block text-sm font-medium mb-1">Funding Stage</label>
            <select value={form.stage} onChange={update("stage")} className="input-field">
              {STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
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
            <label className="block text-sm font-medium mb-1">Business Model</label>
            <input value={form.business_model} onChange={update("business_model")} className="input-field" placeholder="How do you make money?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Traction (optional)</label>
            <input value={form.traction} onChange={update("traction")} className="input-field" placeholder="Users, revenue, growth" />
          </div>
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? <><span className="spinner" /> Generating questions...</> : "Generate Investor Q&A"}
          </button>
        </form>

        {error && <p className="text-bad text-sm mt-4">{error}</p>}

        {result && (
          <div className="mt-8 space-y-4" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">{result.company_name} — Investor Q&A</h2>

            {result.questions.map((qa, i) => (
              <div key={i} className="panel">
                <button onClick={() => toggle(i)} className="w-full text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-brand font-bold mt-0.5">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`chip ${CATEGORY_COLORS[qa.category] || "chip-neutral"}`}>{qa.category}</span>
                      </div>
                      <p className="font-medium text-ink-strong">{qa.question}</p>
                    </div>
                    <span className="text-ink-muted text-lg shrink-0">{expanded[i] ? "−" : "+"}</span>
                  </div>
                </button>
                {expanded[i] && (
                  <div className="mt-3 pl-7 border-l-2 border-brand/30">
                    <p className="text-sm text-ink-soft leading-relaxed">{qa.answer}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " https://pitch.doaide.com/tools/investor-qa-prep")}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://pitch.doaide.com/tools/investor-qa-prep")}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
