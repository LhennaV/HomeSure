/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",	
async redirects() {
    return [
      { source: "/", destination: "/index.html", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.xendit.co",
      },
      {
        protocol: "https",
        hostname: "**.google.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
