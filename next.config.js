/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sharp"],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
