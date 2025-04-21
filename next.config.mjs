/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "localhost"], // Allow both Cloudinary and localhost images
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side-specific configuration
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        fs: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;