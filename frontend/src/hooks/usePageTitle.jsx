import { createContext, useContext, useEffect, useState } from "react";

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
    document.title = pageTitle ? `${pageTitle} — DoAide | PitchCraft` : "DoAide | PitchCraft — AI Pitch Deck Generator";
  }, [pageTitle, ctx]);
  return ctx;
}
