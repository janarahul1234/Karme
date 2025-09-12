import { useId } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/context/themeContext";
import { Theme } from "@/constants";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const id = useId();

  return (
    <div>
      <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={theme === Theme.LIGHT}
          onCheckedChange={toggleTheme}
          className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full cursor-pointer"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-7 items-center justify-center text-center">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-7 items-center justify-center text-center">
          <SunIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
};

export default ThemeToggle;
