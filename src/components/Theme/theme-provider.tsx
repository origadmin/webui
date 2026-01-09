import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  const applyTheme = (themeToApply: Theme) => {
    const root = window.document.documentElement;
    const body = window.document.body;

    // Clear previous theme classes from both html and body
    root.classList.remove("dark");
    body.classList.remove("light-mode", "dark-mode");

    let effectiveTheme = themeToApply;
    if (themeToApply === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (effectiveTheme === "dark") {
      root.classList.add("dark"); // For Tailwind's dark: selector
      body.classList.add("dark-mode");
    } else {
      body.classList.add("light-mode");
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      const body = document.body;

      // 1. Add class to disable transitions
      body.classList.add("no-transition");

      // 2. Update storage and state
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);

      // 3. Force re-apply theme logic immediately
      applyTheme(newTheme);

      // 4. Remove the transition-disabling class after a short delay
      setTimeout(() => {
        body.classList.remove("no-transition");
      }, 100);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
