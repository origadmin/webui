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
      variant='ghost'
      className='size-8 bg-muted relative rounded-full flex items-center justify-center'
      aria-label={theme === "light" ? "switch to dark mode" : "switch to light mode"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <TablerIcon name='moon' /> : <TablerIcon name='sun' />}
    </Button>
  );
}
