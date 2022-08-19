/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: process.env.apiKey,
    projectId: process.env.projectId,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  },
};

module.exports = nextConfig;
