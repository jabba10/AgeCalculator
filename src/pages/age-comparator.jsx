import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './AgeComparator.module.css';

// Pre-render this page at build time for optimal SEO
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const AgeComparator = () => {
  const [people, setPeople] = useState([
    { id: 1, name: '', birthDate: '' },
    { id: 2, name: '', birthDate: '' }
  ]);
  const [calculated, setCalculated] = useState(false);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Comprehensive keyword lists for SEO
  const shortKeywords = [
    'age comparator', 'compare ages', 'age difference', 'multiple age comparison', 
    'people age comparison', 'age gap calculator', 'birth date comparison',
    'who is older', 'age ranking', 'family age comparison', 'friends age compare',
    'age calculator multiple', 'compare birthdays', 'age order', 'oldest youngest',
    'age timeline', 'generational comparison', 'age spread', 'relative age'
  ];

  const longTailKeywords = [
    'compare ages between multiple people calculator',
    'age difference calculator for 2 to 6 people',
    'who is older comparison tool with exact age difference',
    'family age comparison find oldest to youngest',
    'compare friends ages with precise calculations',
    'multiple person age comparator with detailed results',
    'age gap calculator between siblings or family members',
    'birth date comparison tool with ranking system',
    'calculate age differences in years months days',
    'free online age comparator for groups of people',
    'age comparison tool with fun facts and insights',
    'compare ages of team members or classmates',
    'generational age difference calculator',
    'age timeline creator for multiple people',
    'who is the oldest in our group calculator',
    'age spread calculator between multiple persons',
    'relative age comparison with exact time differences',
    'compare birth dates to find age hierarchy',
    'multiple age calculator with ranking order',
    'age comparator tool for families and friends'
  ];

  // Structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age Comparator Tool - Compare Multiple People's Ages Precisely",
    "description": "Free online age comparator to compare ages between 2 to 6 people. Calculate exact age differences in years, months, days with detailed rankings and fun comparisons.",
    "url": "https://www.ageranker.com/age-comparator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "AgeRanker"
    },
    "featureList": [
      "Compare 2-6 people's ages simultaneously",
      "Precise age difference calculations in years, months, days",
      "Automatic age ranking from oldest to youngest",
      "Detailed comparison metrics and fun facts",
      "Multiple time unit comparisons",
      "Mobile-friendly responsive design"
    ],
    "screenshot": [
      "https://www.ageranker.com/images/age-comparator-screenshot1.jpg",
      "https://www.ageranker.com/images/age-comparator-screenshot2.jpg"
    ]
  };

  // Helper: Parse DD/MM/YYYY into a valid Date
  const parseDate = (dateString) => {
    if (!dateString) return null;

    const parts = dateString.trim().split(/[/\-]/).map(part => part.trim());
    if (parts.length !== 3) return null;

    let [day, month, year] = parts.map(Number);
    
    // Handle 2-digit years
    if (year < 100) {
      year = year + (year > 29 ? 1900 : 2000);
    }

    if (!day || !month || !year) return null;

    const date = new Date(year, month - 1, day);
    
    // Validate the date
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  };

  const isValidDate = (dateString) => {
    return dateString && parseDate(dateString) !== null;
  };

  const addPerson = () => {
    if (people.length >= 6) return;
    const newId = Math.max(...people.map(p => p.id), 0) + 1;
    setPeople([...people, { id: newId, name: '', birthDate: '' }]);
  };

  const removePerson = (id) => {
    if (people.length <= 2) return;
    setPeople(people.filter(person => person.id !== id));
  };

  const handlePersonChange = (id, field, value) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  const handleDateInputChange = (e, id) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length >= 1) formatted += value.slice(0, 2);
    if (value.length >= 3) formatted += '/' + value.slice(2, 4);
    if (value.length >= 5) formatted += '/' + value.slice(4, 6);
    if (value.length >= 7) formatted += value.slice(6, 8);

    handlePersonChange(id, 'birthDate', formatted);
  };

  // Enhanced age calculation with precise date comparison
  const calculateAge = (birthDate, referenceDate = new Date()) => {
    const birth = new Date(birthDate);
    const reference = new Date(referenceDate);

    let years = reference.getFullYear() - birth.getFullYear();
    let months = reference.getMonth() - birth.getMonth();
    let days = reference.getDate() - birth.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      const lastMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const ageInMilliseconds = reference - birth;
    const totalDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(ageInMilliseconds / (1000 * 60));
    const totalSeconds = Math.floor(ageInMilliseconds / 1000);

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      ageInMilliseconds
    };
  };

  // Enhanced comparison logic
  const calculateComparison = () => {
    const hasEmptyNames = people.some(p => !p.name.trim());
    const hasInvalidDates = people.some(p => !isValidDate(p.birthDate));

    if (hasEmptyNames) {
      alert("Please enter names for all people.");
      return;
    }

    if (hasInvalidDates) {
      alert("Please enter valid birth dates in DD/MM/YYYY format for all people.");
      return;
    }

    setIsAnimating(true);

    const today = new Date();
    
    // Calculate ages for all people
    const peopleWithAges = people.map(person => {
      const birthDate = parseDate(person.birthDate);
      const ageData = calculateAge(birthDate, today);

      return {
        ...person,
        birthDate,
        ...ageData
      };
    });

    // Sort by birth date (oldest first)
    const sortedPeople = [...peopleWithAges].sort((a, b) => 
      a.birthDate - b.birthDate
    );

    // Calculate differences between consecutive people
    const comparisons = [];
    for (let i = 0; i < sortedPeople.length - 1; i++) {
      const older = sortedPeople[i];
      const younger = sortedPeople[i + 1];
      
      // Calculate difference using the younger person's birth date as reference
      const diffData = calculateAge(older.birthDate, younger.birthDate);

      comparisons.push({
        olderPerson: older,
        youngerPerson: younger,
        diffYears: diffData.years,
        diffMonths: diffData.months,
        diffDays: diffData.days,
        diffTotalDays: diffData.totalDays,
        diffTotalHours: diffData.totalHours,
        diffTotalMinutes: diffData.totalMinutes,
        diffTotalSeconds: diffData.totalSeconds
      });
    }

    setComparisonResults({ 
      sortedPeople, 
      comparisons,
      totalPeople: sortedPeople.length
    });
    setCalculated(true);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const resetComparator = () => {
    setPeople([
      { id: 1, name: '', birthDate: '' },
      { id: 2, name: '', birthDate: '' }
    ]);
    setCalculated(false);
    setComparisonResults(null);
  };

  const getAgeString = (person) => {
    return `${person.years} years, ${person.months} months, ${person.days} days`;
  };

  // Generate fun facts based on comparisons
  const generateFunFacts = (comparisons) => {
    const facts = [];

    comparisons.forEach((comparison, index) => {
      const { olderPerson, youngerPerson, diffTotalDays, diffYears } = comparison;

      facts.push(
        {
          icon: '👶',
          text: `When ${olderPerson.name} was born, ${youngerPerson.name} would be born in ${diffYears} years`
        },
        {
          icon: '📅',
          text: `${olderPerson.name} is ${diffTotalDays.toLocaleString()} days older than ${youngerPerson.name}`
        },
        {
          icon: '💓',
          text: `${olderPerson.name}'s heart has beaten ~${(diffTotalDays * 24 * 60 * 70).toLocaleString()} more times than ${youngerPerson.name}'s`
        },
        {
          icon: '🌙',
          text: `${olderPerson.name} has seen ~${Math.floor(diffTotalDays / 27.3)} more full moons than ${youngerPerson.name}`
        },
        {
          icon: '🎂',
          text: `${olderPerson.name} celebrated ${diffYears} more birthdays than ${youngerPerson.name}`
        },
        {
          icon: '🌍',
          text: `Earth orbited the Sun ${diffYears} more times during ${olderPerson.name}'s life than ${youngerPerson.name}'s`
        }
      );
    });

    return facts;
  };

  return (
    <div className={styles.appContainer}>
      <Head>
        {/* Basic SEO */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Age Comparator | Compare Multiple People&apos;s Ages Precisely | 2025</title>
        <meta 
          name="description" 
          content="Compare ages between 2 to 6 people with our advanced age comparator. Calculate precise differences in years, months, days with automatic ranking and fun comparisons." 
        />
        <meta 
          name="keywords" 
          content={`${shortKeywords.join(', ')}, ${longTailKeywords.slice(0, 15).join(', ')}`}
        />
        <meta name="author" content="AgeRanker Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ageranker.com/age-comparator" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Age Comparator | Compare Multiple People's Ages Precisely" />
        <meta 
          property="og:description" 
          content="Compare ages between 2 to 6 people with automatic ranking. Calculate exact age differences in years, months, days with detailed comparisons and fun facts." 
        />
        <meta property="og:url" content="https://www.ageranker.com/age-comparator" />
        <meta property="og:image" content="https://www.ageranker.com/images/age-comparator-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Age Comparator showing multiple people age comparison with rankings" />
        <meta property="og:site_name" content="AgeRanker" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Age Comparator | Compare Multiple People's Ages" />
        <meta 
          name="twitter:description" 
          content="Compare ages between 2-6 people with precise calculations. Automatic ranking, detailed differences, and fun comparisons." 
        />
        <meta name="twitter:image" content="https://www.ageranker.com/images/age-comparator-twitter-image.jpg" />
        <meta name="twitter:image:alt" content="Multiple people age comparison tool with rankings" />
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

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            schemaData,
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How many people can I compare using this age comparator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can compare ages between 2 to 6 people simultaneously. The tool automatically ranks them from oldest to youngest and calculates precise age differences between each person."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What information do I need to provide for each person?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For each person, you need to provide their full name and birth date in DD/MM/YYYY format. The tool will automatically calculate their current age and compare them with others."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are the age difference calculations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The calculations are extremely accurate, accounting for leap years and providing differences in years, months, days, and even total days, hours, minutes, and seconds between people."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use this for family age comparisons?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! This tool is perfect for comparing ages within families, friend groups, teams, or any group of people. It helps you understand age hierarchies and generational differences."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my personal data stored when I use the comparator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, all calculations happen locally in your browser. We don't store any personal data or birth dates on our servers. Your privacy is completely protected."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.ageranker.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Age Comparator",
                  "item": "https://www.ageranker.com/age-comparator"
                }
              ]
            }
          ])} }
        />
      </Head>

      <header className={styles.appHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>👥 Smart Age Comparator</h1>
          <p className={styles.headerSubtitle}>
            Compare ages between 2 to 6 people with intelligent age detection and precise calculations
          </p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={`${styles.comparatorContainer} ${isAnimating ? styles.calculating : ''}`}>
          {/* People Input Section */}
          <div className={styles.peopleInputSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Enter Person Details</h2>
              <p className={styles.sectionSubtitle}>Add names and birth dates in DD/MM/YYYY format</p>
            </div>
            
            <div className={styles.peopleGrid}>
              {people.map((person, index) => (
                <div key={person.id} className={styles.personInputCard}>
                  <div className={styles.personHeader}>
                    <div className={styles.personNumber}>
                      <span className={styles.numberIcon}>👤</span>
                      Person {index + 1}
                    </div>
                    {people.length > 2 && (
                      <button 
                        onClick={() => removePerson(person.id)} 
                        className={styles.removePersonBtn}
                        aria-label={`Remove person ${index + 1}`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      <span className={styles.labelIcon}>📝</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={person.name}
                      onChange={(e) => handlePersonChange(person.id, 'name', e.target.value)}
                      className={styles.nameInput}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      <span className={styles.labelIcon}>🎂</span>
                      Birth Date
                    </label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={person.birthDate}
                      onChange={(e) => handleDateInputChange(e, person.id)}
                      className={styles.dateInput}
                    />
                    {person.birthDate && !isValidDate(person.birthDate) && (
                      <p className={styles.errorText}>Invalid date format. Use DD/MM/YYYY</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <div className={styles.buttonGroup}>
              {people.length < 6 && (
                <button onClick={addPerson} className={styles.addPersonBtn}>
                  <span className={styles.btnIcon}>➕</span>
                  Add Person
                </button>
              )}
              <button
                onClick={calculateComparison}
                disabled={people.some(p => !p.name.trim() || !isValidDate(p.birthDate))}
                className={styles.calculateBtn}
              >
                <span className={styles.btnIcon}>⚡</span>
                Compare Ages
              </button>
              <button onClick={resetComparator} className={styles.resetBtn}>
                <span className={styles.btnIcon}>🔄</span>
                Reset All
              </button>
            </div>
          </div>

          {/* Results Section */}
          {calculated && comparisonResults && (
            <div className={styles.resultsSection}>
              {/* Summary Header */}
              <div className={styles.resultHeader}>
                <h2 className={styles.resultTitle}>Age Comparison Results</h2>
                <p className={styles.summaryText}>
                  From oldest to youngest: {comparisonResults.sortedPeople.map(p => p.name).join(' → ')}
                </p>
              </div>

              {/* Age Rankings */}
              <div className={styles.rankingsSection}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>👑</span>
                  Age Rankings
                </h3>
                <div className={styles.rankingsGrid}>
                  {comparisonResults.sortedPeople.map((person, index) => (
                    <div key={person.id} className={styles.rankingCard}>
                      <div className={styles.rankBadge}>
                        #{index + 1}
                        {index === 0 && <span className={styles.oldestBadge}>Oldest</span>}
                        {index === comparisonResults.sortedPeople.length - 1 && <span className={styles.youngestBadge}>Youngest</span>}
                      </div>
                      <div className={styles.rankingContent}>
                        <h4 className={styles.personName}>{person.name}</h4>
                        <p className={styles.personAge}>{getAgeString(person)}</p>
                        <p className={styles.personDob}>
                          Born: {person.birthDate.toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                        <div className={styles.ageDetails}>
                          <span className={styles.ageDetail}>{person.totalDays.toLocaleString()} days</span>
                          <span className={styles.ageDetail}>{person.totalHours.toLocaleString()} hours</span>
                          <span className={styles.ageDetail}>{person.totalMinutes.toLocaleString()} minutes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Differences */}
              <div className={styles.comparisonsSection}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>🔄</span>
                  Detailed Age Differences
                </h3>
                <div className={styles.comparisonsGrid}>
                  {comparisonResults.comparisons.map((comparison, index) => (
                    <div key={index} className={styles.comparisonCard}>
                      <div className={styles.comparisonHeader}>
                        <div className={styles.personComparison}>
                          <span className={`${styles.personTag} ${styles.older}`}>
                            {comparison.olderPerson.name}
                          </span>
                          <span className={styles.vsText}>vs</span>
                          <span className={`${styles.personTag} ${styles.younger}`}>
                            {comparison.youngerPerson.name}
                          </span>
                        </div>
                        <p className={styles.comparisonSubtitle}>
                          Age difference: {comparison.diffYears} years, {comparison.diffMonths} months, {comparison.diffDays} days
                        </p>
                      </div>
                      
                      <div className={styles.comparisonBody}>
                        <div className={styles.differenceGrid}>
                          <div className={styles.differenceCard}>
                            <p className={styles.differenceValue}>{comparison.diffYears}</p>
                            <p className={styles.differenceLabel}>Years</p>
                          </div>
                          <div className={styles.differenceCard}>
                            <p className={styles.differenceValue}>{comparison.diffMonths}</p>
                            <p className={styles.differenceLabel}>Months</p>
                          </div>
                          <div className={styles.differenceCard}>
                            <p className={styles.differenceValue}>{comparison.diffDays}</p>
                            <p className={styles.differenceLabel}>Days</p>
                          </div>
                          <div className={styles.differenceCard}>
                            <p className={styles.differenceValue}>{comparison.diffTotalDays.toLocaleString()}</p>
                            <p className={styles.differenceLabel}>Total Days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className={styles.funFacts}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>✨</span>
                  Fun Comparisons & Insights
                </h3>
                <div className={styles.factsGrid}>
                  {generateFunFacts(comparisonResults.comparisons).map((fact, index) => (
                    <div key={index} className={styles.factCard}>
                      <span className={styles.factIcon}>{fact.icon}</span>
                      <p className={styles.factText}>{fact.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgeComparator;