module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'error',
    'func-names': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
  },
};
