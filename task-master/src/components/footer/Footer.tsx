import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p>TaskMaster</p>
        </div>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="#">Privacy Policy</Link>
        </nav>
        <div className="footer-social">
          <a href="#" aria-label="GitHub">
            <Github />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin />
          </a>
        </div>
        <div className="footer-reserved">
          <p>© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
