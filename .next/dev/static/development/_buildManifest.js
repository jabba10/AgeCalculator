self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/404": [
    "static/chunks/pages/404.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/about": [
    "static/chunks/pages/about.js"
  ],
  "/age-calculator": [
    "static/chunks/pages/age-calculator.js"
  ],
  "/age-comparator": [
    "static/chunks/pages/age-comparator.js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/stats"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/404",
    "/_app",
    "/_error",
    "/about",
    "/age-calculator",
    "/age-comparator",
    "/age-quiz-game",
    "/contact",
    "/privacy-policy"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()