/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ywkvmoswjxstluupeadm.supabase.co"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

module.exports = nextConfig
