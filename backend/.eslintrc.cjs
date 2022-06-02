module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'parent|args|context' }],
    'no-console': 'error',
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    'import/extensions': [
      'error',
      {
        js: 'always', // with import module type in package.json we need to specify the extensions
      },
    ],
  },
};
