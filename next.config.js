/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_URL,
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  // async rewrites(){
  // 	return[{
  // 		source:"/en",
  // 		destination:"/en/page"
  // 	},{
  // 		source: '/de',
  // 		destination: '/de/page'
  // 	}]
  // }
};

module.exports = withPWA(withNextIntl(nextConfig));
