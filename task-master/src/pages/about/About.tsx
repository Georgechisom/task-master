import { useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import "./about.css";

const About = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Here you would typically send the message to a backend
    alert(`Message sent from ${name} with email ${email}:\n${message}`);
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-mission">
          <h1 className="about-title">Our Mission</h1>
          <p className="about-description">
            To simplify productivity and help individuals and teams achieve
            their goals with a seamless and intuitive task management
            experience.
          </p>
        </section>

        <section className="about-team">
          <h2 className="about-section-title">Meet the Team</h2>
          <div className="about-team-grid">
            <div className="about-team-card">
              <img
                src="https://avatars.githubusercontent.com/u/106883763?v=4"
                alt="Team Member"
                className="about-team-avatar"
              />
              <h3 className="about-team-name">George A.</h3>
              <p className="about-team-role">Software Engineer</p>
              <div className="about-team-social">
                <a href="#" className="about-social-link">
                  <Github />
                </a>
                <a href="#" className="about-social-link">
                  <Twitter />
                </a>
                <a href="#" className="about-social-link">
                  <Linkedin />
                </a>
              </div>
            </div>
            {/* Repeat for other team members */}
          </div>
        </section>

        <section className="about-contact">
          <div className="about-contact-card">
            <div className="about-contact-header">
              <h3 className="about-contact-title">Contact Us</h3>
            </div>
            <div className="about-contact-content">
              <input
                type="text"
                placeholder="Your Name"
                className="about-contact-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="about-contact-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Your Message"
                className="about-contact-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="about-contact-button"
                onClick={handleSendMessage}
              >
                Send Message
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
