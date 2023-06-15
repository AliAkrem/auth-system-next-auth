/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages : ['bcrypt']
  },
  // reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  
}

module.exports = nextConfig
