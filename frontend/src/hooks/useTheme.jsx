import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getInitial() {
  try {
    const stored = localStorage.getItem("pitchcraft_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("pitchcraft_theme", theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
