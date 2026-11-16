/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Frontend talks to the existing API. Overridable via env at build/runtime.
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || "https://api.swisschools.com",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.swisschools.com" },
      { protocol: "https", hostname: "swisschools.com" },
    ],
  },
};

export default nextConfig;
