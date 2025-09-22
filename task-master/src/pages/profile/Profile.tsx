import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/components/theme-provider";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (data) {
      alert("Profile updated successfully!");
    }
    if (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a backend or local storage
    alert("Settings saved!");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="profile-avatar-image"
                />
              ) : (
                fullName?.charAt(0) || "U"
              )}
            </div>
            <h2 className="profile-name">{fullName || "User"}</h2>
          </div>
          <div className="profile-content">
            <div className="profile-field">
              <label className="profile-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <label className="profile-label">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="profile-input"
              />
            </div>
            <button className="profile-button" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
        </div>

        <div className="profile-settings-section">
          <h2 className="profile-section-title">Settings</h2>

          <div className="profile-settings-card">
            <h3
              className="profile-section-title"
              style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
            >
              Appearance
            </h3>
            <div className="profile-setting-item">
              <label className="profile-setting-label">Theme</label>
              <div className="profile-theme-buttons">
                <button
                  className={`profile-theme-button ${
                    theme === "light" ? "active" : ""
                  }`}
                  onClick={() => setTheme("light")}
                >
                  Light
                </button>
                <button
                  className={`profile-theme-button ${
                    theme === "dark" ? "active" : ""
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </button>
                <button
                  className={`profile-theme-button ${
                    theme === "system" ? "active" : ""
                  }`}
                  onClick={() => setTheme("system")}
                >
                  System
                </button>
              </div>
            </div>
          </div>

          <div className="profile-settings-card">
            <h3
              className="profile-section-title"
              style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
            >
              Notifications
            </h3>
            <div className="profile-setting-item">
              <label className="profile-setting-label">
                Email Notifications
              </label>
              <label className="profile-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="profile-slider"></span>
              </label>
            </div>
          </div>

          <button className="profile-save-button" onClick={handleSaveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
