module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['react-app','eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  }
};
