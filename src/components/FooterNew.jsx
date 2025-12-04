import { Link } from "react-router-dom";
import { Microscope, Github, Twitter, Mail, Heart, Zap } from "lucide-react";
import styles from "../styles/components.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '0.75rem', 
                borderRadius: '0.75rem',
                backdropFilter: 'blur(10px)'
              }}>
                <Microscope size={28} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Biology in Data</h3>
            </div>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.7", fontSize: '1rem' }}>
              A comprehensive platform for biological research data,
              visualization, and collaboration. Empowering scientists worldwide.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginTop: '1.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem'
            }}>
              Made with <Heart size={16} style={{ color: '#ff6b6b' }} /> for science
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <Link to="/research" className={styles.footerLink}>
              <Zap size={16} style={{ marginRight: '0.5rem' }} />
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
              Support Center
            </a>
            <a href="#" className={styles.footerLink}>
              Community
            </a>
          </div>

          <div className={styles.footerSection}>
            <h3>Connect With Us</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Join our community of researchers and data scientists
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <a href="#" style={{ 
                color: "rgba(255, 255, 255, 0.7)", 
                transition: "all 0.3s ease",
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }} className="social-link">
                <Github size={20} />
              </a>
              <a href="#" style={{ 
                color: "rgba(255, 255, 255, 0.7)", 
                transition: "all 0.3s ease",
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }} className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" style={{ 
                color: "rgba(255, 255, 255, 0.7)", 
                transition: "all 0.3s ease",
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }} className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 Biology in Data. All rights reserved. Built with passion for scientific discovery.</p>
        </div>
      </div>
    </footer>
  );
}
