import type { ConfigContext, ExpoConfig } from '@expo/config';

type ExpoPlugins = NonNullable<ExpoConfig['plugins']>;

export default ({ config }: ConfigContext): ExpoConfig => {
  const nativePlugins: ExpoPlugins =
    process.env.EXPO_PLATFORM === 'native'
      ? [['expo-dev-client', { launchMode: 'most-recent' }]]
      : [];

  return {
    ...config,
    name: 'LeashLove',
    slug: 'leashlove',
    version: process.env.BILT_APP_VERSION ?? '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    scheme: 'leashlove',
    runtimeVersion: {
      policy: 'appVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      deploymentTarget: '16.4',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      supportsTablet: true,
      bundleIdentifier: process.env.BILT_IOS_BUNDLE_ID ?? 'me.bilt.zampevicine',
    },
    android: {
      package: process.env.BILT_ANDROID_PACKAGE ?? 'me.bilt.zampevicine',
    },
    web: {
      bundler: 'metro',
      output: 'single',
      favicon: './public/icons/icon-192.png',
    },
    extra: {
      appStoreAppId: process.env.BILT_APP_STORE_APP_ID,
    },
    plugins: [
      'expo-router',
      'expo-font',
      ['expo-splash-screen', { backgroundColor: '#FFFBF5' }],
      [
        'expo-location',
        {
          locationWhenInUsePermission:
            'LeashLove usa la tua posizione per trovare cani vicino a te e condividere la posizione durante la passeggiata.',
        },
      ],
      ...nativePlugins,
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
