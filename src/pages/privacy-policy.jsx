'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from './privacypolicy.module.css';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      if (e.target.hash) {
        e.preventDefault();
        const element = document.querySelector(e.target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy | AgeRanker Calculator - Your Data is Safe</title>
        <meta name="description" content="AgeRanker Calculator's privacy policy. We collect no data, store no information, and respect your privacy. Your age calculations stay entirely on your device." />
        <meta name="keywords" content="privacy policy, age calculator privacy, data protection, no data collection, AgeRanker Calculator" />
        <meta property="og:title" content="Privacy Policy | AgeRanker Calculator" />
        <meta property="og:description" content="We collect no data, store no information, and respect your privacy. Your age calculations stay entirely on your device." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ageranker.com/privacy-policy" />
        <link rel="canonical" href="https://www.ageranker.com/privacy-policy" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.policyPage}>
        {/* Header Section */}
        <section className={styles.policyHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>🔒</div>
            <h1 className={styles.headerTitle}>Privacy Policy</h1>
            
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.policyContent}>
          <div className={styles.container}>
            <div className={styles.policyCard}>
              <div className={styles.cardContent}>
                <div className={styles.introSection}>
                  <p className={styles.introText}>
                    At <strong>AgeRanker Calculator</strong>, we value your privacy and are committed to protecting your personal information. 
                    This policy explains how we handle your data when you use our free age calculator.
                  </p>
                </div>

                {/* Policy Sections */}
                <div className={styles.policySections}>
                  <section className={styles.policySection}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionNumber}>1</div>
                      <h2 className={styles.sectionTitle}>No Data Collection</h2>
                    </div>
                    <p className={styles.sectionText}>
                      We do <strong>not collect, store, or share</strong> any personal information. 
                      The calculator runs entirely in your browser — no data is sent to any server.
                    </p>
                  </section>

                  <section className={styles.policySection}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionNumber}>2</div>
                      <h2 className={styles.sectionTitle}>Information You Enter</h2>
                    </div>
                    <p className={styles.sectionText}>
                      Any information you enter (such as your birth date) is used only for real-time calculation and is <strong>never saved</strong> 
                      or transmitted beyond your device.
                    </p>
                  </section>

                  <section className={styles.policySection}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionNumber}>3</div>
                      <h2 className={styles.sectionTitle}>Contact Form Data</h2>
                    </div>
                    <p className={styles.sectionText}>
                      If you use the <strong>Contact Us</strong> form, your message, name, and email are sent directly via EmailJS to our inbox. 
                      We use this solely to respond to your inquiry and do not store or use your data for any other purpose.
                    </p>
                    <p className={styles.sectionText}>
                      You may request deletion of your message at any time by <strong>contacting us</strong>.
                    </p>
                  </section>

                  <section className={styles.policySection}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionNumber}>4</div>
                      <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
                    </div>
                    <p className={styles.sectionText}>
                      We may update this privacy policy from time to time. Any changes will be posted on this page with a new "last updated" date.
                    </p>
                  </section>

                  <section className={styles.policySection}>
                    <div className={styles.sectionHeader}>
                      <div className={styles.sectionNumber}>5</div>
                      <h2 className={styles.sectionTitle}>Contact Us</h2>
                    </div>
                    <p className={styles.sectionText}>
                      If you have any questions about this Privacy Policy, feel free to reach out on our{' '}
                      <a href="/contact" className={styles.internalLink}>Contact Us Page</a>.
                    </p>
                  </section>
                </div>

                {/* Summary Card */}
                <div className={styles.summaryCard}>
                  <div className={styles.summaryIcon}>💡</div>
                  <h3 className={styles.summaryTitle}>Key Takeaways</h3>
                  <ul className={styles.summaryList}>
                    <li>✅ No data collection or storage</li>
                    <li>✅ Everything runs in your browser</li>
                    <li>✅ Your information never leaves your device</li>
                    <li>✅ Contact form data is used only for responses</li>
                    <li>✅ You control your information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;