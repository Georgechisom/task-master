import { useState } from "react";
import { Heart, Mail, MessageCircle, Sparkles, Star } from "lucide-react";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSendMessage = () => {
    // Here you would typically send the message to a backend
    setIsSubmitted(true);
    alert(
      `Thank you for your message, ${name}! We'll get back to you soon! 💝`
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-icon-wrapper">
            <Heart className="contact-heart-icon" />
            <Sparkles className="contact-sparkle-icon contact-sparkle-1" />
            <Sparkles className="contact-sparkle-icon contact-sparkle-2" />
            <Sparkles className="contact-sparkle-icon contact-sparkle-3" />
          </div>
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-card">
              <Mail className="contact-info-icon" />
              <h3 className="contact-info-title">Email Us</h3>
              <p className="contact-info-text">
                Drop us an email and we'll get back to you within 24 hours!
              </p>
              <a
                href="mailto:hello@taskmaster.com"
                className="contact-info-link"
              >
                hello@taskmaster.com
              </a>
            </div>

            <div className="contact-info-card">
              <MessageCircle className="contact-info-icon" />
              <h3 className="contact-info-title">Live Chat</h3>
              <p className="contact-info-text">
                Chat with our friendly support team in real-time!
              </p>
              <button className="contact-info-button">Start Chat</button>
            </div>

            <div className="contact-info-card">
              <Star className="contact-info-icon" />
              <h3 className="contact-info-title">Feature Requests</h3>
              <p className="contact-info-text">
                Have an idea? We'd love to hear your suggestions!
              </p>
              <button className="contact-info-button">Share Idea</button>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send us a Message</h2>
                <p className="contact-form-subtitle">
                  Fill out the form below and we'll get back to you soon!
                </p>
              </div>

              <div className="contact-form-content">
                <div className="contact-form-group">
                  <label className="contact-form-label">Your Name</label>
                  <input
                    type="text"
                    className="contact-form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Email Address</label>
                  <input
                    type="email"
                    className="contact-form-input"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Message</label>
                  <textarea
                    className="contact-form-textarea"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  className="contact-form-button"
                  onClick={handleSendMessage}
                  disabled={!name || !email || !message}
                >
                  <Heart className="contact-button-icon" />
                  Send Message
                  <Sparkles className="contact-button-sparkle" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p className="contact-footer-text">
            Made with <Heart className="contact-footer-heart" /> for
            productivity enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
