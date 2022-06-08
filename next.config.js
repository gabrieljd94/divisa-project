/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
}

module.exports = nextConfig