import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './AgeQuiz.module.css';

// Pre-render this page at build time for optimal SEO
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const AgeQuiz = () => {
  const quizData = [
    {
      question: "At what age does the human brain stop growing in size?",
      options: ["18", "35", "25", "50"],
      answer: "25",
      fact: "🧠 The human brain reaches its maximum size around age 25. After that, it slowly starts to shrink as part of natural aging."
    },
    {
      question: "Who holds the record for the longest verified human lifespan?",
      options: ["118", "122", "130", "125"],
      answer: "122",
      fact: "🇫🇷 Jeanne Calment of France lived to be 122 years and 164 days — the longest confirmed human lifespan in history."
    },
    {
      question: "On average, how many times does a person blink per day?",
      options: ["5,000", "15,000", "35,000", "25,000"],
      answer: "25,000",
      fact: "👁 An average person blinks about 15-20 times per minute, totaling ~25,000 blinks per day — that's over 9 million times a year!"
    },
    {
      question: "What is the average retirement age worldwide?",
      options: ["55", "60", "70", "65"],
      answer: "65",
      fact: "📅 While it varies by country, the global average retirement age is around 65. In some places, it's as low as 55 (France) or as high as 70 (Norway)."
    },
    {
      question: "Which animal is known to never show signs of biological aging?",
      options: ["Tortoise", "Jellyfish", "Shark", "Octopus"],
      answer: "Jellyfish",
      fact: "🌊 The 'immortal jellyfish' (Turritopsis dohrnii) can revert to its juvenile form after reproducing, potentially living forever under ideal conditions."
    },
    {
      question: "How many times does the average human heart beat in a lifetime?",
      options: ["1 billion", "2 billion", "4 billion", "3 billion"],
      answer: "3 billion",
      fact: "💓 The heart beats about 100,000 times a day. Over 70 years, that adds up to roughly 3 billion beats!"
    },
    {
      question: "What year was the oldest known tree (Methuselah) born?",
      options: ["1500 BC", "2830 BC", "3000 AD", "1000 BC"],
      answer: "2830 BC",
      fact: "🌳 Methuselah, a Great Basin bristlecone pine, is over 4,800 years old and was born during the construction of the Egyptian pyramids!"
    },
    {
      question: "At what age do most people have their 'first memory'?",
      options: ["2", "5", "3.5", "7"],
      answer: "3.5",
      fact: "💭 Studies show that most people's earliest memory dates back to around age 3.5. Before that, the brain hasn't fully developed episodic memory."
    },
    {
      question: "How long is one 'jiffy' in scientific terms?",
      options: ["1/10 sec", "1/100 sec", "1/50 sec", "1/1000 sec"],
      answer: "1/100 sec",
      fact: "⏱ In science, a 'jiffy' is informally used to mean 1/100th of a second. It's also used in computing to mean one tick of the system timer."
    },
    {
      question: "What is the average age of a smartphone user globally?",
      options: ["30", "40", "35", "45"],
      answer: "35",
      fact: "📱 With over 6 billion users, the average smartphone user is around 35 years old, spending nearly 4 hours daily on their device."
    }
    // ... (include all your quiz questions here - shortened for brevity)
  ];

  // Comprehensive keyword lists for SEO
  const shortKeywords = [
    'age quiz', 'trivia game', 'age facts', 'educational quiz', 'learning game',
    'brain game', 'knowledge test', 'fun quiz', 'age questions', 'quiz challenge',
    'trivia questions', 'educational game', 'learning quiz', 'mind game', 'brain teaser',
    'age knowledge', 'lifespan quiz', 'human development', 'aging facts', 'biology quiz'
  ];

  const longTailKeywords = [
    'free online age quiz with instant results',
    'educational age trivia game for adults',
    'test your age knowledge with fun facts',
    'interactive quiz about human lifespan',
    'challenging age-related trivia questions',
    'learn about aging while playing game',
    'brain training quiz about age facts',
    'educational entertainment age game',
    'daily age trivia challenge game',
    'quiz game about human development stages',
    'test your knowledge about aging process',
    'fun educational game about lifespan',
    'age facts quiz with scoring system',
    'interactive learning game about aging',
    'challenging trivia about human biology',
    'educational quiz with instant feedback',
    'age knowledge test with certificate',
    'brain teaser quiz about human age',
    'learning game about demographic facts',
    'entertaining age education quiz game'
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showScoreCard, setShowScoreCard] = useState(false);

  const current = quizData[currentQuestion];

  useEffect(() => {
    if (!gameStarted || showResult || quizCompleted) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer(null);
    }
  }, [timeLeft, gameStarted, showResult, quizCompleted]);

  const handleAnswer = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === current.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    } else {
      setScore(Math.max(0, score - 0.5));
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setTimeLeft(30);

    const nextQ = currentQuestion + 1;
    if (nextQ < quizData.length) {
      setCurrentQuestion(nextQ);
    } else {
      setQuizCompleted(true);
      setShowScoreCard(true);
    }
  };

  const startGame = () => {
    if (playerName.trim() === '') {
      alert("Please enter your name to start the quiz!");
      return;
    }
    setGameStarted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setTimeLeft(30);
    setScore(0);
    setQuizCompleted(false);
    setShowScoreCard(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    
    if (percentage === 100) {
      return {
        title: "Perfect Score! 🏆",
        message: "You're an age expert! Your knowledge is truly impressive!",
        color: "#10b981"
      };
    } else if (percentage >= 80) {
      return {
        title: "Excellent! 🌟",
        message: "You know your age facts incredibly well!",
        color: "#3b82f6"
      };
    } else if (percentage >= 60) {
      return {
        title: "Great Job! 👍",
        message: "Solid age knowledge! You're on the right track!",
        color: "#8b5cf6"
      };
    } else if (percentage >= 40) {
      return {
        title: "Good Effort! 📚",
        message: "Not bad! Keep learning and you'll master age facts in no time!",
        color: "#f59e0b"
      };
    } else {
      return {
        title: "Keep Going! 🚀",
        message: "Every expert was once a beginner. Try again and watch your score improve!",
        color: "#ef4444"
      };
    }
  };

  // Enhanced structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ultimate Age Quiz Game - Test Your Age Knowledge",
    "description": "Free interactive age quiz with 50+ challenging questions. Learn fascinating facts about human lifespan, aging, and development while having fun!",
    "url": "https://www.ageranker.com/age-quiz-game",
    "applicationCategory": "EducationalApplication",
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
      "50+ challenging age-related questions",
      "Timer-based quiz with scoring system",
      "Educational facts and explanations",
      "Progress tracking and performance analytics",
      "Mobile-friendly responsive design",
      "Instant feedback and learning opportunities"
    ],
    "screenshot": [
      "https://www.ageranker.com/images/age-quiz-screenshot1.jpg",
      "https://www.ageranker.com/images/age-quiz-screenshot2.jpg"
    ]
  };

  return (
    <div className={styles.quizContainer}>
      <Head>
        {/* Basic SEO */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ultimate Age Quiz Game | Test Your Age Knowledge with Fun Trivia | 2025</title>
        <meta 
          name="description" 
          content="Challenge yourself with 50+ age-related trivia questions. Test your knowledge about human lifespan, aging facts, and development. Learn while having fun!" 
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
        <link rel="canonical" href="https://www.ageranker.com/age-quiz-game" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ultimate Age Quiz Game | Test Your Age Knowledge" />
        <meta 
          property="og:description" 
          content="Challenge yourself with 50+ age-related trivia questions. Learn fascinating facts about human lifespan and development!" 
        />
        <meta property="og:url" content="https://www.ageranker.com/age-quiz-game" />
        <meta property="og:image" content="https://www.ageranker.com/images/age-quiz-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Age Quiz Game interface showing trivia questions and scoring" />
        <meta property="og:site_name" content="AgeRanker" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ultimate Age Quiz Game | AgeRanker" />
        <meta 
          name="twitter:description" 
          content="Test your age knowledge with 50+ challenging trivia questions. Learn fascinating facts while having fun!" 
        />
        <meta name="twitter:image" content="https://www.ageranker.com/images/age-quiz-twitter-image.jpg" />
        <meta name="twitter:image:alt" content="Interactive age quiz game with educational content" />
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
                  "name": "How many questions are in the Ultimate Age Quiz?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The quiz contains 50+ challenging age-related questions covering human lifespan, development, biology, and fascinating age facts from around the world."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this quiz suitable for all age groups?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! The quiz is designed for adults and older teenagers who want to test their knowledge about age-related topics. All content is educational and family-friendly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to create an account to play?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No account required! The quiz is completely free to play without any registration. Just enter your name and start learning immediately."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I learn from the quiz even if I get answers wrong?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Each question includes detailed explanations and fascinating facts, making it a great learning experience regardless of your score."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the quiz mobile-friendly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the quiz is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers."
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
                  "name": "Age Quiz Game",
                  "item": "https://www.ageranker.com/age-quiz-game"
                }
              ]
            }
          ])} }
        />
      </Head>

      <header className={styles.quizHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>🧠 Ultimate Age Quiz Challenge</h1>
          <p className={styles.headerSubtitle}>
            Test your knowledge with {quizData.length}+ fascinating age-related questions and learn amazing facts!
          </p>
        </div>
      </header>

      <main className={styles.quizMain}>
        <div className={styles.quizContent}>
          {!gameStarted ? (
            <div className={styles.startScreen}>
              <div className={styles.welcomeCard}>
                <h2 className={styles.welcomeTitle}>Ready to Test Your Age Knowledge?</h2>
                <p className={styles.welcomeText}>
                  Challenge yourself with {quizData.length} fascinating questions about age, 
                  lifespan, and human development. Learn while having fun!
                </p>
                
                <div className={styles.inputCard}>
                  <label className={styles.inputLabel}>
                    <span className={styles.labelIcon}>👤</span>
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name here..."
                    className={styles.nameInput}
                    aria-label="Enter your name to start the quiz"
                  />
                </div>

                <div className={styles.gameFeatures}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>⏱️</span>
                    <span>30 seconds per question</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>📚</span>
                    <span>Learn fascinating facts</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🎯</span>
                    <span>Track your progress</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🏆</span>
                    <span>Earn your score certificate</span>
                  </div>
                </div>

                <button 
                  onClick={startGame} 
                  className={styles.startBtn}
                  disabled={!playerName.trim()}
                  aria-label="Start the age quiz game"
                >
                  <span className={styles.btnIcon}>🚀</span>
                  Start Quiz Challenge
                </button>
              </div>
            </div>
          ) : !quizCompleted ? (
            <div className={styles.questionCard}>
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressText}>
                    Question <strong>{currentQuestion + 1}</strong> of <strong>{quizData.length}</strong>
                  </span>
                  <span className={styles.scoreText}>
                    Score: <strong>{score.toFixed(1)}</strong>
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className={`${styles.timer} ${timeLeft <= 5 ? styles.timeLow : ''}`}>
                <span className={styles.timerIcon}>⏳</span>
                <span className={styles.timeLeft}>{timeLeft}s</span>
              </div>

              <div className={styles.questionSection}>
                <h2 className={styles.questionText}>{current.question}</h2>
              </div>

              <div className={styles.optionsGrid}>
                {current.options.map((option, index) => (
                  <button
                    key={index}
                    className={`${styles.optionCard} ${
                      selectedAnswer === option ? styles.selected : ''
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    aria-label={`Select answer: ${option}`}
                  >
                    <span className={styles.optionText}>{option}</span>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className={`${styles.resultPopup} ${isCorrect ? styles.correct : styles.incorrect}`}>
                  <div className={styles.popupContent}>
                    <div className={styles.resultHeader}>
                      <h3 className={styles.resultTitle}>
                        {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </h3>
                      <p className={styles.resultSubtitle}>
                        {isCorrect ? 'Great job! You got it right!' : 'Nice try! Here is the correct answer:'}
                      </p>
                    </div>

                    {isCorrect ? (
                      <div className={styles.factDisplay}>
                        <div className={styles.factHeader}>
                          <span className={styles.factIcon}>💡</span>
                          <strong>Did You Know?</strong>
                        </div>
                        <p className={styles.factText}>{current.fact}</p>
                      </div>
                    ) : (
                      <div className={styles.correctionDisplay}>
                        <div className={styles.answerComparison}>
                          <div className={styles.answerItem}>
                            <span className={styles.answerLabel}>Your answer:</span>
                            <span className={styles.wrongAnswer}>{selectedAnswer}</span>
                          </div>
                          <div className={styles.answerItem}>
                            <span className={styles.answerLabel}>Correct answer:</span>
                            <span className={styles.correctAnswer}>{current.answer}</span>
                          </div>
                        </div>
                        <div className={styles.factDisplay}>
                          <div className={styles.factHeader}>
                            <span className={styles.factIcon}>📖</span>
                            <strong>Learn More:</strong>
                          </div>
                          <p className={styles.factText}>{current.fact}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      className={styles.continueBtn}
                      aria-label="Continue to next question"
                    >
                      {currentQuestion < quizData.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.resultSummary}>
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultIcon}>🎉</span>
                  <h2 className={styles.resultTitle}>Quiz Complete, {playerName}!</h2>
                  <p className={styles.congratsText}>
                    You've completed the Ultimate Age Quiz!
                  </p>
                </div>

                <div className={styles.scoreDisplay}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.scoreValue}>{score.toFixed(1)}</span>
                    <span className={styles.scoreTotal}>/ {quizData.length}</span>
                  </div>
                  <p className={styles.scorePercentage}>
                    {((score / quizData.length) * 100).toFixed(1)}% Correct
                  </p>
                  
                  <div className={styles.scoreMessage}>
                    <h3 style={{ color: getScoreMessage().color }}>
                      {getScoreMessage().title}
                    </h3>
                    <p>{getScoreMessage().message}</p>
                  </div>
                </div>

                <div className={styles.shareSection}>
                  <h4 className={styles.shareTitle}>Share Your Score!</h4>
                  <div className={styles.shareButtons}>
                    <button 
                      onClick={() => {
                        const text = `I scored ${score.toFixed(1)}/${quizData.length} on the Ultimate Age Quiz! Try it at www.ageranker.com`;
                        navigator.clipboard.writeText(text);
                        alert('Score copied to clipboard!');
                      }}
                      className={styles.shareBtn}
                    >
                      Copy Score
                    </button>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button onClick={restartQuiz} className={styles.restartBtn}>
                    <span className={styles.btnIcon}>🔄</span>
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Score Card Popup */}
          {showScoreCard && (
            <div className={styles.scoreCardModal}>
              <div className={styles.scoreCardOverlay} onClick={() => setShowScoreCard(false)}></div>
              <div className={styles.scoreCardContent}>
                <div className={styles.scoreCardHeader}>
                  <span className={styles.scoreCardIcon}>🎊</span>
                  <h2 className={styles.scoreCardTitle}>Your Score</h2>
                </div>

                <div className={styles.scoreCardBody}>
                  <div className={styles.finalScoreDisplay}>
                    <div className={styles.finalScoreCircle}>
                      <span className={styles.finalScoreValue}>{score.toFixed(1)}</span>
                      <span className={styles.finalScoreTotal}>/ {quizData.length}</span>
                    </div>
                    <div className={styles.finalScorePercentage}>
                      {((score / quizData.length) * 100).toFixed(1)}% Correct
                    </div>
                  </div>
                </div>

                <div className={styles.scoreCardActions}>
                  <button 
                    onClick={() => setShowScoreCard(false)} 
                    className={styles.continueToSummary}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgeQuiz;