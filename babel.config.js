module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@core': './src/core',
          '@coin_assets': './src/coin_assets',
          '@charts': './src/charts',
          '@theme': './src/theme',
          '@localization': './src/localization',
        },
      },
    ],
  ],
};
