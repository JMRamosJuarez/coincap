module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', 'tsx']},
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': ['error', {props: false}],
  },
};
