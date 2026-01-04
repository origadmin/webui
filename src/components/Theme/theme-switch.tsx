import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TablerIcon } from "@/components/IconPicker/index";
import { useTheme } from "./theme-provider";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [theme]);

  return (
    <Button
      size="icon"
      variant='ghost'
      className='size-8 p-0 bg-muted relative rounded-full'
      aria-label={theme === "light" ? "switch to dark mode" : "switch to light mode"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className='relative flex shrink-0 overflow-hidden rounded-full items-center justify-center'>
        {theme === "light" ? <TablerIcon name='moon' /> : <TablerIcon name='sun' />}
      </span>
    </Button>
  );
}
