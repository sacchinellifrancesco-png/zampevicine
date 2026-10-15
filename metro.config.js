const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix per errore Platform su Vercel web
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
