/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['moralis.io', 'cdn.sanity.io', 'upload.wikimedia.org'],
    // loader: 'imgix',
    // path: '/',
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/profile': { page: '/profile' },
      '/stats': { page: '/stats' },
      '/votes': { page: '/votes' },

    }
  },
}

module.exports = nextConfig
