import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";

const TOOLS = [
  { icon: "📊", title: "Valuation Calculator", desc: "Estimate your startup valuation", to: "/valuation" },
  { icon: "🎯", title: "Pitch Deck Generator", desc: "AI-generated slide outlines", to: "/generator" },
  { icon: "💰", title: "Financial Model", desc: "3-year P&L projections", to: "/model" },
  { icon: "✅", title: "Readiness Checker", desc: "Score your deck readiness", to: "/checker" },
];

export default function DashboardPage() {
  usePageTitle("Dashboard");
  const { user } = useAuth();

  return (
    <div>
      <h1 className="font-bold text-3xl mb-2">Welcome back, {user?.name}</h1>
      <p className="text-ink-soft mb-8">
        Plan: <span className="chip chip-good">{user?.plan?.toUpperCase()}</span>
      </p>

      <h2 className="font-semibold text-lg mb-4">Quick Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOLS.map((t) => (
          <Link key={t.to} to={t.to} className="panel hover:border-brand transition-colors group">
            <div className="text-3xl mb-2">{t.icon}</div>
            <h3 className="font-semibold group-hover:text-brand transition-colors">{t.title}</h3>
            <p className="text-sm text-ink-soft">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
