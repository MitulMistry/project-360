/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add external image hosts (such as for user avatars) here:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
