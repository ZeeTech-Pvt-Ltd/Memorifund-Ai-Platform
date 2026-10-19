/** @type {import('next').NextConfig} */
const nextConfig = {
  // The legacy /How-It-Works redirect is in src/middleware.js rather than
  // here: Next matches redirect `source` paths case-insensitively, so a
  // rule for /How-It-Works also matches /how-it-works and redirects the
  // canonical page to itself in a loop.
}

export default nextConfig
