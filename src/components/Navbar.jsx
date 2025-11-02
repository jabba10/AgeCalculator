'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.navLogo} onClick={closeMenu} aria-label="Go to home">
          <span className={styles.logoIcon}>⏱️</span>
          <span className={styles.logoText}>AgeRanker</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navMenu}>
          <li>
            <Link href="/age-calculator" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>🎂</span>
              Age Calculator
            </Link>
          </li>
          <li>
            <Link href="/age-comparator" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>👥</span>
              Age Comparator
            </Link>
          </li>
          <li>
            <Link href="/age-quiz-game" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>🎮</span>
              Quiz Game
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>📞</span>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>ℹ️</span>
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.navToggle}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.navMenuMobile} ${isMenuOpen ? styles.open : ''}`}
      >
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            <span className={styles.logoIcon}>⏱️</span>
            <span className={styles.logoText}>AgeRanker</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span>×</span>
          </button>
        </div>

        <ul className={styles.mobileNavList}>
          <li>
            <Link href="/" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link href="/age-calculator" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>🎂</span>
              Age Calculator
            </Link>
          </li>
          <li>
            <Link href="/age-comparator" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>👥</span>
              Age Comparator
            </Link>
          </li>
          <li>
            <Link href="/age-quiz-game" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>🎮</span>
              Quiz Game
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>📞</span>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLinkMobile} onClick={closeMenu}>
              <span className={styles.navIcon}>ℹ️</span>
              About
            </Link>
          </li>
        </ul>

        <div className={styles.mobileFooter}>
          <div className={styles.mobileTrust}>
            <span>🔒 100% Private</span>
            <span>⚡ Instant Results</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;