/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["private-basic-components"],
  webpack: config => {
    // 让 webpack 处理 TypeScript 类型导出
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
