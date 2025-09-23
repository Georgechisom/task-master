import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import "./mode-toggle.css";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`theme-toggle-button ${
        theme === "light" ? "light-mode" : "dark-mode"
      }`}
    >
      {/* Sun Icon - shows in light mode */}
      <Sun
        className={`theme-icon sun-icon ${
          theme === "light" ? "icon-visible" : "icon-hidden"
        }`}
      />

      {/* Moon Icon - shows in dark mode */}
      <Moon
        className={`theme-icon moon-icon ${
          theme === "dark" ? "icon-visible" : "icon-hidden"
        }`}
      />

      {/* <span className="sr-only">Toggle theme</span> */}
    </Button>
  );
}
