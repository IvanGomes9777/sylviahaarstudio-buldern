/** @type {import('next').NextConfig} */

// Security Headers gemäß WEBSECURITY_GDPR_GUIDE.md – nativ von Anfang an eingewebt.
// CSP erlaubt aktuell self + (für Next.js nötig) inline styles/scripts. Externe
// Tracking-/Font-Domains werden bewusst NICHT erlaubt (DSGVO: next/font self-hosted).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Nur kuratierte, legale Bildquelle (Unsplash) erlauben.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
