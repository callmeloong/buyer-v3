/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL_BUYER: process.env.API_URL_BUYER,
        API_URL_BGP: process.env.API_URL_BGP,
        STORE_ID: process.env.STORE_ID,
    },
    images: {
        remotePatterns: [{ hostname: '**.cloudfront.net' }, { hostname: 'cdn-dev.burgershop.io' }]
    },
    async rewrites() {
        return [
            {
                source: '/public/:path*',
                destination: 'http://api.30usd.com/api/v1/public/:path*',
            },
        ]
    },
};

export default nextConfig;
