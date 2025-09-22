import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-title">Organize Your Life with TaskMaster</h1>
          <p className="landing-subtitle">
            The ultimate tool to manage your tasks, boost your productivity, and
            achieve your goals. All in one place.
          </p>
          <Link to="/tasks">
            <button className="landing-cta-button">Get Started</button>
          </Link>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features-container">
          <h2 className="landing-features-title">Features</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-header">
                <h3 className="landing-feature-title">
                  <CheckCircle className="landing-feature-icon" />
                  Real-Time Sync
                </h3>
              </div>
              <div className="landing-feature-description">
                <p>
                  Keep your tasks updated across all your devices in real-time.
                </p>
              </div>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-header">
                <h3 className="landing-feature-title">
                  <CheckCircle className="landing-feature-icon" />
                  Team Collaboration
                </h3>
              </div>
              <div className="landing-feature-description">
                <p>
                  Work together with your team, assign tasks, and track
                  progress.
                </p>
              </div>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-header">
                <h3 className="landing-feature-title">
                  <CheckCircle className="landing-feature-icon" />
                  Beautiful & Intuitive UI
                </h3>
              </div>
              <div className="landing-feature-description">
                <p>
                  A stunning and easy-to-use interface designed for
                  productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
