"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = ({
  acessibilityText,
}: {
  acessibilityText: string;
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, isMounted] = React.useState(false);

  React.useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) return <button disabled={true}></button>;

  const dark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="hover:cursor-pointer bg-transparent text-foreground w-fit p-0 text-xl"
    >
      {dark ? (
        <Sun className="hover:text-amber-400 bg-transparent" />
      ) : (
        <Moon className="hover:text-purple-400 bg-transparent" />
      )}
      <span className="sr-only">{acessibilityText}</span>
    </button>
  );
};
