/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ["@acme/ui", "lodash-es"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
    }
  ],
  },
};

module.exports = nextConfig;
