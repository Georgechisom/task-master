import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [lightMode, setLightMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    if (theme === "light") {
      console.log("dark");
      setTheme("dark");
      setDarkMode(true);
      setLightMode(false);
    } else if (theme === "dark") {
      setTheme("light");
      setDarkMode(false);
      setLightMode(true);
    } else {
      // If system theme, toggle to opposite of system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TaskMaster
        </Link>

        <nav className="navbar-nav">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="theme-toggle"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Moon
              className={theme === "dark" && darkMode ? "flex" : "offLight"}
            />
          </Button> */}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="theme-toggle"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Sun
              className={theme === "dark" && lightMode ? "flex" : "offDark"}
            />
          </Button>

          {!user ? (
            <div className="navbar-auth-buttons">
              <Link to="/auth">
                <Button variant="ghost" className="navbar-login-button">
                  <LogIn className="navbar-button-icon" />
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="navbar-signup-button">
                  <UserPlus className="navbar-button-icon" />
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="navbar-user-section">
              <span className="navbar-user-greeting">
                Welcome, {user.user_metadata?.full_name || user.email}
              </span>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu-button"
              >
                <Menu className="mobile-menu-icon" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-nav">
              <nav className="mobile-nav-content">
                <Link to="/">Home</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/about">About</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/contact">Contact</Link>
                {!user && (
                  <>
                    <Link to="/auth">Login</Link>
                    <Link to="/auth">Sign Up</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
