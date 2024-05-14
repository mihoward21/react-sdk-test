/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPLITS_API_KEY: process.env.SPLITS_API_KEY,
  }
}

module.exports = nextConfig
