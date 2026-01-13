// next.config.js - Combined ISR & GoatCounter Version
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable trailing slashes for better SEO
  trailingSlash: true,
  
  // Enable compression for better performance
  compress: true,
  
  // Image optimization for ISR
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // GoatCounter rewrite rule
  async rewrites() {
    return [
      {
        source: '/stats',
        destination: 'https://professionalresumefree.goatcounter.com',
      },
    ];
  },
  
  // Security headers - Updated to include GoatCounter domains
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' 'unsafe-inline' " +
                   "https://www.googletagmanager.com " +
                   "https://www.google-analytics.com " +
                   "https://gc.zgo.at " +
                   "https://professionalresumefree.goatcounter.com; " +
                   "style-src 'self' 'unsafe-inline'; " +
                   "img-src 'self' data: https:; " +
                   "font-src 'self'; " +
                   "connect-src 'self' " +
                   "https://www.google-analytics.com " +
                   "https://professionalresumefree.goatcounter.com; " +
                   "frame-ancestors 'none'; " +
                   "base-uri 'self'; " +
                   "form-action 'self'"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Optional: Enable React strict mode
  reactStrictMode: true,
  
  // Optional: Enable SWC minification (faster than Terser)
  swcMinify: true,
};

module.exports = nextConfig;