"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./Button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, isMounted] = React.useState(false);

  React.useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted)
    return <Button variant="secondary" size="icon" disabled={true}></Button>;

  const dark = theme === "dark";
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
};
