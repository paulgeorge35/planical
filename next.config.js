/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["ywkvmoswjxstluupeadm.supabase.co"],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client"],
    },
}

module.exports = nextConfig
