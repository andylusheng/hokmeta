/** @type {import('next').NextConfig} */
// distDir: 'out' — required for Hostinger static deploy; do not remove.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
};

export default nextConfig;
