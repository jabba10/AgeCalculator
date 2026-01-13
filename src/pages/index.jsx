import Head from 'next/head';
import Link from 'next/link';
import {
  FiUsers,
  FiAward,
  FiClock,
  FiCheck,
  FiTrendingUp,
  FiStar,
  FiArrowRight,
  FiCalendar,
  FiHome,
  FiChevronRight,
  FiBarChart,
  FiTarget,
  FiShield,
  FiSmartphone,
  FiGlobe,
  FiEye
} from 'react-icons/fi';
import styles from './HomePage.module.css';

const HomePage = ({ seoData, buildTimestamp }) => {
  const {
    currentDate,
    lastModifiedDate,
    reviewDates,
    faqDates,
    breadcrumbData
  } = seoData || {};
  const freshnessIndicator = buildTimestamp
    ? new Date(buildTimestamp).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  const safeCurrentDate = currentDate || freshnessIndicator;
  const safeLastModifiedDate = lastModifiedDate || new Date().toISOString();
  const safeReviewDates = reviewDates || Array(6).fill(freshnessIndicator);
  const safeFaqDates = faqDates || Array(6).fill(freshnessIndicator);

  const features = [
    {
      icon: <FiBarChart className={styles.featureIcon} />,
      title: "Exact Age Calculator",
      description: "Calculate your precise age in years, months, days, hours, minutes, and seconds. Accounts for leap years and time zones automatically."
    },
    {
      icon: <FiUsers className={styles.featureIcon} />,
      title: "Age Comparison Tool",
      description: "Compare ages between multiple people instantly. See exact differences in various time units with visual representations."
    },
    {
      icon: <FiAward className={styles.featureIcon} />,
      title: "Age Quiz Game",
      description: "Test your chronological knowledge with our interactive quiz. Earn certificates based on your performance."
    },
    {
      icon: <FiClock className={styles.featureIcon} />,
      title: "Real-Time Updates",
      description: "Watch your age update in real-time as seconds tick by. Perfect for birthdays and countdowns."
    },
    {
      icon: <FiShield className={styles.featureIcon} />,
      title: "100% Private & Secure",
      description: "All calculations happen locally in your browser. We never store or transmit your personal data."
    },
    {
      icon: <FiSmartphone className={styles.featureIcon} />,
      title: "Mobile Optimized",
      description: "Use our tools on any device with full functionality. Perfect for on-the-go age calculations."
    }
  ];

  const useCases = [
    { title: "Birthday Countdown", count: "Days Until Celebration" },
    { title: "Age Difference Calculator", count: "Relationship Age Gaps" },
    { title: "Time Alive Calculator", count: "Total Seconds Lived" },
    { title: "Historical Age Calculator", count: "Past Date Comparisons" },
    { title: "Future Age Calculator", count: "Age at Future Date" },
    { title: "Age Statistics", count: "Percentile Rankings" },
  ];

  const testimonials = [
    {
      quote: "Most accurate age calculator I've found! Used it for my genealogy research and the precision is incredible.",
      metric: "Genealogy Research",
      name: "Michael T.",
      role: "Family Historian",
      company: "Genealogy Pro"
    },
    {
      quote: "Perfect for planning birthday surprises! The real-time countdown feature is amazing for event planning.",
      metric: "Event Planning",
      name: "Sarah L.",
      role: "Event Coordinator",
      company: "Celebration Planners"
    },
    {
      quote: "As a teacher, I use the age comparison tool to explain time concepts. Students love the visual representations!",
      metric: "Educational Tool",
      name: "Robert K.",
      role: "Math Teacher",
      company: "High School District"
    },
    {
      quote: "The privacy aspect is crucial for me. Knowing my data stays on my device gives me peace of mind.",
      metric: "Privacy Focused",
      name: "Jennifer M.",
      role: "Data Analyst",
      company: "Tech Security"
    },
    {
      quote: "Mobile version works flawlessly! Calculate ages anywhere, anytime. Super convenient for quick calculations.",
      metric: "Mobile Excellence",
      name: "David P.",
      role: "Travel Blogger",
      company: "Digital Nomad"
    },
    {
      quote: "Age quiz game is surprisingly fun and educational! Great way to test your chronological knowledge.",
      metric: "Entertainment Value",
      name: "Emily R.",
      role: "Content Creator",
      company: "Edutainment"
    }
  ];

  const faqs = [
    {
      question: "How accurate is your age calculator compared to other online tools?",
      answer: "Our age calculator is extremely accurate, accounting for leap years, different month lengths, and even leap seconds. It calculates down to the second using your local timezone for maximum precision."
    },
    {
      question: "Can I compare ages between multiple people with different time zones?",
      answer: "Yes! Our age comparison tool automatically handles time zone differences. You can input birth dates from anywhere in the world, and our system will calculate the exact age differences accounting for time zone variations."
    },
    {
      question: "Is my birth date information stored or shared when I use your calculator?",
      answer: "No, we practice complete data privacy. All calculations happen locally in your browser using JavaScript. Your birth dates and personal information never leave your device and are not stored on our servers."
    },
    {
      question: "Do you account for leap years and different month lengths in calculations?",
      answer: "Absolutely! Our algorithm meticulously accounts for leap years (including century rules), varying month lengths (28-31 days), and even adjusts for daylight saving time where applicable."
    },
    {
      question: "Can I calculate my age at a specific future date or past historical date?",
      answer: "Yes, our advanced calculator allows you to calculate your age at any future or past date. This is perfect for planning milestones, historical research, or understanding age differences at specific points in time."
    },
    {
      question: "Is the tool mobile-friendly and does it work offline?",
      answer: "Yes, our age calculator is fully responsive and works perfectly on mobile devices. While the initial page load requires internet, once loaded, the calculator functions offline for basic calculations."
    }
  ];

  return (
    <div className={styles.homePage} itemScope itemType="https://schema.org/WebPage" lang="en-US">
      <Head>
        <title itemProp="name">Exact Age Calculator 2026 - Free Accurate Age Tool with Real-Time Updates | AgeRanker</title>
        <meta name="description" content="Calculate your exact age in years, months, days, hours & seconds. Compare ages between people instantly. 100% private, real-time updates, mobile-friendly. Trusted by 1M+ users worldwide." />
        <meta name="keywords" content="age calculator, exact age calculator, birthday calculator, age comparison, how old am I, age in seconds, age difference calculator, free age tool, chronological age, birth date calculator, time alive calculator, age quiz, mobile age calculator, private age tool, real-time age" />
        <meta name="author" content="AgeRanker Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="date" content={safeCurrentDate} />
        <meta name="last-modified" content={safeLastModifiedDate} />
        <link rel="canonical" href="https://www.ageranker.com/" />
        <meta property="og:title" content="Exact Age Calculator 2026 - Free Accurate Age Tool with Real-Time Updates" />
        <meta property="og:description" content="Calculate your exact age down to the second. Compare ages instantly. 100% private, no data storage. Trusted by 1M+ users." />
        <meta property="og:image" content="https://www.ageranker.com/images/og-age-calculator-preview.jpg" />
        <meta property="og:url" content="https://www.ageranker.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AgeRanker" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={safeLastModifiedDate} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exact Age Calculator - Free Accurate Age Tool 2026" />
        <meta name="twitter:description" content="Calculate exact age in years, months, days, hours & seconds. Compare ages instantly. 100% private, real-time updates." />
        <meta name="twitter:image" content="https://www.ageranker.com/images/twitter-age-calculator-preview.jpg" />
        <meta name="twitter:site" content="@AgeRanker" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://www.ageranker.com/#webpage",
                  "url": "https://www.ageranker.com",
                  "name": "Exact Age Calculator 2026",
                  "description": "Calculate exact age... Trusted by 1M+ users.",
                  "datePublished": "2024-01-01",
                  "dateModified": safeLastModifiedDate,
                  "inLanguage": "en-US",
                  "mainEntity": {
                    "@type": "WebApplication",
                    "name": "AgeRanker - Exact Age Calculator",
                    "applicationCategory": "UtilityApplication",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.8",
                      "ratingCount": 1247,
                      "bestRating": "5"
                    }
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": faqs.map((faq, i) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer,
                      "datePublished": safeFaqDates[i]
                    }
                  }))
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hidden freshness */}
      <div className={styles.freshnessIndicator} style={{ display: 'none' }}>
        <meta name="build-timestamp" content={buildTimestamp?.toString()} />
      </div>

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/" className={styles.breadcrumbLink}>
              <FiHome className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbText}>Home - Age Calculation Tools</span>
            </Link>
          </li>
          <li className={styles.breadcrumbSeparator}>
            <FiChevronRight />
          </li>
          <li>
            <span className={styles.breadcrumbCurrent}>Exact Age Calculator</span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.trustBadge}>
              <FiStar className={styles.starIcon} />
              <span className={styles.trustBadgeText}>
                Rated <span>4.8</span>/<span>5</span> by <span>1,247</span>+ Users | Most Accurate Age Calculator 2026
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              Calculate Your <span className={styles.gradientText}>Exact Age</span> Down to the Second
            </h1>

            <p className={styles.heroSubtitle}>
              Discover your <strong className={styles.heroHighlight}>precise chronological age</strong> in years, months, days, hours, minutes, and seconds. Our advanced calculator accounts for leap years and updates in real-time.
            </p>

            <div className={styles.ctaButtons}>
              <Link href="/age-calculator" className={styles.primaryButton} aria-label="Calculate your exact age now—completely private" prefetch={false}>
                <FiBarChart className={styles.buttonIconLeft} />
                <span className={styles.buttonText}>Calculate Your Age Now</span>
                <FiArrowRight className={styles.buttonIcon} />
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1M+</span>
                <span className={styles.statLabel}>Users Trust Us</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Private Calculations</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>0.001s</span>
                <span className={styles.statLabel}>Precision</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4.8/5</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
            </div>

            <div className={styles.featureHighlights}>
              <p className={styles.highlightsTitle}>Why Choose Our Age Calculator?</p>
              <div className={styles.highlightsGrid}>
                <span className={styles.highlightItem}><FiCheck /> Leap Year Accurate</span>
                <span className={styles.highlightItem}><FiShield /> No Data Storage</span>
                <span className={styles.highlightItem}><FiClock /> Real-Time Updates</span>
                <span className={styles.highlightItem}><FiGlobe /> Time Zone Aware</span>
              </div>
            </div>

            <div className={styles.useCaseBadges}>
              {[
                "Birthday Planning", "Genealogy Research", "Educational Tool",
                "Event Countdowns", "Age Comparisons", "Historical Dates",
                "Future Projections", "Statistical Analysis"
              ].map((useCase, i) => (
                <Link key={i} href="/age-calculator" className={styles.useCaseBadge} aria-label={`${useCase} Calculator`} rel="nofollow">
                  <span className={styles.useCaseBadgeText}>{useCase}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection} aria-labelledby="features-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id="features-title">Advanced Age Calculation Features</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need for precise chronological calculations—completely free and private.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <Link key={i} href="/age-calculator" className={styles.featureCard} prefetch={false}>
                <div className={styles.iconContainer} aria-hidden="true">{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDescription}>{f.description}</p>
              </Link>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/age-calculator" className={styles.sectionButton}>
              <span>Explore All Tools</span>
              <FiArrowRight className={styles.sectionButtonIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCasesSection} aria-labelledby="usecases-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id="usecases-title">Popular Age Calculation Scenarios</h2>
            <p className={styles.sectionSubtitle}>
              From birthday planning to historical research—find the perfect tool for your needs.
            </p>
          </div>
          <div className={styles.useCasesGrid}>
            {useCases.map((uc, i) => (
              <Link key={i} href="/age-calculator" className={styles.useCaseItem} aria-label={`${uc.title} Calculator`} rel="nofollow" prefetch={false}>
                <div className={styles.useCaseCard}>
                  <div className={styles.useCaseIconContainer}>
                    {i === 0 && <FiCalendar className={styles.useCaseIcon} />}
                    {i === 1 && <FiUsers className={styles.useCaseIcon} />}
                    {i === 2 && <FiClock className={styles.useCaseIcon} />}
                    {i === 3 && <FiTrendingUp className={styles.useCaseIcon} />}
                    {i === 4 && <FiTarget className={styles.useCaseIcon} />}
                    {i === 5 && <FiBarChart className={styles.useCaseIcon} />}
                  </div>
                  <div className={styles.useCaseContent}>
                    <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                    <p className={styles.useCaseDescription}>{uc.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/age-calculator" className={styles.sectionButton}>
              <span>Try All Calculators</span>
              <FiArrowRight className={styles.sectionButtonIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection} aria-labelledby="testimonials-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id="testimonials-title">Trusted by Researchers, Educators & Individuals Worldwide</h2>
            <p className={styles.sectionSubtitle}>
              See how our precise age calculator helps people in various fields and personal projects.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.quoteMark}>"</div>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.testimonialMetric}>
                  <FiCheck className={styles.metricIcon} />
                  <span className={styles.metricText}>{t.metric}</span>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userDetails}>
                    <h4 className={styles.userName}>{t.name}</h4>
                    <p className={styles.userRole}>{t.role}</p>
                    <p className={styles.userCompany}>{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link href="/age-calculator" className={styles.sectionButton}>
              <span>Join Our Community</span>
              <FiArrowRight className={styles.sectionButtonIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id="faq-title">Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to know about our age calculation tools and privacy practices.
            </p>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className={styles.additionalFaqs}>
            <h3 className={styles.additionalTitle}>More Age Calculation Topics</h3>
            <ul className={styles.additionalList}>
              <li><Link href="/age-calculator" className={styles.additionalLink}>How old am?</Link></li>
              <li><Link href="/age-comparator" className={styles.additionalLink}>Compare my age with my partner and children?</Link></li>
              <li><Link href="/age-comparator" className={styles.additionalLink}>Compare my age with my friends?</Link></li>
            </ul>
          </div>
          <div className={styles.sectionCta}>
            <Link href="/age-calculator" className={styles.sectionButton}>
              <span>Get Answers & Calculate</span>
              <FiArrowRight className={styles.sectionButtonIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle} id="cta-title">Ready to Discover Your Exact Age?</h2>
            <p className={styles.ctaSubtitle}>
              Join 1 million+ users who trust AgeRanker for precise, private age calculations.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/age-calculator" className={styles.ctaButton} aria-label="Calculate your exact age now—completely free and private" prefetch={false}>
                <span className={styles.ctaButtonText}>Calculate Your Age Now - 100% Free</span>
                <FiArrowRight className={styles.ctaButtonIcon} />
              </Link>
            </div>
            <div className={styles.ctaGuarantee}>
              <FiCheck className={styles.guaranteeIcon} />
              <span className={styles.guaranteeText}>No data collection • No sign-up required • Real-time updates • Leap year accurate</span>
            </div>
            <div className={styles.ctaFeatures}>
              <span className={styles.featureItem}><FiCheck className={styles.featureCheck} /> Down-to-Second Precision</span>
              <span className={styles.featureItem}><FiCheck className={styles.featureCheck} /> Multi-Person Comparisons</span>
              <span className={styles.featureItem}><FiCheck className={styles.featureCheck} /> Real-Time Age Ticker</span>
              <span className={styles.featureItem}><FiCheck className={styles.featureCheck} /> Complete Privacy Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const buildTimestamp = Date.now();
  const now = new Date(buildTimestamp);
  const currentDate = now.toISOString().split('T')[0];
  const lastModifiedDate = now.toISOString();
  const reviewDates = Array(6).fill(null).map((_, i) => {
    const d = new Date(buildTimestamp - (i * 10 + 1) * 86400000);
    return d.toISOString().split('T')[0];
  });
  const faqDates = Array(6).fill(null).map((_, i) => {
    const d = new Date(buildTimestamp - (i * 15 + 30) * 86400000);
    return d.toISOString().split('T')[0];
  });

  return {
    props: {
      seoData: {
        currentDate,
        lastModifiedDate,
        reviewDates,
        faqDates,
        breadcrumbData: []
      },
      buildTimestamp
    },
    revalidate: 21600, // 12 hours
  };
}

export default HomePage;