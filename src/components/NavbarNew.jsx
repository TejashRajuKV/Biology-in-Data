import { Link, useLocation } from "react-router-dom";
import { Microscope, LogIn, LogOut, User, Settings, Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/components.module.css";

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          <Microscope className={styles.navLogoIcon} />
          <span>Biology in Data</span>
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive("/") ? styles.navLinkActive : ""}`}
          >
            Home
          </Link>
          <Link
            to="/research"
            className={`${styles.navLink} ${isActive("/research") ? styles.navLinkActive : ""}`}
          >
            Research
          </Link>
          
          {/* Show Admin Dashboard link only if user is logged in as admin */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`${styles.navLink} ${isActive("/admin") ? styles.navLinkActive : ""}`}
            >
              <Settings size={16} style={{ marginRight: "0.25rem" }} />
              Admin Dashboard
            </Link>
          )}
          
          {/* User Menu - Show if logged in */}
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <Link 
                to="/profile"
                className={styles.userInfo}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <User size={16} />
                <span>{user?.name}</span>
              </Link>
              <button onClick={logout} className={styles.logoutButton}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            /* Login and Admin buttons when not logged in */
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Link to="/login" className={styles.loginLink}>
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/admin-login" className={styles.adminLoginLink}>
                <Shield size={16} />
                Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
