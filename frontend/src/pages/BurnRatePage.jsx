import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";

function fmt(n) {
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function calculate(cashBalance, monthlyRevenue, monthlyExpenses) {
  const netBurn = monthlyExpenses - monthlyRevenue;
  const grossBurn = monthlyExpenses;
  const runway = netBurn > 0 ? cashBalance / netBurn : null;
  const defaultRunway = netBurn <= 0;

  const projections = [];
  let remaining = cashBalance;
  for (let month = 0; month <= 36 && remaining > 0; month++) {
    projections.push({ month, cash: Math.round(remaining * 100) / 100 });
    remaining -= netBurn;
  }

  return {
    gross_burn: grossBurn,
    net_burn: netBurn,
    runway_months: runway !== null ? Math.round(runway * 10) / 10 : null,
    default_runway: defaultRunway,
    projections,
  };
}

export default function BurnRatePage() {
  usePageTitle("Burn Rate Calculator");
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [result, setResult] = useState(null);

  const compute = useCallback((e) => {
    e.preventDefault();
    const r = calculate(
      parseFloat(cashBalance) || 0,
      parseFloat(monthlyRevenue) || 0,
      parseFloat(monthlyExpenses) || 0,
    );
    setResult(r);
  }, [cashBalance, monthlyRevenue, monthlyExpenses]);

  const runwayColor = result && !result.default_runway
    ? result.runway_months >= 18 ? "good" : result.runway_months >= 6 ? "warn" : "bad"
    : "good";

  const shareText = result
    ? result.default_runway
      ? `Our startup is cash-flow positive! Net burn: ${fmt(result.net_burn)}/mo. Check yours with PitchCraft:`
      : `Our startup runway: ${result.runway_months} months (net burn ${fmt(result.net_burn)}/mo). Check yours with PitchCraft:`
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
        <h1 className="font-bold text-3xl mb-2">Burn Rate Calculator</h1>
        <p className="text-ink-soft mb-8">Enter your cash balance and monthly costs to see how long your runway lasts.</p>

        <form onSubmit={compute} className="panel space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cash Balance ($)</label>
            <input type="number" value={cashBalance} onChange={(e) => setCashBalance(e.target.value)} className="input-field" placeholder="e.g. 500000" required min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Revenue ($)</label>
            <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} className="input-field" placeholder="e.g. 10000" required min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Expenses ($)</label>
            <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} className="input-field" placeholder="e.g. 40000" required min="0" step="any" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Calculate Burn Rate</button>
        </form>

        {result && (
          <div className="mt-8 space-y-6" style={{ animation: "fade-up 0.4s ease both" }}>
            <h2 className="font-bold text-2xl">Results</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="panel !p-4" style={{ borderLeft: "3px solid var(--brand)" }}>
                <div className="text-xs text-ink-soft uppercase">Gross Burn</div>
                <div className="text-xl font-bold">{fmt(result.gross_burn)}/mo</div>
              </div>
              <div className="panel !p-4" style={{ borderLeft: `3px solid var(--${result.net_burn <= 0 ? "good" : "bad"})` }}>
                <div className="text-xs text-ink-soft uppercase">Net Burn</div>
                <div className="text-xl font-bold">{fmt(result.net_burn)}/mo</div>
              </div>
              <div className="panel !p-4" style={{ borderLeft: `3px solid var(--${runwayColor})` }}>
                <div className="text-xs text-ink-soft uppercase">Runway</div>
                <div className={`text-xl font-bold text-${runwayColor}`}>
                  {result.default_runway ? "Infinite" : `${result.runway_months} months`}
                </div>
              </div>
            </div>

            {!result.default_runway && (
              <div className="panel">
                <h3 className="font-semibold mb-3">Cash Runway Projection</h3>
                <div className="overflow-x-auto">
                  <table className="table-base">
                    <thead>
                      <tr><th>Month</th><th>Remaining Cash</th></tr>
                    </thead>
                    <tbody>
                      {result.projections.filter((_, i) => i % 3 === 0 || i === result.projections.length - 1).map((p) => (
                        <tr key={p.month}>
                          <td>{p.month}</td>
                          <td className={p.cash > 0 ? "" : "text-bad"}>{fmt(p.cash)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!result.default_runway && result.runway_months < 6 && (
              <div className="panel border-l-4 border-[var(--bad)] !bg-[var(--bad)]/5">
                <p className="text-sm font-semibold text-bad">Warning: Less than 6 months of runway remaining. Consider fundraising or reducing expenses.</p>
              </div>
            )}

            <div className="flex gap-3">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " https://pitch.doaide.com/tools/burn-rate-calculator")}`} target="_blank" rel="noopener noreferrer" className="btn bg-whatsapp text-white flex-1">
                Share on WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://pitch.doaide.com/tools/burn-rate-calculator")}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                Share on Twitter
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
