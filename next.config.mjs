// @ts-check
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts", // add the path where you create sw.ts
  swDest: "public/sw.js",
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // to disable pwa in development
  // ... other options
});



/** @type {import('next').NextConfig} */
// import withPWA from 'next-pwa';



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
                hostname: '192.189.103'
            },
            {
                hostname: 'vercel.app'
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    // pwa: {
    //     dest: "public",
    //     register: true,
    //     skipWaiting: true,
    // },
};


// export default nextConfig;
export default withSerwist(nextConfig);
