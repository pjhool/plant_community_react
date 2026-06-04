/** @type {import('next').NextConfig} */
const nextConfig = {
    // Produces a minimal standalone bundle for Docker deployments.
    // Output: .next/standalone — no node_modules copy needed in the final image.
    output: 'standalone',
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
