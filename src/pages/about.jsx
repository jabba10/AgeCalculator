'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  // Structured data for better search engine visibility
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About DigiAge Calculator - How Our Age Calculation Tool Works",
    "description": "Learn how DigiAge Calculator provides accurate, private age calculations with zero data collection. Discover our mission, values, and how our tool works.",
    "publisher": {
      "@type": "Organization",
      "name": "DigiAge Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ageranker.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "DigiAge Calculator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "description": "Accurate age calculator with privacy protection",
      "featureList": [
        "Instant age calculation",
        "Zero data collection",
        "Responsive design",
        "Educational age insights"
      ]
    }
  };

  useEffect(() => {
    // Add smooth scrolling for internal links
    const handleInternalLinkClick = (e) => {
      if (e.target.getAttribute('href') === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleInternalLinkClick);
    return () => document.removeEventListener('click', handleInternalLinkClick);
  }, []);

  return (
    <>
      <Head>
        <title>About AgeRanker Calculator | How Our Age Tool Works</title>
        <meta name="description" content="Discover how AgeRanker Calculator works - a fast, accurate, and private age calculation tool. Learn about our mission, values, and why thousands trust our tool." />
        <meta name="keywords" content="about age calculator, how our tool works, accurate age calculator, privacy age tool, DigiAge Calculator" />
        <meta property="og:title" content="About AgeRanker Calculator | How Our Age Tool Works" />
        <meta property="og:description" content="Discover how DigiAge Calculator works - a fast, accurate, and private age calculation tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ageranker.com/about" />
        <meta property="og:image" content="https://www.ageranker.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About AgeRanker Calculator | How Our Age Tool Works" />
        <meta name="twitter:description" content="Discover how AgeRanker Calculator works - a fast, accurate, and private age calculation tool." />
        <meta name="twitter:image" content="https://www.ageranker.com/twitter-image.jpg" />
        <link rel="canonical" href="https://www.ageranker.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.aboutHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroH1}>🧭 About AgeRanker Calculator</h1>
            <p className={styles.heroP}>Simple. Accurate. Private. Built for everyone who values time.</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIcon}>🎯</div>
              <h2 className={styles.cardH2}>Our Mission</h2>
              <p className={styles.cardP}>
                At <strong>AgeRanker</strong>, we believe time is the most precious resource we have. 
                Our mission is to help you understand your journey through time with clarity, precision, and simplicity.
              </p>
              <p className={styles.cardP}>
                We created this tool because most age calculators are cluttered, slow, or invasive. 
                AgeRanker exists to be the opposite: <strong>clean, fast, and respectful of your privacy</strong>.
              </p>
              <p className={styles.cardP}>
                <a href="/" className={styles.internalLink}>Try our age calculator</a> to experience the difference.
              </p>
            </div>
          </div>
        </section>

        {/* How Our Tool Works Section */}
        <section className={`${styles.aboutSection} ${styles.lightBg}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>How Our Age Calculator Works</h2>
            <p className={styles.sectionSubtitle}>
              Discover the simple yet powerful process behind our accurate age calculations
            </p>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📅</div>
                <h3 className={styles.featureH3}>1. Input Your Birth Date</h3>
                <p className={styles.featureP}>Enter your birth date using our intuitive date selector or manual input fields.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureH3}>2. Instant Calculation</h3>
                <p className={styles.featureP}>Our algorithm processes your age in milliseconds with precision timing.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureH3}>3. Detailed Results</h3>
                <p className={styles.featureP}>View your exact age in years, months, weeks, days, and even seconds.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <h3 className={styles.featureH3}>4. Complete Privacy</h3>
                <p className={styles.featureP}>Your data never leaves your device - no storage, no tracking, no sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why DigiAge Section */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose AgeRanker Calculator?</h2>
            <p className={styles.sectionSubtitle}>
              We're not just another calculator. We're built with purpose.
            </p>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureH3}>Lightning Fast</h3>
                <p className={styles.featureP}>Calculates your age in milliseconds — no loading, no delays.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🛡</div>
                <h3 className={styles.featureH3}>Zero Data Collection</h3>
                <p className={styles.featureP}>We never store, track, or share your birth date. Your data stays on your device.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3 className={styles.featureH3}>Fully Responsive</h3>
                <p className={styles.featureP}>Works perfectly on phones, tablets, and desktops — no matter the screen size.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📚</div>
                <h3 className={styles.featureH3}>Age Insights & Education</h3>
                <p className={styles.featureP}>Explore fun facts, science, and guides about aging, time, and life stages.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className={`${styles.aboutSection} ${styles.lightBg}`}>
          <div className={styles.container}>
            <div className={styles.storyContent}>
              <h2 className={styles.storyH2}>The Story Behind AgeRanker</h2>
              <p className={styles.storyP}>
                AgeRanker was born from a simple question: <em>"Why is it so hard to find a clean, honest age calculator?"</em>
              </p>
              <p className={styles.storyP}>
                Too many tools are bloated with ads, trackers, or confusing interfaces. 
                We wanted to build something different — a calculator that respects your time and privacy.
              </p>
              <p className={styles.storyP}>
                Built with Next.js and powered by client-side logic, AgeRanker runs entirely in your browser. 
                No servers. No databases. Just pure, instant calculation.
              </p>
              <p className={styles.storyP}>
                Whether you're checking your baby's age in weeks, planning your 30th birthday, 
                or curious how old you'd be on Mars — we're here to help, one second at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>✨</div>
                <h3 className={styles.valueH3}>Simplicity</h3>
                <p className={styles.valueP}>We believe the best tools are simple to use and easy to understand.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🔒</div>
                <h3 className={styles.valueH3}>Privacy</h3>
                <p className={styles.valueP}>Your birth date is personal. We never collect or store it.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎯</div>
                <h3 className={styles.valueH3}>Accuracy</h3>
                <p className={styles.valueP}>Precise calculations down to the second — leap years included.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌱</div>
                <h3 className={styles.valueH3}>Growth</h3>
                <p className={styles.valueP}>We're always learning, improving, and adding new features.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaH2}>Join Thousands of Users</h2>
            <p className={styles.ctaP}>Discover your age, explore fun facts, and reflect on your journey through time.</p>
            <a href="/" className={styles.ctaBtn}>
              Calculate My Age Now
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;