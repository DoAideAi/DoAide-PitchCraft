import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

const STYLES = {
  primary: {
    label: "Primary (Teal)",
    base: "display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:8px;font-family:system-ui,sans-serif;font-weight:600;font-size:14px;text-decoration:none;cursor:pointer;border:none;",
    normal: "background:#0D9488;color:#fff;",
  },
  outline: {
    label: "Outline",
    base: "display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:8px;font-family:system-ui,sans-serif;font-weight:600;font-size:14px;text-decoration:none;cursor:pointer;",
    normal: "background:transparent;color:#0D9488;border:2px solid #0D9488;",
  },
  minimal: {
    label: "Minimal",
    base: "display:inline-flex;align-items:center;gap:6px;font-family:system-ui,sans-serif;font-weight:600;font-size:14px;text-decoration:none;cursor:pointer;border:none;background:transparent;padding:8px 0;",
    normal: "color:#0D9488;",
  },
};

export default function EmbedPage() {
  usePageTitle("Embed Widget");
  const [buttonText, setButtonText] = useState("Try DoAide PitchCraft Free");
  const [style, setStyle] = useState("primary");
  const [tool, setTool] = useState("generator");
  const [copied, setCopied] = useState("");

  const inlineStyle = STYLES[style].base + STYLES[style].normal;
  const embedCode = `<a href="https://pitch.doaide.com/${tool}" target="_blank" rel="noopener" style="${inlineStyle}">${buttonText}</a>`;
  const iframeCode = `<iframe src="https://pitch.doaide.com/${tool}?embed=1" width="100%" height="600" frameborder="0" style="border:1px solid #e5e5e5;border-radius:8px;"></iframe>`;

  const copyToClipboard = useCallback(async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch {}
  }, []);

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
        <h1 className="text-3xl font-bold mb-2">Embed PitchCraft Widget</h1>
        <p className="text-ink-soft mb-8">Add DoAide PitchCraft tools to your website or blog.</p>

        <div className="panel space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tool to Embed</label>
            <select value={tool} onChange={(e) => setTool(e.target.value)} className="input-field">
              <option value="generator">Pitch Deck Generator</option>
              <option value="valuation">Valuation Calculator</option>
              <option value="model">Financial Model</option>
              <option value="checker">Readiness Checker</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Button Text</label>
            <input value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="input-field">
              {Object.entries(STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preview</label>
            <div className="panel !bg-canvas text-center py-6">
              <span dangerouslySetInnerHTML={{ __html: `<a href="#" style="${inlineStyle}">${buttonText}</a>` }} />
            </div>
          </div>
        </div>

        <div className="panel mt-6">
          <h2 className="font-semibold mb-2">Button Embed Code</h2>
          <pre className="text-xs bg-canvas p-3 rounded overflow-x-auto font-mono text-ink-soft">{embedCode}</pre>
          <button onClick={() => copyToClipboard(embedCode, "button")} className="btn btn-ghost mt-2 text-sm">
            {copied === "button" ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div className="panel mt-4">
          <h2 className="font-semibold mb-2">iFrame Embed Code</h2>
          <pre className="text-xs bg-canvas p-3 rounded overflow-x-auto font-mono text-ink-soft">{iframeCode}</pre>
          <button onClick={() => copyToClipboard(iframeCode, "iframe")} className="btn btn-ghost mt-2 text-sm">
            {copied === "iframe" ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </main>
    </div>
  );
}
