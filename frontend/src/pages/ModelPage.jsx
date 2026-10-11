import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";

function fmt(n) {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function ModelPage() {
  usePageTitle("Financial Model Builder");
  const [form, setForm] = useState({
    monthly_revenue: "", monthly_growth_rate: "", cogs_percent: "",
    operating_expenses: "", opex_growth_rate: "", headcount: "", avg_salary: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const build = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await api.projectFinancials({
        monthly_revenue: parseFloat(form.monthly_revenue) || 0,
        monthly_growth_rate: parseFloat(form.monthly_growth_rate) || 0,
        cogs_percent: parseFloat(form.cogs_percent) || 0,
        operating_expenses: parseFloat(form.operating_expenses) || 0,
        opex_growth_rate: parseFloat(form.opex_growth_rate) || 0,
        headcount: parseInt(form.headcount) || 0,
        avg_salary: parseFloat(form.avg_salary) || 0,
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [form]);

  const shareText = result
    ? `My 3-year revenue projection: Y1 ${fmt(result.summary.year_1_revenue)} → Y3 ${fmt(result.summary.year_3_revenue)}. Built with PitchCraft:`
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

      <main className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">Financial Model Builder</h1>
        <p className="text-ink-soft mb-8">Enter revenue assumptions and costs to generate a 3-year P&L projection.</p>

        <form onSubmit={build} className="panel space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Revenue ($)</label>
              <input type="number" value={form.monthly_revenue} onChange={update("monthly_revenue")} className="input-field" placeholder="e.g. 10000" required min="0" step="any" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Growth Rate (%)</label>
              <input type="number" value={form.monthly_growth_rate} onChange={update("monthly_growth_rate")} className="input-field" placeholder="e.g. 10" required min="0" max="100" step="any" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">COGS (%)</label>
              <input type="number" value={form.cogs_percent} onChange={update("cogs_percent")} className="input-field" placeholder="e.g. 30" required min="0" max="100" step="any" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Operating Expenses ($/mo)</label>
              <input type="number" value={form.operating_expenses} onChange={update("operating_expenses")} className="input-field" placeholder="e.g. 5000" required min="0" step="any" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">OpEx Growth Rate (%/year)</label>
              <input type="number" value={form.opex_growth_rate} onChange={update("opex_growth_rate")} className="input-field" placeholder="e.g. 15" min="0" max="100" step="any" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Headcount</label>
              <input type="number" value={form.headcount} onChange={update("headcount")} className="input-field" placeholder="e.g. 5" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avg Monthly Salary ($)</label>
              <input type="number" value={form.avg_salary} onChange={update("avg_salary")} className="input-field" placeholder="e.g. 8000" min="0" step="any" />
            </div>
          </div>
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? <span className="spinner" /> : "Build Financial Model"}
          </button>
        </form>

        {error && <p className="text-bad text-sm mt-4">{error}</p>}

        {result && (
          <div className="mt-8 space-y-6" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">3-Year Summary</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Year 1 Revenue", val: result.summary.year_1_revenue, tone: "brand" },
                { label: "Year 2 Revenue", val: result.summary.year_2_revenue, tone: "brand" },
                { label: "Year 3 Revenue", val: result.summary.year_3_revenue, tone: "brand" },
                { label: "Year 1 Net Income", val: result.summary.year_1_net_income, tone: result.summary.year_1_net_income >= 0 ? "good" : "bad" },
                { label: "Year 2 Net Income", val: result.summary.year_2_net_income, tone: result.summary.year_2_net_income >= 0 ? "good" : "bad" },
                { label: "Year 3 Net Income", val: result.summary.year_3_net_income, tone: result.summary.year_3_net_income >= 0 ? "good" : "bad" },
              ].map((s) => (
                <div key={s.label} className="panel !p-4" style={{ borderLeft: `3px solid var(--${s.tone})` }}>
                  <div className="text-xs text-ink-soft uppercase">{s.label}</div>
                  <div className="text-xl font-bold">{fmt(s.val)}</div>
                </div>
              ))}
            </div>
            {result.summary.break_even_month && (
              <p className="text-good font-semibold">Break-even at month {result.summary.break_even_month}</p>
            )}

            <div className="overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th>Month</th><th>Revenue</th><th>COGS</th><th>Gross Profit</th><th>OpEx</th><th>Payroll</th><th>Net Income</th><th>Cash</th>
                  </tr>
                </thead>
                <tbody>
                  {result.projections.filter((_, i) => i % 3 === 0).map((p) => (
                    <tr key={p.month}>
                      <td>{p.month}</td>
                      <td>{fmt(p.revenue)}</td>
                      <td>{fmt(p.cogs)}</td>
                      <td>{fmt(p.gross_profit)}</td>
                      <td>{fmt(p.operating_expenses)}</td>
                      <td>{fmt(p.payroll)}</td>
                      <td className={p.net_income >= 0 ? "text-good" : "text-bad"}>{fmt(p.net_income)}</td>
                      <td className={p.cumulative_cash >= 0 ? "text-good" : "text-bad"}>{fmt(p.cumulative_cash)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " https://pitch.doaide.com/model")}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://pitch.doaide.com/model")}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
