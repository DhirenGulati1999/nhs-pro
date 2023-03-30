/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.newhomesourceprofessional.com',
        port: '',
        pathname: '/globalresources/**',
      },
    ],
  },
  async rewrites() {
    return [
        {
            source: '/:privateLabel/webinars',
            destination: '/webinars'
        },
        {
          source: '/:privateLabel/savedlistings',
          destination: '/savedlistings'
      }
    ];
}
}

module.exports = nextConfig
