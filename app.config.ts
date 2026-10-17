export default {
  name: "LeashLove",
  slug: "leashlove",
  scheme: "leashlove",
  version: "1.0.0",
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/favicon.png"
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    }
  }
};
