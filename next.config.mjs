/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // The HomeSure front end lives in public/ and Next serves it at the site root, so one server
  // answers everything: public/browse.html at /browse.html, and the API routes at /api/*.
  // "/" is owned by src/app/page.tsx, so point it at the real home page instead.
  async redirects() {
    return [
      { source: "/", destination: "/index.html", permanent: false },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.xendit.co" },
      { protocol: "https", hostname: "**.google.com" },
      { protocol: "https", hostname: "**.googleapis.com" },
    ],
  },
};

export default nextConfig;
