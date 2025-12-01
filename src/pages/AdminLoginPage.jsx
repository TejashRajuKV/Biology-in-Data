import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/pages.module.css";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate("/admin");
    } else if (isAuthenticated && !isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Check if credentials match admin credentials
      if (email === "admin@bio.com" && password === "admin123") {
        const success = await login(email, password);
        if (success) {
          navigate("/admin");
        } else {
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError("Invalid admin credentials. Please use the demo credentials below.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard} style={{ maxWidth: "480px" }}>
        <div className={styles.loginHeader}>
          <div className={styles.loginLogo} style={{ background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)", padding: "1rem", borderRadius: "1rem" }}>
            <Shield size={40} style={{ color: "white" }} />
          </div>
          <h1 className={styles.loginTitle}>Admin Portal</h1>
          <p className={styles.loginSubtitle}>
            Secure access for research management and content administration
          </p>
        </div>

        <div style={{
          background: "linear-gradient(to right, #FFF3CD, #FFF8E1)",
          border: "2px solid #FFE082",
          borderRadius: "0.5rem",
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "start"
        }}>
          <AlertCircle size={20} style={{ color: "#F57C00", flexShrink: 0, marginTop: "0.125rem" }} />
          <div style={{ fontSize: "0.875rem", color: "#E65100" }}>
            <strong>Admin Access Only</strong>
            <p style={{ marginTop: "0.25rem", color: "#5D4037" }}>
              This portal is restricted to authorized administrators for research database management.
            </p>
          </div>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Admin Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="admin@bio.com"
                style={{ paddingLeft: "3rem" }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Admin Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                placeholder="Enter admin password"
                style={{ paddingLeft: "3rem" }}
                disabled={isLoading}
              />
            </div>
          </div>

          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p className={styles.demoCredentials} style={{ 
            background: "var(--green-lighter)", 
            padding: "0.75rem", 
            borderRadius: "0.5rem",
            border: "1px solid var(--light-mint)"
          }}>
            <strong>Demo Credentials:</strong><br />
            Email: <strong>admin@bio.com</strong><br />
            Password: <strong>admin123</strong>
          </p>
          <p className={styles.loginFooterText} style={{ marginTop: "1rem" }}>
            Regular user?{" "}
            <Link to="/login" className={styles.adminLink}>
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
