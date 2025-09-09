/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
 assetPrefix: process.env.NODE_ENV === "production" ? "/" : undefined,
};

export default nextConfig;
