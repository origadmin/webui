import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import type { Theme } from "./theme-provider";

export type ThemeToggleProps = {
  items?: {
    label: string;
    value: Theme;
  }[];
};

export default function ThemeToggle(props: ThemeToggleProps) {
  const {
    items = [
      {
        label: "Dark",
        value: "dark",
      },
      {
        label: "Light",
        value: "light",
      },
      {
        label: "System",
        value: "system",
      },
    ],
  } = props;
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='relative size-8 rounded-full'>
          <IconSun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <IconMoon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {items.map((item) => (
          <DropdownMenuItem key={item.value} onClick={() => setTheme(item.value)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
