const config = {
  name: "ZampeVicine",
  slug: "zampevicine",
  scheme: "zampevicine",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  web: {
    bundler: "metro",
    output: "single",
    name: "ZampeVicine",
    shortName: "ZampeVicine",
    backgroundColor: "#ffffff",
    themeColor: "#f97316"
  },
  plugins: ["expo-router"],
  experiments: { typedRoutes: true }
};
export default config;
