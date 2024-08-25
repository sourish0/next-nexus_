/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["images01.military.com"],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**', // Allows any hostname
            },
          ],
    },
};

export default nextConfig;
