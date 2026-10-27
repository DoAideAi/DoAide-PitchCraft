import { createContext, useContext, useEffect, useState } from "react";
import { metaForPath } from "../routeMeta";

const PageTitleContext = createContext(null);

export function PageTitleProvider({ children }) {
  const [title, setTitle] = useState(null);
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle(pageTitle) {
  const ctx = useContext(PageTitleContext);
  useEffect(() => {
    if (ctx) ctx.setTitle(pageTitle);
    // Public routes get their SEO title from routeMeta via useSEO.
    if (metaForPath(window.location.pathname.replace(/\/+$/, "") || "/")) return;
    document.title = pageTitle ? `${pageTitle} — DoAide | PitchCraft` : "DoAide | PitchCraft — AI Pitch Deck Generator";
  }, [pageTitle, ctx]);
  return ctx;
}
