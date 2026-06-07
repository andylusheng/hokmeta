/** @type {import('next').NextConfig} */
// Static export writes to ./out (output: 'export'). Do NOT set distDir to 'out' —
// that is the build cache folder (.next by default); using 'out' breaks `next dev` CSS.
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'camp.honorofkings.com', pathname: '/**' },
      { protocol: 'https', hostname: 'game.gtimg.cn', pathname: '/**' },
      { protocol: 'https', hostname: 'hokstats.gg', pathname: '/**' },
      { protocol: 'https', hostname: 'image.inews.gtimg.com', pathname: '/**' },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // Windows: filesystem webpack cache often races → ENOENT on .pack.gz rename → 500 on chunks.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
