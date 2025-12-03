import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Bookmark, Bell, Mail, Settings, Download, Calendar, LogOut } from "lucide-react";
import { mockResearch } from "../lib/mockData";
import styles from "../styles/pages.module.css";

export function UserProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("saved");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [newResearchAlerts, setNewResearchAlerts] = useState(true);

  // Mock saved research (in production, this would come from a database)
  const savedResearch = mockResearch.slice(0, 3);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileHeaderContent}>
          <div className={styles.profileAvatar}>
            <User size={48} />
          </div>
          <div>
            <h1 className={styles.profileName}>{user.name}</h1>
            <p className={styles.profileEmail}>{user.email}</p>
            <span className={styles.profileBadge}>Member since 2024</span>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutButtonProfile}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.profileTabs}>
        <button
          onClick={() => setActiveTab("saved")}
          className={`${styles.profileTab} ${activeTab === "saved" ? styles.profileTabActive : ""}`}
        >
          <Bookmark size={20} />
          Saved Research
        </button>
        <button
          onClick={() => setActiveTab("subscription")}
          className={`${styles.profileTab} ${activeTab === "subscription" ? styles.profileTabActive : ""}`}
        >
          <Bell size={20} />
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`${styles.profileTab} ${activeTab === "settings" ? styles.profileTabActive : ""}`}
        >
          <Settings size={20} />
          Settings
        </button>
      </div>

      {/* Content */}
      <div className={styles.profileContent}>
        {/* Saved Research Tab */}
        {activeTab === "saved" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Your Saved Research
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Access your bookmarked papers and download them anytime
              </p>
            </div>

            {savedResearch.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {savedResearch.map((research) => (
                  <div key={research.id} className={styles.savedResearchCard}>
                    <div style={{ flex: 1 }}>
                      <Link
                        to={`/research/${research.id}`}
                        style={{ color: "var(--deep-forest)", textDecoration: "none" }}
                      >
                        <h3 style={{ marginBottom: "0.5rem" }}>{research.title}</h3>
                      </Link>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                        {research.authors.join(", ")}
                      </p>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Calendar size={14} /> {research.year}
                        </span>
                        <span>{research.category}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className={styles.iconButton} title="Download">
                        <Download size={18} />
                      </button>
                      <button className={styles.iconButtonDanger} title="Remove">
                        <Bookmark size={18} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", background: "var(--light-gray-bg)", borderRadius: "0.75rem" }}>
                <Bookmark size={48} style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }} />
                <p style={{ color: "var(--text-secondary)" }}>
                  You haven't saved any research yet.
                </p>
                <Link to="/research" className={styles.primaryButton} style={{ marginTop: "1rem", display: "inline-flex" }}>
                  Browse Research
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Manage Subscriptions
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Control your notification preferences and newsletter subscriptions
              </p>
            </div>

            <div className={styles.subscriptionSection}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
                Email Notifications
              </h3>
              
              <div className={styles.settingItem}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <Mail size={18} style={{ color: "var(--deep-forest)" }} />
                    <strong>Email Notifications</strong>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                    Receive updates about new research and platform features
                  </p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <Bell size={18} style={{ color: "var(--eco-green)" }} />
                    <strong>Weekly Research Digest</strong>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                    Get a weekly summary of the latest research in your areas of interest
                  </p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <Bell size={18} style={{ color: "var(--deep-forest)" }} />
                    <strong>New Research Alerts</strong>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                    Instant notifications when research matching your interests is published
                  </p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={newResearchAlerts}
                    onChange={(e) => setNewResearchAlerts(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.subscriptionSection} style={{ marginTop: "2rem" }}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
                Category Subscriptions
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Subscribe to specific research categories to receive targeted updates
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {["Genetics", "Microbiology", "Ecology", "Neuroscience", "Biotechnology"].map((category) => (
                  <label key={category} className={styles.categoryCheckbox}>
                    <input type="checkbox" defaultChecked={category === "Genetics"} />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Account Settings
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Manage your account information and preferences
              </p>
            </div>

            <form className={styles.settingsForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className={styles.formInput}
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Research Interests</label>
                <textarea
                  className={styles.formTextarea}
                  rows={3}
                  placeholder="e.g., CRISPR, gene therapy, microbial ecology..."
                />
              </div>

              <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
                <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
                  Change Password
                </h3>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Enter current password"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Enter new password"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <input
                    type="password"
                    className={styles.formInput}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.primaryButton}>
                  Save Changes
                </button>
                <button type="button" className={styles.secondaryButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
