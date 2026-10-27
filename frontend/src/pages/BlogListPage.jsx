import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { BLOG_INDEX } from "../content/blogPosts";

export default function BlogListPage() {
  usePageTitle("Blog");

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
        <h1 className="text-3xl font-bold mb-8">PitchCraft Blog</h1>
        <div className="space-y-6">
          {BLOG_INDEX.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="panel block group hover:border-brand transition-colors">
              <h2 className="font-semibold text-lg text-ink-strong group-hover:text-brand transition-colors mb-2">{post.title}</h2>
              <p className="text-sm text-ink-soft mb-3">{post.excerpt}</p>
              <div className="flex gap-4 text-xs text-ink-muted">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export { BLOG_INDEX };
