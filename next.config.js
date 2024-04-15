/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  experimental: {
    typedRoutes: true,
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose", "@typegoose/typegoose"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  useFileSystemPublicRoutes: false,
};

module.exports = nextConfig;
