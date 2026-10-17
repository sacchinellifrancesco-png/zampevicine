const config = {
  name: "LeashLove",
  slug: "leashlove",
  scheme: "leashlove",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  web: {
    bundler: "metro",
    output: "single",
    name: "LeashLove",
    shortName: "LeashLove",
    backgroundColor: "#ffffff",
    themeColor: "#f97316"
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true
  }
};

export default config;
