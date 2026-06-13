/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js / R3F transpilieren für saubere ESM-Builds
  transpilePackages: ["three"],
};

export default nextConfig;
