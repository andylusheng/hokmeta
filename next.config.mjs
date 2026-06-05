/** @type {import('next').NextConfig} */
// Static export writes to ./out (output: 'export'). Do NOT set distDir to 'out' —
// that is the build cache folder (.next by default); using 'out' breaks `next dev` CSS.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
};

export default nextConfig;
