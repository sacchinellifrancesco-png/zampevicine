import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "LeashLove",
  slug: "leashlove",
  scheme: "leashlove",
  web: {
    bundler: "metro",
    output: "single"
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true
  }
});
