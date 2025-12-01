import { Link } from "react-router-dom";
import { Microscope, Github, Twitter, Mail } from "lucide-react";
import styles from "../styles/components.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Microscope size={32} color="#2563eb" />
              <h3>Biology in Data</h3>
            </div>
            <p style={{ color: "var(--gray-400)", lineHeight: "1.6" }}>
              A comprehensive platform for biological research data,
              visualization, and collaboration.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <Link to="/research" className={styles.footerLink}>
              Browse Research
            </Link>
            <Link to="/admin" className={styles.footerLink}>
              Admin Panel
            </Link>
            <Link to="/login" className={styles.footerLink}>
              Login
            </Link>
          </div>

          <div className={styles.footerSection}>
            <h3>Resources</h3>
            <a href="#" className={styles.footerLink}>
              Documentation
            </a>
            <a href="#" className={styles.footerLink}>
              API Reference
            </a>
            <a href="#" className={styles.footerLink}>
              Support
            </a>
          </div>

          <div className={styles.footerSection}>
            <h3>Connect</h3>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <a href="#" style={{ color: "var(--gray-400)", transition: "color 0.2s" }}>
                <Github size={24} />
              </a>
              <a href="#" style={{ color: "var(--gray-400)", transition: "color 0.2s" }}>
                <Twitter size={24} />
              </a>
              <a href="#" style={{ color: "var(--gray-400)", transition: "color 0.2s" }}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 Biology in Data. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
