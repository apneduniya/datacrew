/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'www.earngather.xyz'
            },
            {
                hostname: 'i.ibb.co'
            },
            {
                hostname: 'localhost'
            },
            {
                hostname: '192.168.1.103'
            }
        ]
    }
};

export default nextConfig;
