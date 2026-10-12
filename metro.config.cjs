const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// FIX DEFINITIVO per Zustand 5 + import.meta su Vercel
config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

module.exports = config;
