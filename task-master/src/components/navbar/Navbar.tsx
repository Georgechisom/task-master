import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import "./navbar.css";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const handleTasksClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please log in to access your tasks");
      navigate("/auth");
    }
  };

  const openNav = () => {
    console.log("hello");
    setDisplay(!display);
  };
  const closeNav = () => {
    setDisplay(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            TaskMaster
          </Link>

          <nav className="navbar-nav">
            <Link to="/">Home</Link>
            <Link to="/tasks" onClick={handleTasksClick}>
              Tasks
            </Link>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="navbar-actions">
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

            <Button className="mobile-menu-button" onClick={openNav}>
              <Menu className="mobile-menu-icon" />
            </Button>
          </div>
        </div>
      </nav>
      <div>
        <div
          className={display ? "mobile-nav-content1" : "mobile-nav-content2"}
        >
          <Button className="mobile-close-button" onClick={closeNav}>
            x
          </Button>
          <div className="mobile-real-nav">
            <Link className="nvlink" to="/">
              Home
            </Link>
            <Link
              to="/tasks"
              onClick={(e) => {
                handleTasksClick(e);
                setDisplay(false);
              }}
              className="nvlink"
            >
              Tasks
            </Link>
            <Link
              to="/about"
              className="nvlink"
              onClick={() => setDisplay(false)}
            >
              About
            </Link>
            <Link
              to="/profile"
              className="nvlink"
              onClick={() => setDisplay(false)}
            >
              Profile
            </Link>
            <Link
              to="/contact"
              className="nvlink"
              onClick={() => setDisplay(false)}
            >
              Contact
            </Link>
            {!user && (
              <>
                <Link
                  to="/auth"
                  className="nvlink"
                  onClick={() => setDisplay(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="nvlink"
                  onClick={() => setDisplay(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
