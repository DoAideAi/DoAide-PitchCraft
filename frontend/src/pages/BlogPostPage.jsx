import { Link, useParams } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { BLOG_POSTS } from "../content/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS[slug];
  usePageTitle(post?.title || "Post Not Found");

  if (!post) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Link to="/blog" className="text-brand hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center max-w-3xl w-full mx-auto px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--da-brand)" />
            <text x="20" y="27" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="18" fill="#fff">PC</text>
          </svg>
          <span className="text-xl font-bold tracking-tight">DoAide <span className="text-brand">| PitchCraft</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/blog" className="text-sm text-ink-soft hover:text-brand">← Blog</Link>
          <ThemeToggle />
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="font-bold text-3xl mb-2">{post.title}</h1>
        <p className="text-sm text-ink-muted mb-8">{post.date}</p>
        <div className="space-y-4">
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="font-bold text-2xl mt-8 mb-2">{block.text}</h2>;
            if (block.type === "cta") return (
              <div key={i} className="panel text-center py-6 mt-8">
                <Link to={block.to} className="btn btn-primary text-base px-8">{block.text}</Link>
              </div>
            );
            return <p key={i} className="text-ink-soft leading-relaxed">{block.text}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
