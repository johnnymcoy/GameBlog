const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self' https://wakatime.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' http://giscus.app https://va.vercel-scripts.com https://wakatime.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data: https://wakatime.com;
  media-src 'self' https://wakatime.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app https://curtisbucciol.com https://buccigames.com https://wakatime.com http://localhost:3000 https://store.steampowered.com/; 
  object-src 'none' https://wakatime.com;
`
//script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;
// script-src-elem 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;

//   script-src-elem 'self' https://wakatime.com;
//   img-src 'self' https://wakatime.com;
//   frame-src 'self' https://wakatime.com;
//   connect-src 'self' https://wakatime.com;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  //   {
  //     key: 'X-Frame-Options',
  //     value: 'SAMEORIGIN',
  //   },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withBundleAnalyzer({
  images: {
    domains: ['wakatime.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wakatime.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
