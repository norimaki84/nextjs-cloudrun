/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true, // これをtrueにしないとexportしたときに、about.htmlのようにサブディレクトリが切られない
  // i18n機能の設定
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja', // デフォルト言語は日本語
  },
}
