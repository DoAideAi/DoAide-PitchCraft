import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} className="btn btn-ghost text-xs px-3 py-1.5">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ElevatorPitchPage() {
  usePageTitle("Elevator Pitch Generator");
  const [form, setForm] = useState({
    company_name: "", problem: "", solution: "", target_audience: "", unique_value: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [activeTab, setActiveTab] = useState("30s");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const generate = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api.generateElevatorPitch(form);
      setResult(data);
      setActiveTab("30s");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [form]);

  const tabs = [
    { key: "30s", label: "30 seconds" },
    { key: "60s", label: "60 seconds" },
    { key: "90s", label: "90 seconds" },
  ];

  const shareText = result
    ? `Just created my elevator pitch for ${result.company_name} with PitchCraft! Try it free:`
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
        <h1 className="font-bold text-3xl mb-2">Elevator Pitch Generator</h1>
        <p className="text-ink-soft mb-8">AI generates 30/60/90-second elevator pitches tailored to your startup.</p>

        <form onSubmit={generate} className="panel space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input value={form.company_name} onChange={update("company_name")} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Problem You Solve</label>
            <textarea value={form.problem} onChange={update("problem")} className="input-field h-20" placeholder="What pain point does your startup address?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Solution</label>
            <textarea value={form.solution} onChange={update("solution")} className="input-field h-20" placeholder="How does your product solve it?" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Audience</label>
            <input value={form.target_audience} onChange={update("target_audience")} className="input-field" placeholder="e.g. SaaS founders, small businesses" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unique Value Proposition</label>
            <input value={form.unique_value} onChange={update("unique_value")} className="input-field" placeholder="What makes you different?" required />
          </div>
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? <><span className="spinner" /> Generating pitches...</> : "Generate Elevator Pitches"}
          </button>
        </form>

        {error && <p className="text-bad text-sm mt-4">{error}</p>}

        {result && (
          <div className="mt-8 space-y-4" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">{result.company_name} — Elevator Pitches</h2>

            <div className="flex gap-1 border-b border-line">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-brand text-brand" : "border-transparent text-ink-soft hover:text-ink"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="panel">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="chip chip-neutral">{activeTab} pitch</span>
                <CopyButton text={result.pitches[activeTab]} />
              </div>
              <p className="text-ink-soft leading-relaxed whitespace-pre-line">{result.pitches[activeTab]}</p>
            </div>

            {result.tips.length > 0 && (
              <div className="panel">
                <h3 className="font-semibold mb-3">Delivery Tips</h3>
                <ul className="text-sm text-ink-soft space-y-2">
                  {result.tips.map((tip, i) => <li key={i}>💡 {tip}</li>)}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " https://pitch.doaide.com/tools/elevator-pitch-generator")}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://pitch.doaide.com/tools/elevator-pitch-generator")}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
