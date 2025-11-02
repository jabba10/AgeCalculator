/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },
  // Disable server-side features for static export
  experimental: {
    esmExternals: true
  }
}

export default nextConfig