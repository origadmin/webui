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

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    // Apply the theme
    const applyTheme = (themeToApply: Theme) => {
      root.classList.remove("dark");
      body.classList.remove("light-mode", "dark-mode");

      let effectiveTheme = themeToApply;
      if (themeToApply === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }

      if (effectiveTheme === "dark") {
        root.classList.add("dark");
        body.classList.add("dark-mode");
      } else {
        body.classList.add("light-mode");
      }
    };

    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      const body = document.body;
      body.classList.add("no-transition");
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
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
