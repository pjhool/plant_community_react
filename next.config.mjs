/** @type {import('next').NextConfig} */
const nextConfig = {
    // 'standalone' output is only needed for Docker deployments.
    // Vercel manages its own build output and does not support this option.
    // Set DOCKER_BUILD=true in the Docker build environment to enable it.
    ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
};

export default nextConfig;
