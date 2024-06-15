/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
    reactStrictMode: true,
    transpilePackages: [
        '@tms_next_abp/ui',
        '@tms_next_abp/hooks',
        '@tms_next_abp/utils',
        '@tms_next_abp/proxy'
    ],
    output: 'standalone',
    experimental: {
        // this includes files from the monorepo base two directories up
        outputFileTracingRoot: path.join(__dirname, '../../')
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'abp.io'
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};
