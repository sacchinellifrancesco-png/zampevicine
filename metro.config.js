const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix bug RN 0.74.5 + Expo 51 su Vercel
config.resolver.unstable_enablePackageExports = false;

// Fix mappa su web (react-native-maps non funziona su web)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-maps') {
    return {
      filePath: require.resolve('react-native-web/dist/exports/View/index.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
