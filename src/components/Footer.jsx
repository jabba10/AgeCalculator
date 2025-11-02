'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBackground}></div>
      
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.footerBrand}>
          <div 
            className={styles.footerLogo}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            aria-label="Scroll to top"
          >
            <span className={styles.logoIcon}>⏱️</span>
            <span className={styles.logoText}>AgeRanker</span>
          </div>
          <p className={styles.brandDescription}>
            Calculate your exact age with precision. Fast, private, and incredibly accurate — no personal data required.
          </p>
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>🔒 100% Private</div>
            <div className={styles.trustBadge}>⚡ Instant Results</div>
            <div className={styles.trustBadge}>📱 Mobile Optimized</div>
          </div>
        </div>

        {/* Tools Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Our Tools</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href="/age-calculator" className={styles.footerLink}>
                <span className={styles.linkIcon}>🎂</span>
                Age Calculator
              </Link>
            </li>
            <li>
              <Link href="/age-comparator" className={styles.footerLink}>
                <span className={styles.linkIcon}>👥</span>
                Age Comparator
              </Link>
            </li>
            <li>
              <Link href="/age-quiz-game" className={styles.footerLink}>
                <span className={styles.linkIcon}>🎮</span>
                Quiz Game
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href="/" className={styles.footerLink}>
                <span className={styles.linkIcon}>🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.footerLink}>
                <span className={styles.linkIcon}>ℹ️</span>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.footerLink}>
                <span className={styles.linkIcon}>📞</span>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect & Legal */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Connect</h4>
          <ul className={styles.linkList}>
            
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                <span className={styles.linkIcon}>🐦</span>
                Twitter
              </a>
            </li>
            <li>
              <Link href="/privacy-policy" className={styles.footerLink}>
                <span className={styles.linkIcon}>🛡️</span>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {currentYear} <span className={styles.brandHighlight}>AgeRanker</span> | 
            <span className={styles.copyrightTagline}> Precision Age Calculation</span>
          </p>
          
          <div className={styles.bottomActions}>
            <button
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span className={styles.backToTopIcon}>↑</span>
              <span className={styles.backToTopText}>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;