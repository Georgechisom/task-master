import { useState } from "react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await signUp(email, password, name);
      navigate("/tasks");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab-trigger ${
              activeTab === "login" ? "active" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab-trigger ${
              activeTab === "signup" ? "active" : ""
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div
          className={`auth-tab-content ${
            activeTab === "login" ? "active" : ""
          }`}
        >
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">Login</h2>
            </div>
            <form className="auth-form">
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
              <button
                type="button"
                className="auth-button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className="auth-button-outline"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Github style={{ width: "16px", height: "16px" }} />
                Login with Google
              </button>
              <div className="auth-forgot-password">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`auth-tab-content ${
            activeTab === "signup" ? "active" : ""
          }`}
        >
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">Signup</h2>
            </div>
            <form className="auth-form">
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="signup-name">
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="signup-email">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
              <button
                type="button"
                className="auth-button"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
              <button
                type="button"
                className="auth-button-outline"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Github style={{ width: "16px", height: "16px" }} />
                Sign up with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
