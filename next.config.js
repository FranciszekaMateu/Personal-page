/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Since your repository name is 'Personal-page', GitHub Pages will serve it under /Personal-page
  // If you use a custom domain, you can set this to empty string ''
  basePath: isProd ? '/Personal-page' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
