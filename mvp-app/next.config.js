/** @type {import('next').NextConfig} */
const nextConfig = {
  // TurbopackやReact Compilerの設定は意図的に無効化し、安定性を優先します
  // experimental: {
  //   serverComponentsExternalPackages: ["@google/genai"], // 将来のAI API接続用
  // }
};

module.exports = nextConfig;
