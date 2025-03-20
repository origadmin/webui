import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TablerIcon } from "@/components/IconPicker/index";
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
      className='size-8 bg-muted relative rounded-full'
      aria-label={theme === "light" ? "switch to dark mode" : "switch to light mode"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className='relative flex shrink-0 overflow-hidden rounded-full'>
        {theme === "light" ? <TablerIcon name='moon' /> : <TablerIcon name='sun' />}
      </span>
    </Button>
  );
}
