import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Microscope, Mail, Lock, AlertCircle, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/pages.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Regular users go back to home or their profile
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginLogo}>
            <Microscope size={40} style={{ color: "var(--deep-forest)" }} />
          </div>
          <h1 className={styles.loginTitle}>
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className={styles.loginSubtitle}>
            {isSignup 
              ? "Sign up to save research, subscribe to updates, and access premium content"
              : "Sign in to access your saved research and subscription preferences"
            }
          </p>
        </div>

        <div style={{
          background: "linear-gradient(to right, #E8F5E9, #C8E6C9)",
          border: "2px solid #A5D6A7",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          marginBottom: "1.5rem",
          fontSize: "0.875rem",
          color: "#1B5E20",
          textAlign: "center"
        }}>
          <strong>User Login:</strong> For research access, bookmarks, and subscriptions
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="your.email@example.com"
                style={{ paddingLeft: "3rem" }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                placeholder="Enter your password"
                style={{ paddingLeft: "3rem" }}
                disabled={isLoading}
              />
            </div>
          </div>

          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? "Processing..." : (isSignup ? "Create Account" : "Sign In")}
          </button>
        </form>

        <div className={styles.loginDivider}>
          <span>or</span>
        </div>

        <button 
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className={styles.switchButton}
        >
          <UserPlus size={18} />
          {isSignup ? "Already have an account? Sign In" : "New user? Create Account"}
        </button>

        <div className={styles.loginFooter}>
          <p className={styles.demoCredentials} style={{ 
            background: "var(--green-lighter)", 
            padding: "0.75rem", 
            borderRadius: "0.5rem",
            border: "1px solid var(--light-mint)",
            marginBottom: "1rem"
          }}>
            <strong>Demo User:</strong> Use any email/password (e.g., user@example.com / password123)
          </p>
          <p className={styles.loginFooterText}>
            Looking for admin access?{" "}
            <Link to="/admin-login" className={styles.adminLink}>
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
