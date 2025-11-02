import Head from 'next/head';
import Link from 'next/link';
import styles from './HomePage.module.css';

// Pre-render this page at build time for optimal SEO
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const HomePage = () => {
  const featureCards = [
    {
      icon: '🎂',
      title: 'Exact Age Calculator',
      description: 'Calculate your age in years, months, days, hours, and seconds with precision. Instant results, zero setup.',
      path: '/age-calculator',
    },
    {
      icon: '👥',
      title: 'Accurate Age Comparator',
      description: 'Compare ages between two or more people. See who is older, by how much, and their age difference in days.',
      path: '/age-comparator',
    },
    {
      icon: '🎮',
      title: 'Age Quiz Game',
      description: 'Test your knowledge with fun age-related trivia! Earn a certificate at the end based on your score.',
      path: '/age-quiz-game',
    },
  ];

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Comprehensive keyword lists
  const shortKeywords = [
    'age', 'calculator', 'compare', 'birthday', 'old', 'date', 'time', 'years', 
    'months', 'days', 'hours', 'seconds', 'timer', 'chronological', 'birth', 
    'date calculator', 'age tool', 'free', 'online', 'accurate', 'precise'
  ];

  const longTailKeywords = [
    'how old am I exactly today',
    'calculate age from birth date',
    'age difference calculator between two people',
    'birthday countdown calculator',
    'exact age in years months days',
    'online age calculator no download',
    'free age comparison tool',
    'age calculator with time and date',
    'how many days old am I',
    'age calculator for any date',
    'precise age calculator down to seconds',
    'mobile friendly age calculator',
    'age calculator without registration',
    'instant age calculation online',
    'compare ages of multiple people',
    'age gap calculator relationship',
    'birth date to current age calculator',
    'age calculator with leap years',
    'how long have I been alive calculator',
    'age calculator for kids and adults'
  ];

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AgeRanker | Free Accurate Age Calculator & Comparator 2025</title>
        <meta
          name="description"
          content="Calculate your exact age in years, months, days, hours & seconds. Compare ages between people or play our age quiz game. 100% free, private & mobile-friendly."
        />
        <meta
          name="keywords"
          content={`${shortKeywords.join(', ')}, ${longTailKeywords.slice(0, 10).join(', ')}`}
        />
        <meta name="author" content="AgeRanker Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ageranker.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AgeRanker | Exact Age Calculator & Comparator Tool" />
        <meta
          property="og:description"
          content="Free accurate age calculator: find your exact age in years, months, days. Compare ages or play our fun age quiz game. No signup required."
        />
        <meta property="og:url" content="https://www.ageranker.com" />
        <meta property="og:image" content="https://www.ageranker.com/images/age-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AgeRanker - Calculate your exact age instantly" />
        <meta property="og:site_name" content="AgeRanker" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AgeRanker | Free Age Calculator & Comparator" />
        <meta
          name="twitter:description"
          content="Calculate your exact age, compare ages between people, or test your knowledge with our age quiz. Fast, accurate, and completely free."
        />
        <meta name="twitter:image" content="https://www.ageranker.com/images/age-calculator-twitter.jpg" />
        <meta name="twitter:image:alt" content="Free age calculation tools - calculator, comparator, and quiz" />
        <meta name="twitter:site" content="@AgeRanker" />
        <meta name="twitter:creator" content="@AgeRanker" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          preload="true"
        />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'AgeRanker - Exact Age Calculator',
                description: 'Free online tool to calculate exact age in years, months, days, hours and seconds. Compare ages between people or play age quiz game.',
                url: 'https://www.ageranker.com',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD'
                },
                author: {
                  '@type': 'Organization',
                  name: 'AgeRanker'
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  ratingCount: '1247',
                  bestRating: '5'
                },
                featureList: [
                  'Exact age calculation',
                  'Age comparison tool', 
                  'Age quiz game',
                  'Certificate generation',
                  'Mobile optimized',
                  'No data collection'
                ].join(', '),
                screenshot: [
                  'https://www.ageranker.com/images/screenshot1.jpg',
                  'https://www.ageranker.com/images/screenshot2.jpg'
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How accurate is the age calculator?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Our age calculator is extremely accurate, accounting for leap years and calculating down to the second. It uses your local timezone for precise results.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I compare ages between multiple people?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! Our age comparator tool allows you to compare ages between two or more people and see exact differences in years, months, and days.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Is my personal data stored when I use the calculator?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No, we do not store any personal data. All calculations happen locally in your browser and are never sent to our servers.'
                    }
                  }
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.ageranker.com'
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Age Calculator',
                    item: 'https://www.ageranker.com/age-calculator'
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Age Comparator',
                    item: 'https://www.ageranker.com/age-comparator'
                  }
                ]
              }
            ]),
          }}
        />
      </Head>

      <div className={styles.homePage}>
        {/* Hero Section with Semantic HTML */}
        <header className={styles.hero} role="banner">
          <div className={styles.heroBackground} aria-hidden="true"></div>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              ⏱️ Trusted by 1M+ Users
            </div>
            <h1 className={styles.heroTitle}>
              Discover Your <span className={styles.gradientText}>Exact Age</span> in Real-Time
            </h1>
            <p className={styles.heroSubtitle}>
              Calculate your precise age down to the second with our advanced algorithms. 
              Fast, private, and incredibly accurate — no personal data required.
            </p>
            <div className={styles.ctaContainer}>
              <div className={styles.gap}>
                <button
                  className={styles.ctaButton}
                  onClick={scrollToCalculator}
                  aria-label="Use Age Calculator tool"
                >
                  <span>Age Calculator</span>
                </button>
                <button
                  className={styles.ctaButton}
                  onClick={scrollToCalculator}
                  aria-label="Compare ages between people"
                >
                  <span>Age Comparator</span>
                </button>
              </div>
              <div className={styles.trustIndicators}>
                <div className={styles.trustItem}>🔒 100% Private</div>
                <div className={styles.trustItem}>⚡ Instant Results</div>
                <div className={styles.trustItem}>📱 Mobile Optimized</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main id="main-content" role="main">
          {/* Feature Cards Section */}
          <section className={styles.featureSection} id="calculator" aria-labelledby="features-heading">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionBadge}>Our Features</div>
              <h2 id="features-heading" className={styles.sectionTitle}>Everything You Need in One Place</h2>
              <p className={styles.sectionSubtitle}>Powerful tools designed for accuracy and ease of use</p>
            </div>

            <div className={styles.featureGrid}>
              {featureCards.map((card, index) => (
                <Link 
                  href={card.path} 
                  key={index} 
                  className={styles.cardLink}
                  aria-label={`Navigate to ${card.title}`}
                >
                  <article className={styles.featureCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon} aria-hidden="true">{card.icon}</div>
                      <div className={styles.cardDecoration} aria-hidden="true"></div>
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    <div className={styles.cardHoverEffect} aria-hidden="true"></div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={styles.ctaSection} aria-labelledby="cta-heading">
            <div className={styles.ctaBackground} aria-hidden="true"></div>
            <div className={styles.ctaContent}>
              <h2 id="cta-heading" className={styles.ctaTitle}>Ready to Discover Your Exact Age?</h2>
              <p className={styles.ctaSubtitle}>
                Join millions of users who trust AgeRanker for precise age calculations. 
                No signup required. No hidden costs. Just accurate results.
              </p>
              <button
                className={styles.ctaButtonLarge}
                onClick={scrollToCalculator}
                aria-label="Start calculating your age now"
              >
                Start Calculating Instantly
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;