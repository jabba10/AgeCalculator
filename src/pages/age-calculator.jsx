import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from './AgeCalculator.module.css';

// Pre-render this page at build time for optimal SEO
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [ageData, setAgeData] = useState(null);
  const [activeMode, setActiveMode] = useState('present');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [printMode, setPrintMode] = useState(false);

  // Comprehensive keyword lists for SEO
  const shortKeywords = [
    'age calculator', 'birth date', 'how old am I', 'age calculator online', 'date calculator',
    'birthday calculator', 'age finder', 'exact age', 'age in years', 'age in months',
    'age in days', 'age counter', 'birthday countdown', 'age difference', 'life calculator',
    'zodiac sign', 'chinese zodiac', 'moon phase', 'retirement calculator', 'life milestones',
    'historical events', 'age certificate', 'share age', 'print age', 'free calculator'
  ];

  const longTailKeywords = [
    'how old am I exactly today in years months days',
    'calculate my exact age from birth date to today',
    'free online age calculator with zodiac signs',
    'birth date calculator with life progress',
    'age calculator that shows months days hours seconds',
    'find out my exact age down to the second',
    'calculate age difference between two dates',
    'what is my chinese zodiac sign based on birth year',
    'moon phase on my birthday calculator',
    'retirement countdown calculator how many years until 65',
    'life milestones calculator when will I turn 30 40 50',
    'historical events that happened during my lifetime',
    'print age certificate with personal details',
    'share my age calculation results on social media',
    'mobile friendly age calculator that works offline',
    'accurate age calculator accounting for leap years',
    'age calculator with fun facts and statistics',
    'calculate how many days until my next birthday',
    'what percentage of my life have I lived calculator',
    'age comparison tool between two people'
  ];

  // Zodiac signs data
  const zodiacSigns = [
    { name: "Aries", start: [3, 21], end: [4, 19], symbol: "♈", element: "Fire" },
    { name: "Taurus", start: [4, 20], end: [5, 20], symbol: "♉", element: "Earth" },
    { name: "Gemini", start: [5, 21], end: [6, 20], symbol: "♊", element: "Air" },
    { name: "Cancer", start: [6, 21], end: [7, 22], symbol: "♋", element: "Water" },
    { name: "Leo", start: [7, 23], end: [8, 22], symbol: "♌", element: "Fire" },
    { name: "Virgo", start: [8, 23], end: [9, 22], symbol: "♍", element: "Earth" },
    { name: "Libra", start: [9, 23], end: [10, 22], symbol: "♎", element: "Air" },
    { name: "Scorpio", start: [10, 23], end: [11, 21], symbol: "♏", element: "Water" },
    { name: "Sagittarius", start: [11, 22], end: [12, 21], symbol: "♐", element: "Fire" },
    { name: "Capricorn", start: [12, 22], end: [1, 19], symbol: "♑", element: "Earth" },
    { name: "Aquarius", start: [1, 20], end: [2, 18], symbol: "♒", element: "Air" },
    { name: "Pisces", start: [2, 19], end: [3, 20], symbol: "♓", element: "Water" }
  ];

  // Chinese zodiac data
  const chineseZodiacs = [
    { name: "Rat", years: [2020, 2008, 1996, 1984, 1972, 1960], symbol: "🐀" },
    { name: "Ox", years: [2021, 2009, 1997, 1985, 1973, 1961], symbol: "🐂" },
    { name: "Tiger", years: [2022, 2010, 1998, 1986, 1974, 1962], symbol: "🐅" },
    { name: "Rabbit", years: [2023, 2011, 1999, 1987, 1975, 1963], symbol: "🐇" },
    { name: "Dragon", years: [2024, 2012, 2000, 1988, 1976, 1964], symbol: "🐉" },
    { name: "Snake", years: [2025, 2013, 2001, 1989, 1977, 1965], symbol: "🐍" },
    { name: "Horse", years: [2026, 2014, 2002, 1990, 1978, 1966], symbol: "🐎" },
    { name: "Goat", years: [2027, 2015, 2003, 1991, 1979, 1967], symbol: "🐐" },
    { name: "Monkey", years: [2028, 2016, 2004, 1992, 1980, 1968], symbol: "🐒" },
    { name: "Rooster", years: [2029, 2017, 2005, 1993, 1981, 1969], symbol: "🐓" },
    { name: "Dog", years: [2030, 2018, 2006, 1994, 1982, 1970], symbol: "🐕" },
    { name: "Pig", years: [2031, 2019, 2007, 1995, 1983, 1971], symbol: "🐖" }
  ];

  // Historical events data (sample)
  const historicalEvents = [
    { year: 2001, event: "9/11 Terrorist Attacks" },
    { year: 2008, event: "Global Financial Crisis" },
    { year: 2020, event: "COVID-19 Pandemic Begins" },
    { year: 2016, event: "First Detection of Gravitational Waves" },
    { year: 2012, event: "Mars Curiosity Rover Lands" },
    { year: 2004, event: "Facebook Launched" },
    { year: 1997, event: "First Harry Potter Book Published" },
    { year: 1995, event: "Windows 95 Released" },
    { year: 1991, event: "World Wide Web Invented" },
    { year: 1989, event: "Berlin Wall Falls" },
  ];

  // Helper: Parse MM/DD/YY or MM/DD/YYYY into a valid Date
  const parseDate = (dateString) => {
    if (!dateString) return null;

    // Remove extra spaces and split by / or -
    const parts = dateString.trim().split(/[/\-]/).map(part => part.trim());

    if (parts.length !== 3) return null;

    let [month, day, year] = parts.map(Number);

    // Handle 2-digit years (e.g., '24' -> 2024, '99' -> 1999)
    if (year < 100) {
      year = year + (year > 29 ? 1900 : 2000); // 30-99 → 1930-1999, 00-29 → 2000-2029
    }

    if (!month || !day || !year) return null;

    const date = new Date(year, month - 1, day); // Month is 0-indexed

    // Validate the date (e.g. Feb 30 → invalid)
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

  const formatToISO = (dateString) => {
    const date = parseDate(dateString);
    return date ? date.toISOString().split('T')[0] : null;
  };

  // Get zodiac sign based on birth date
  const getZodiacSign = (date) => {
    if (!date) return null;
    
    const month = date.getMonth() + 1; // JS months are 0-indexed
    const day = date.getDate();
    
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month > startMonth || month < endMonth || 
         (month === startMonth && day >= startDay) || 
         (month === endMonth && day <= endDay)))
      ) {
        return sign;
      }
    }
    return null;
  };

  // Get Chinese zodiac based on birth year
  const getChineseZodiac = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    
    for (const zodiac of chineseZodiacs) {
      if (zodiac.years.includes(year)) {
        return zodiac;
      }
    }
    return null;
  };

  // Calculate moon phase on birthday
  const getMoonPhase = (date) => {
    if (!date) return null;
    
    // Simple approximation (not astronomically precise)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Calculate phase (0-29.5 days)
    const c = Math.floor((year % 100) * 11);
    const e = (month < 3) ? year - 1 : year;
    const jd = Math.floor(365.25 * (e + 4716)) + Math.floor(30.6001 * (month + 1)) + day + c - 1524.5;
    const phase = (jd - 2451550.1) / 29.530588853;
    const normalized = (phase - Math.floor(phase)) * 29.53;
    
    if (normalized < 1) return { name: "New Moon", emoji: "🌑" };
    if (normalized < 7.4) return { name: "Waxing Crescent", emoji: "🌒" };
    if (normalized < 8) return { name: "First Quarter", emoji: "🌓" };
    if (normalized < 14.8) return { name: "Waxing Gibbous", emoji: "🌔" };
    if (normalized < 15.8) return { name: "Full Moon", emoji: "🌕" };
    if (normalized < 22.2) return { name: "Waning Gibbous", emoji: "🌖" };
    if (normalized < 23) return { name: "Last Quarter", emoji: "🌗" };
    return { name: "Waning Crescent", emoji: "🌘" };
  };

  // Calculate countdown to next birthday
  const getNextBirthday = (birthDate) => {
    if (!birthDate) return null;
    
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create next birthday date
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    // If birthday already passed this year, set to next year
    if (nextBirthday < today) {
      nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    // Calculate difference in days
    const diff = nextBirthday - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return {
      date: nextBirthday,
      days: days,
      isToday: days === 0
    };
  };

  // Calculate life milestones
  const getLifeMilestones = (birthDate) => {
    if (!birthDate) return null;
    
    const milestones = [];
    const currentAge = new Date().getFullYear() - birthDate.getFullYear();
    
    // Add decade milestones
    for (let age = 10; age <= 100; age += 10) {
      if (age > currentAge) {
        const milestoneDate = new Date(birthDate);
        milestoneDate.setFullYear(birthDate.getFullYear() + age);
        milestones.push({
          age: age,
          date: milestoneDate,
          yearsLeft: age - currentAge
        });
      }
    }
    
    // Add specific age milestones
    const specificAges = [18, 21, 30, 40, 50, 65];
    specificAges.forEach(age => {
      if (age > currentAge) {
        const milestoneDate = new Date(birthDate);
        milestoneDate.setFullYear(birthDate.getFullYear() + age);
        milestones.push({
          age: age,
          date: milestoneDate,
          yearsLeft: age - currentAge
        });
      }
    });
    
    // Sort by age
    milestones.sort((a, b) => a.age - b.age);
    
    return milestones;
  };

  // Calculate retirement countdown (assuming retirement at 65)
  const getRetirementCountdown = (birthDate) => {
    if (!birthDate) return null;
    
    const retirementAge = 65;
    const currentAge = new Date().getFullYear() - birthDate.getFullYear();
    
    if (currentAge >= retirementAge) return null;
    
    const retirementDate = new Date(birthDate);
    retirementDate.setFullYear(birthDate.getFullYear() + retirementAge);
    
    const diff = retirementDate - new Date();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    return {
      yearsLeft: retirementAge - currentAge,
      retirementDate: retirementDate,
      years: years,
      months: months
    };
  };

  // Calculate life progress (assuming average lifespan of 80 years)
  const getLifeProgress = (birthDate) => {
    if (!birthDate) return null;
    
    const averageLifespan = 80;
    const currentAge = new Date().getFullYear() - birthDate.getFullYear();
    const progress = (currentAge / averageLifespan) * 100;
    
    return {
      progress: Math.min(progress, 100),
      yearsLived: currentAge,
      yearsLeft: averageLifespan - currentAge
    };
  };

  // Get historical events during user's lifetime
  const getHistoricalEvents = (birthDate) => {
    if (!birthDate) return null;
    
    const birthYear = birthDate.getFullYear();
    const currentYear = new Date().getFullYear();
    
    return historicalEvents.filter(event => 
      event.year >= birthYear && event.year <= currentYear
    ).sort((a, b) => b.year - a.year);
  };

  // Generate shareable URL
  const generateShareUrl = () => {
    if (!birthDate || !isValidDate(birthDate)) return;
    
    const baseUrl = window.location.href.split('?')[0];
    const params = new URLSearchParams();
    params.append('birthdate', formatToISO(birthDate));
    
    if (targetDate && isValidDate(targetDate)) {
      params.append('targetdate', formatToISO(targetDate));
      params.append('mode', activeMode);
    }
    
    const url = `${baseUrl}?${params.toString()}`;
    setShareUrl(url);
    return url;
  };

  // Copy share URL to clipboard
  const copyShareUrl = () => {
    const url = generateShareUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      alert("Shareable link copied to clipboard!");
    }
  };

  // Share via social media
  const shareOnSocial = (platform) => {
    const url = generateShareUrl();
    if (!url) return;
    
    const text = `Check out my age details! I was born on ${birthDate}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=My Age Details&body=${encodeURIComponent(`${text}\n\n${url}`)}`);
        break;
      default:
        break;
    }
  };

  // Print age certificate
  const printCertificate = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 500);
  };

  // Load from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const birthdateParam = params.get('birthdate');
    const targetdateParam = params.get('targetdate');
    const modeParam = params.get('mode');
    
    if (birthdateParam) {
      const date = new Date(birthdateParam);
      if (!isNaN(date.getTime())) {
        const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        setBirthDate(formatted);
        
        if (targetdateParam) {
          const targetDate = new Date(targetdateParam);
          if (!isNaN(targetDate.getTime())) {
            const formattedTarget = `${targetDate.getMonth() + 1}/${targetDate.getDate()}/${targetDate.getFullYear()}`;
            setTargetDate(formattedTarget);
          }
        }
        
        if (modeParam && ['past', 'present', 'future'].includes(modeParam)) {
          setActiveMode(modeParam);
        }
        
        // Calculate automatically if birthdate is valid
        setTimeout(() => {
          calculateAge();
        }, 300);
      }
    }
  }, []);

  const calculateAge = () => {
    if (!birthDate || !isValidDate(birthDate)) {
      alert("Please enter a valid birth date in MM/DD/YY or MM/DD/YYYY format.");
      return;
    }

    if (activeMode !== 'present' && (!targetDate || !isValidDate(targetDate))) {
      alert(`Please enter a valid ${activeMode} date in MM/DD/YY or MM/DD/YYYY format.`);
      return;
    }

    setIsAnimating(true);

    const birth = parseDate(birthDate);
    const target = targetDate ? parseDate(targetDate) : new Date();

    const diff = target - birth;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);

    // Calculate additional features
    const zodiacSign = getZodiacSign(birth);
    const chineseZodiac = getChineseZodiac(birth);
    const nextBirthday = getNextBirthday(birth);
    const lifeMilestones = getLifeMilestones(birth);
    const retirementCountdown = getRetirementCountdown(birth);
    const lifeProgress = getLifeProgress(birth);
    const historicalEvents = getHistoricalEvents(birth);
    const moonPhase = getMoonPhase(birth);

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      isPast: target < new Date(),
      isFuture: target > new Date(),
      isPresent: target.toDateString() === new Date().toDateString(),
      zodiacSign,
      chineseZodiac,
      nextBirthday,
      lifeMilestones,
      retirementCountdown,
      lifeProgress,
      historicalEvents,
      moonPhase,
      birthDate: birth
    });

    setCalculated(true);
    generateShareUrl();

    setTimeout(() => setIsAnimating(false), 600);
  };

  const resetCalculator = () => {
    setBirthDate('');
    setTargetDate('');
    setCalculated(false);
    setAgeData(null);
    setShareUrl('');
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === 'present') {
      setTargetDate('');
      if (birthDate) calculateAge();
    }
  };

  // Auto-format input: insert / after MM and DD
  const handleInputChange = (e, setter) => {
    let value = e.target.value.replace(/\D/g, ''); // Only digits
    let formatted = '';

    if (value.length >= 1) formatted += value.slice(0, 2);
    if (value.length >= 3) formatted += '/' + value.slice(2, 4);
    if (value.length >= 5) formatted += '/' + value.slice(4, 6); // YY or partial YYYY
    if (value.length >= 7) formatted += value.slice(6, 8); // Finish YYYY

    setter(formatted);
  };

  const ageCards = [
    {
      title: "Years",
      value: ageData?.years || '--',
      unit: "years",
      icon: "📅",
    },
    {
      title: "Months",
      value: ageData ? ageData.years * 12 + ageData.months : '--',
      unit: "months",
      icon: "🗓️",
    },
    {
      title: "Weeks",
      value: ageData?.totalDays ? Math.floor(ageData.totalDays / 7) : '--',
      unit: "weeks",
      icon: "📆",
    },
    {
      title: "Days",
      value: ageData?.totalDays || '--',
      unit: "days",
      icon: "🌞",
    },
    {
      title: "Hours",
      value: ageData?.totalHours || '--',
      unit: "hours",
      icon: "⏰",
    },
    {
      title: "Minutes",
      value: ageData?.totalMinutes || '--',
      unit: "minutes",
      icon: "⏱️",
    },
    {
      title: "Seconds",
      value: ageData?.totalSeconds || '--',
      unit: "seconds",
      icon: "⏳",
    },
    {
      title: "Heartbeats",
      value: ageData?.totalMinutes ? (ageData.totalMinutes * 70).toLocaleString() : '--',
      unit: "beats",
      icon: "💓",
    },
  ];

  const funFacts = ageData
    ? [
        { icon: '🔄', text: `You've experienced ${Math.floor(ageData.totalDays / 365.25)} full seasons.` },
        { icon: '👁️', text: `You've blinked about ${(ageData.totalHours * 900).toLocaleString()} times.` },
        { icon: '🌙', text: `You've seen ${Math.floor(ageData.totalDays / 27.3)} full moons.` },
        { icon: '📅', text: `You've lived through ${Math.floor(ageData.years / 10)} decade(s).` },
        { icon: '💓', text: `Your heart has beaten ${(ageData.totalMinutes * 70).toLocaleString()} times.` },
        { icon: '🌬️', text: `You've taken roughly ${(ageData.totalMinutes * 12).toLocaleString()} breaths.` },
        { icon: '👟', text: `You've walked approximately ${(ageData.totalDays * 5).toLocaleString()} km in life!` },
        { icon: '☕', text: `You've likely enjoyed ${Math.floor(ageData.totalDays / 2)} cups of coffee.` },
        { icon: '🌍', text: `Earth has orbited the Sun ${ageData.years} times since you were born.` },
        { icon: '🚀', text: `Light could circle Earth ${Math.floor((ageData.totalSeconds * 299792) / 40075)} times in your lifetime!` },
      ]
    : [];

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Free Age Calculator | Exact Age in Years, Months, Days | 2025</title>
        <meta
          name="description"
          content="Calculate your exact age in years, months, days, hours & seconds. Discover zodiac signs, life milestones, retirement countdown & historical events. Free & accurate!"
        />
        <meta
          name="keywords"
          content={`${shortKeywords.join(', ')}, ${longTailKeywords.slice(0, 15).join(', ')}`}
        />
        <meta name="author" content="Age Calculator Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ageranker.com/age-calculator" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Age Calculator | Exact Age Down to Seconds" />
        <meta
          property="og:description"
          content="Calculate your precise age with zodiac signs, life milestones & historical events. 100% free, no registration required."
        />
        <meta property="og:url" content="https://www.ageranker.com/age-calculator" />
        <meta property="og:image" content="https://www.ageranker.com/images/age-calculator-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Age Calculator with detailed results showing years, months, days and zodiac signs" />
        <meta property="og:site_name" content="AgeRanker" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Age Calculator | Zodiac Signs & Life Milestones" />
        <meta
          name="twitter:description"
          content="Discover your exact age with zodiac signs, Chinese zodiac, moon phase & life progress. Calculate instantly!"
        />
        <meta name="twitter:image" content="https://www.ageranker.com/images/age-calculator-twitter.jpg" />
        <meta name="twitter:image:alt" content="Comprehensive age calculator with multiple features" />
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Age Calculator - Exact Age Calculator",
                "description": "Free online tool to calculate exact age in years, months, days, hours and seconds with zodiac signs and life milestones",
                "url": "https://www.ageranker.com/age-calculator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Any",
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
                  "Exact age calculation in years, months, days",
                  "Zodiac sign and Chinese zodiac calculator",
                  "Life milestones and retirement countdown",
                  "Historical events during your lifetime",
                  "Moon phase on your birthday",
                  "Life progress percentage calculator",
                  "Share and print age certificates"
                ].join(', '),
                "screenshot": [
                  "https://www.ageranker.com/images/age-calculator-screenshot1.jpg",
                  "https://www.ageranker.com/images/age-calculator-screenshot2.jpg"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How accurate is this age calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our age calculator is extremely accurate, accounting for leap years and calculating down to the second. It uses precise date calculations to provide your exact age in years, months, days, hours, minutes, and seconds."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I calculate my age for past or future dates?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! You can calculate your age for any date - past, present, or future. Use the mode selector to choose between present age, past age calculation, or future age prediction."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What additional features does this age calculator offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Beyond basic age calculation, we provide zodiac signs, Chinese zodiac, moon phase on your birthday, life milestones, retirement countdown, life progress percentage, historical events during your lifetime, and fun facts about your age."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is my personal data stored when I use the calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No, we do not store any personal data. All calculations happen locally in your browser and are never sent to our servers. Your privacy is completely protected."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I share or print my age calculation results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! You can share your results via social media, copy a shareable link, or print a beautiful age certificate with all your calculated details."
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
                    "name": "Age Calculator",
                    "item": "https://www.ageranker.com/age-calculator"
                  }
                ]
              }
            ]),
          }}
        />
      </Head>

      <div className={`${styles.appContainer} ${printMode ? styles.printMode : ''}`}>
        {printMode && (
          <div className={styles.printHeader}>
            <h1>Official Age Certificate</h1>
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        )}

        <header className={styles.appHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>⏱️ Advanced Age Calculator</h1>
            <p className={styles.headerSubtitle}>Calculate your exact age with zodiac signs, life milestones & historical events</p>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={`${styles.calculatorContainer} ${isAnimating ? styles.calculating : ''}`}>
            <div className={styles.modeSelector}>
              {['past', 'present', 'future'].map((mode) => (
                <button
                  key={mode}
                  className={`${styles.modeBtn} ${activeMode === mode ? styles.active : ''}`}
                  onClick={() => handleModeChange(mode)}
                >
                  <span className={styles.modeIcon}>
                    {mode === 'past' && '🕰️'}
                    {mode === 'present' && '⏳'}
                    {mode === 'future' && '🚀'}
                  </span>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.dateInputSection}>
              <div className={styles.inputCard}>
                <label className={styles.inputLabel}>
                  <span className={styles.labelIcon}>🎂</span>
                  Birth Date
                </label>
                <input
                  type="text"
                  placeholder="MM/DD/YY"
                  value={birthDate}
                  onChange={(e) => handleInputChange(e, setBirthDate)}
                  className={styles.dateInput}
                  aria-label="Enter birth date as MM/DD/YY"
                />
                {birthDate && !isValidDate(birthDate) && (
                  <p className={styles.errorText}>Invalid date. Use MM/DD/YY (e.g., 03/15/95).</p>
                )}
              </div>

              {activeMode !== 'present' && (
                <div className={styles.inputCard}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>{activeMode === 'past' ? '📜' : '🚀'}</span>
                    {activeMode === 'past' ? 'Past Date' : 'Future Date'}
                  </label>
                  <input
                    type="text"
                    placeholder="MM/DD/YY"
                    value={targetDate}
                    onChange={(e) => handleInputChange(e, setTargetDate)}
                    className={styles.dateInput}
                    aria-label={activeMode === 'past' ? "Enter past date" : "Enter future date"}
                  />
                  {targetDate && !isValidDate(targetDate) && (
                    <p className={styles.errorText}>Invalid date. Use MM/DD/YY.</p>
                  )}
                </div>
              )}
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={calculateAge}
                disabled={!birthDate || (activeMode !== 'present' && !targetDate)}
                className={styles.calculateBtn}
              >
                Calculate My Exact Age
              </button>
              <button onClick={resetCalculator} className={styles.resetBtn}>
                Reset
              </button>
            </div>

            {calculated && ageData && (
              <div className={styles.resultsSection}>
                <div className={styles.resultHeader}>
                  <h2 className={styles.resultTitle}>
                    {ageData.isPresent && "Your Current Age"}
                    {ageData.isPast && "Your Age on That Day"}
                    {ageData.isFuture && "Your Future Age"}
                  </h2>
                  <p className={styles.ageSummary}>
                    {ageData.years} years, {ageData.months} months, {ageData.days} days
                  </p>
                </div>

                <div className={styles.ageCardsGrid}>
                  {ageCards.map((card, index) => (
                    <AgeCard
                      key={index}
                      title={card.title}
                      value={card.value}
                      unit={card.unit}
                      icon={card.icon}
                      delay={index * 0.08}
                    />
                  ))}
                </div>

                {/* New Features Section */}
                <div className={styles.featuresSection}>
                  {/* Zodiac Signs */}
                  <div className={styles.featureCard}>
                    <h3 className={styles.featureTitle}>🌠 Astrological Profile</h3>
                    <div className={styles.zodiacInfo}>
                      {ageData.zodiacSign && (
                        <div className={styles.zodiacItem}>
                          <span className={styles.zodiacIcon}>{ageData.zodiacSign.symbol}</span>
                          <div>
                            <p className={styles.zodiacName}>{ageData.zodiacSign.name}</p>
                            <p className={styles.zodiacDetail}>Western Zodiac ({ageData.zodiacSign.element})</p>
                          </div>
                        </div>
                      )}
                      {ageData.chineseZodiac && (
                        <div className={styles.zodiacItem}>
                          <span className={styles.zodiacIcon}>{ageData.chineseZodiac.symbol}</span>
                          <div>
                            <p className={styles.zodiacName}>{ageData.chineseZodiac.name}</p>
                            <p className={styles.zodiacDetail}>Chinese Zodiac</p>
                          </div>
                        </div>
                      )}
                      {ageData.moonPhase && (
                        <div className={styles.zodiacItem}>
                          <span className={styles.zodiacIcon}>{ageData.moonPhase.emoji}</span>
                          <div>
                            <p className={styles.zodiacName}>{ageData.moonPhase.name}</p>
                            <p className={styles.zodiacDetail}>Moon Phase on Your Birthday</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Countdown to Next Birthday */}
                  {ageData.nextBirthday && (
                    <div className={styles.featureCard}>
                      <h3 className={styles.featureTitle}>🎂 Next Birthday</h3>
                      <div className={styles.countdownBox}>
                        {ageData.nextBirthday.isToday ? (
                          <p className={styles.birthdayToday}>🎉 Today is your birthday! 🎉</p>
                        ) : (
                          <>
                            <p className={styles.countdownDays}>{ageData.nextBirthday.days}</p>
                            <p className={styles.countdownLabel}>days until your next birthday</p>
                            <p className={styles.countdownDate}>
                              on {ageData.nextBirthday.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Life Progress Bar */}
                  {ageData.lifeProgress && (
                    <div className={styles.featureCard}>
                      <h3 className={styles.featureTitle}>⏳ Life Progress</h3>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{ width: `${ageData.lifeProgress.progress}%` }}
                          ></div>
                        </div>
                        <div className={styles.progressStats}>
                          <p>Lived: {ageData.lifeProgress.yearsLived} years</p>
                          <p>Remaining: ~{ageData.lifeProgress.yearsLeft} years</p>
                        </div>
                        <p className={styles.progressNote}>
                          Based on average lifespan of 80 years ({(ageData.lifeProgress.progress).toFixed(1)}% complete)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Life Milestones */}
                  {ageData.lifeMilestones && ageData.lifeMilestones.length > 0 && (
                    <div className={styles.featureCard}>
                      <h3 className={styles.featureTitle}>🏆 Life Milestones</h3>
                      <div className={styles.milestonesGrid}>
                        {ageData.lifeMilestones.map((milestone, index) => (
                          <div key={index} className={styles.milestoneItem}>
                            <span className={styles.milestoneAge}>{milestone.age}</span>
                            <p className={styles.milestoneLabel}>years old in</p>
                            <p className={styles.milestoneDate}>{milestone.date.getFullYear()}</p>
                            <p className={styles.milestoneYearsLeft}>
                              {milestone.yearsLeft} {milestone.yearsLeft === 1 ? 'year' : 'years'} from now
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Retirement Countdown */}
                  {ageData.retirementCountdown && (
                    <div className={styles.featureCard}>
                      <h3 className={styles.featureTitle}>🏖️ Retirement Countdown</h3>
                      <div className={styles.retirementBox}>
                        <p className={styles.retirementYears}>{ageData.retirementCountdown.yearsLeft}</p>
                        <p className={styles.retirementLabel}>years until retirement at 65</p>
                        <p className={styles.retirementDate}>
                          Estimated in {ageData.retirementCountdown.retirementDate.getFullYear()}
                        </p>
                        <p className={styles.retirementDetail}>
                          That's {ageData.retirementCountdown.years} years and {ageData.retirementCountdown.months} months
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Historical Events */}
                  {ageData.historicalEvents && ageData.historicalEvents.length > 0 && (
                    <div className={styles.featureCard}>
                      <h3 className={styles.featureTitle}>📜 Historical Events</h3>
                      <p className={styles.eventsSubtitle}>Major events during your lifetime:</p>
                      <div className={styles.eventsTimeline}>
                        {ageData.historicalEvents.map((event, index) => (
                          <div key={index} className={styles.eventItem}>
                            <span className={styles.eventYear}>{event.year}</span>
                            <p className={styles.eventText}>{event.event}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Fun Facts */}
                <div className={styles.funFacts}>
                  <h4 className={styles.funFactsTitle}>✨ Life in Numbers</h4>
                  <div className={styles.factsGrid}>
                    {funFacts.map((fact, index) => (
                      <div className={styles.factCard} key={index}>
                        <span className={styles.factIcon}>{fact.icon}</span>
                        <p className={styles.factText}>{fact.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share and Print Options */}
                <div className={styles.shareSection}>
                  <h4 className={styles.shareTitle}>📤 Share Your Results</h4>
                  <div className={styles.shareButtons}>
                    <button onClick={copyShareUrl} className={styles.shareBtn}>
                      Copy Link
                    </button>
                    <button onClick={() => shareOnSocial('facebook')} className={`${styles.shareBtn} ${styles.fb}`}>
                      Facebook
                    </button>
                    <button onClick={() => shareOnSocial('twitter')} className={`${styles.shareBtn} ${styles.tw}`}>
                      Twitter
                    </button>
                    <button onClick={() => shareOnSocial('whatsapp')} className={`${styles.shareBtn} ${styles.wa}`}>
                      WhatsApp
                    </button>
                    <button onClick={() => shareOnSocial('email')} className={`${styles.shareBtn} ${styles.em}`}>
                      Email
                    </button>
                    <button onClick={printCertificate} className={`${styles.shareBtn} ${styles.print}`}>
                      Print Certificate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

const AgeCard = ({ title, value, unit, icon, delay }) => {
  return (
    <div
      className={styles.ageCard}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>{icon}</div>
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardValue}>{value}</p>
          <p className={styles.cardUnit}>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;