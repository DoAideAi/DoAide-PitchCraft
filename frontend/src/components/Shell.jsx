import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";

export default function Shell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <header className="flex items-center max-w-7xl w-full mx-auto px-5 py-4 border-b border-line">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-xl font-bold tracking-tight">
            DoAide <span className="text-brand">| PitchCraft</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {user && <span className="text-sm text-ink-soft hidden sm:inline">{user.name}</span>}
          <ThemeToggle />
          {user && (
            <button onClick={handleLogout} className="btn btn-ghost text-sm">
              Sign out
            </button>
          )}
        </nav>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 py-6">
        {children}
      </main>
      <footer className="border-t border-line py-6">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-brand bg-[var(--da-glass-feature-bg)] border border-[var(--da-glass-feature-border)] px-2 py-0.5 rounded-full">A DoAide Product</span>
            <span className="text-sm text-ink-soft">© {new Date().getFullYear()} DoAide. All rights reserved.</span>
          </div>
          <div className="flex gap-4 text-sm text-ink-soft">
            <a href="https://doaide.com" className="hover:text-brand transition-colors">DoAide.com</a>
            <Link to="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <Link to="/sitemap" className="hover:text-brand transition-colors">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
