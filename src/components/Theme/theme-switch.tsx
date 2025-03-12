import { useEffect } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [theme]);

  return (
    <Button
      size='icon'
      variant='ghost'
      className='rounded-full'
      aria-label={theme === "light" ? "switch to dark mode" : "switch to light mode"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
    </Button>
  );
}
