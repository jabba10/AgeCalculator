'use client';
import Link from 'next/link';
import Head from 'next/head';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | AgeRanker Calculator</title>
        <meta 
          name="description" 
          content="The page you're looking for doesn't exist. Return to our homepage to calculate your exact age with precision and privacy." 
        />
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <div className="notFoundPage">
        <main className="notFoundMain">
          <div className="notFoundContainer">
            <div className="notFoundCard">
              
              {/* Hero Section */}
              <section className="notFoundHero">
                <h1 className="notFoundTitle">🧭 404 - Page Not Found</h1>
                <p className="notFoundIntro">
                  Oops! The page you're looking for seems to have gone missing. Don't worry, we'll help you get back to calculating your exact age instantly.
                </p>
              </section>

              {/* What Might Have Happened Section */}
              <section className="notFoundSection">
                <div className="aboutIcon">🎯</div>
                <h2 className="sectionTitle">What Might Have Happened?</h2>
                <div className="featuresGrid">
                  <div className="featureCard">
                    <div className="featureIcon">🔍</div>
                    <h3 className="featureH3">Page Moved or Deleted</h3>
                    <p className="featureP">The page may have been moved to a new location or temporarily removed during updates.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">⌨️</div>
                    <h3 className="featureH3">Typo in URL</h3>
                    <p className="featureP">There might be a small typo in the web address you entered.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">🔗</div>
                    <h3 className="featureH3">Outdated Link</h3>
                    <p className="featureP">The link you followed could be from an older version of our site.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">🚧</div>
                    <h3 className="featureH3">Temporary Update</h3>
                    <p className="featureP">We might be temporarily updating the page with new features.</p>
                  </div>
                </div>
              </section>

              {/* Get Back on Track Section */}
              <section className="notFoundSection lightBg">
                <h2 className="sectionTitle">Get Back to Accurate Age Calculation</h2>
                <p className="sectionText">
                  While we fix this, why not calculate your exact age? Our tool is <strong>100% private</strong> - no data stored, no sign-up required, and everything happens in your browser.
                </p>
                <div className="privacyHighlight">
                  <strong>Your privacy matters: Zero data collection, instant calculation</strong>
                </div>
                
                <div className="featuresGrid">
                  <div className="featureCard">
                    <div className="featureIcon">⚡</div>
                    <h3 className="featureH3">Lightning Fast</h3>
                    <p className="featureP">Calculate your age in milliseconds — no loading, no delays.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">🛡</div>
                    <h3 className="featureH3">Zero Data Collection</h3>
                    <p className="featureP">We never store, track, or share your birth date. Your data stays on your device.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">📱</div>
                    <h3 className="featureH3">Fully Responsive</h3>
                    <p className="featureP">Works perfectly on phones, tablets, and desktops — no matter the screen size.</p>
                  </div>

                  <div className="featureCard">
                    <div className="featureIcon">🎯</div>
                    <h3 className="featureH3">Precision Accuracy</h3>
                    <p className="featureP">Exact calculations down to the second — leap years included.</p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="ctaSection">
                <Link href="/" className="ctaButton">
                  Calculate My Age Now
                </Link>
                <p className="ctaSubtext">
                  Free, private, and instant - discover your exact age with precision
                </p>
              </section>

            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        /* CSS Variables matching About-us page styling */
        :root {
          --primary-bg: #ffffff;
          --light-bg: #f8fafc;
          --text-primary: #374151;
          --text-secondary: #6b7280;
          --accent-color: #2563eb;
          --accent-hover: #1d4ed8;
          --border-color: #e5e7eb;
          --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Base Styles - Mobile First */
        .notFoundPage {
          background-color: var(--primary-bg);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .notFoundMain {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 1rem;
          width: 100%;
          margin-top: 1rem;
        }

        .notFoundContainer {
          width: 100%;
          max-width: 42rem;
          margin: 0 auto;
        }

        .notFoundCard {
          background: var(--primary-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          box-shadow: var(--card-shadow);
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
          margin-top: 1rem;
        }

        /* Hero Section */
        .notFoundHero {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .notFoundTitle {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .notFoundIntro {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 36rem;
          margin: 0 auto;
        }

        /* Section Styles */
        .notFoundSection {
          margin-bottom: 2.5rem;
        }

        .lightBg {
          background-color: var(--light-bg);
          margin: 2.5rem -2rem;
          padding: 2rem;
          border-radius: 0.5rem;
        }

        .sectionTitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.4;
          text-align: center;
        }

        .sectionText {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
          text-align: center;
          max-width: 36rem;
          margin-left: auto;
          margin-right: auto;
        }

        /* About Icon */
        .aboutIcon {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        /* Features Grid */
        .featuresGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .featureCard {
          background: var(--primary-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          box-shadow: var(--card-shadow);
          transition: all 0.2s ease-in-out;
        }

        .featureCard:hover {
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }

        .featureIcon {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .featureH3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .featureP {
          color: var(--text-secondary);
          line-height: 1.5;
          font-size: 0.875rem;
        }

        /* Privacy Highlight */
        .privacyHighlight {
          background-color: var(--light-bg);
          border-left: 4px solid var(--accent-color);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          border-radius: 0 0.375rem 0.375rem 0;
          color: var(--text-primary);
          text-align: center;
        }

        /* CTA Section */
        .ctaSection {
          text-align: center;
          margin-top: 2.5rem;
        }

        .ctaButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;
          min-height: 3rem;
          min-width: 12rem;
        }

        .ctaButton:hover {
          background-color: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: var(--card-shadow-hover);
        }

        .ctaButton:active {
          transform: translateY(0);
        }

        .ctaSubtext {
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */

        /* Small Phones (320px - 374px) */
        @media (max-width: 374px) {
          .notFoundMain {
            padding: 0.5rem;
            margin-top: 0.5rem;
          }

          .notFoundCard {
            padding: 1.25rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
          }

          .lightBg {
            margin: 2rem -1.25rem;
            padding: 1.25rem;
          }

          .notFoundTitle {
            font-size: 1.375rem;
            margin-bottom: 0.75rem;
            padding-top: 0.25rem;
          }

          .notFoundIntro {
            font-size: 0.95rem;
          }

          .sectionTitle {
            font-size: 1.125rem;
          }

          .ctaButton {
            width: 100%;
            min-width: auto;
            padding: 0.875rem 1rem;
          }

          .privacyHighlight {
            padding: 0.875rem 1rem;
            margin: 1.25rem 0;
          }

          .notFoundHero {
            margin-bottom: 2rem;
          }

          .notFoundSection {
            margin-bottom: 2rem;
          }
        }

        /* Medium Phones (375px - 424px) */
        @media (min-width: 375px) and (max-width: 424px) {
          .notFoundMain {
            padding: 0.75rem;
            margin-top: 0.75rem;
          }

          .notFoundCard {
            padding: 1.5rem;
            margin-top: 0.75rem;
          }

          .lightBg {
            margin: 2rem -1.5rem;
            padding: 1.5rem;
          }

          .notFoundTitle {
            font-size: 1.5rem;
            padding-top: 0.5rem;
          }
        }

        /* Large Phones (425px - 767px) */
        @media (min-width: 425px) and (max-width: 767px) {
          .notFoundMain {
            padding: 1rem;
            margin-top: 1rem;
          }

          .notFoundCard {
            padding: 1.75rem;
            margin-top: 1rem;
          }

          .lightBg {
            margin: 2rem -1.75rem;
            padding: 1.75rem;
          }

          .notFoundTitle {
            font-size: 1.625rem;
            padding-top: 0.5rem;
          }
        }

        /* Tablets (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .notFoundMain {
            padding: 1.5rem;
            margin-top: 1.5rem;
            align-items: center;
          }

          .notFoundCard {
            padding: 2.5rem;
            margin-top: 0;
          }

          .lightBg {
            margin: 2.5rem -2.5rem;
            padding: 2.5rem;
          }

          .featuresGrid {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .notFoundTitle {
            font-size: 2rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.125rem;
          }

          .sectionTitle {
            font-size: 1.375rem;
          }

          .ctaButton {
            padding: 1rem 2rem;
            font-size: 1.125rem;
            min-height: 3.5rem;
          }
        }

        /* Desktop (1024px - 1439px) */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .notFoundMain {
            padding: 2rem;
            margin-top: 2rem;
            align-items: center;
          }

          .notFoundContainer {
            max-width: 48rem;
          }

          .notFoundCard {
            padding: 3rem;
            margin-top: 0;
          }

          .lightBg {
            margin: 3rem -3rem;
            padding: 3rem;
          }

          .featuresGrid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .notFoundTitle {
            font-size: 2.25rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.25rem;
          }

          .sectionTitle {
            font-size: 1.5rem;
          }
        }

        /* Large Desktop (1440px and above) */
        @media (min-width: 1440px) {
          .notFoundMain {
            padding: 2.5rem;
            margin-top: 2.5rem;
            align-items: center;
          }

          .notFoundContainer {
            max-width: 56rem;
          }

          .notFoundCard {
            padding: 3.5rem;
            margin-top: 0;
          }

          .lightBg {
            margin: 3.5rem -3.5rem;
            padding: 3.5rem;
          }

          .featuresGrid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .notFoundTitle {
            font-size: 2.5rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.375rem;
          }

          .sectionTitle {
            font-size: 1.5rem;
          }

          .ctaButton {
            padding: 1.125rem 2.25rem;
            font-size: 1.125rem;
            min-height: 3.75rem;
          }
        }

        /* ===== ACCESSIBILITY & ENHANCEMENTS ===== */

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .ctaButton, .featureCard {
            transition: none;
          }
          
          .ctaButton:hover, .featureCard:hover {
            transform: none;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          :root {
            --primary-bg: #1f2937;
            --light-bg: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border-color: #374151;
            --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
            --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
          }

          .privacyHighlight {
            background-color: #4b5563;
            border-left-color: var(--accent-color);
          }
        }

        /* High Contrast Support */
        @media (prefers-contrast: high) {
          .ctaButton {
            border: 2px solid currentColor;
          }
          
          .notFoundCard, .featureCard {
            border-width: 2px;
          }

          .privacyHighlight {
            border-width: 3px;
          }
        }

        /* Focus States */
        .ctaButton:focus-visible {
          outline: 2px solid var(--accent-color);
          outline-offset: 2px;
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .ctaButton:hover, .featureCard:hover {
            transform: none;
          }
          
          .ctaButton:active {
            transform: scale(0.98);
          }
        }

        /* Landscape Orientation Optimizations */
        @media (max-height: 500px) and (orientation: landscape) {
          .notFoundMain {
            padding: 0.75rem;
            margin-top: 0.75rem;
            align-items: flex-start;
          }
          
          .notFoundCard {
            padding: 1.25rem;
            margin-top: 0.5rem;
          }
          
          .lightBg {
            margin: 1.5rem -1.25rem;
            padding: 1.25rem;
          }
          
          .notFoundHero {
            margin-bottom: 1.25rem;
          }
          
          .notFoundSection {
            margin-bottom: 1.25rem;
          }

          .notFoundTitle {
            font-size: 1.5rem;
            padding-top: 0.25rem;
          }
        }

        /* Very small height screens */
        @media (max-height: 400px) {
          .notFoundMain {
            align-items: flex-start;
            padding-top: 1rem;
            margin-top: 0.5rem;
          }

          .notFoundCard {
            padding: 1rem;
            margin-top: 0.5rem;
          }

          .lightBg {
            margin: 1.5rem -1rem;
            padding: 1rem;
          }

          .notFoundTitle {
            font-size: 1.375rem;
            margin-bottom: 0.5rem;
            padding-top: 0.25rem;
          }

          .notFoundIntro {
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }
        }

        /* Safe area insets for notched devices */
        @supports(padding: max(0px)) {
          .notFoundMain {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
            padding-top: max(1rem, env(safe-area-inset-top));
          }
        }
      `}</style>
    </>
  );
};

export default Custom404;