module.exports = {
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        project: './tsconfig.json'
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint']
    },
    {
      files: ['*'],
      extends: ['prettier']
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off'
      }
    },
    {
      files: ['test/steps/**/*.ts'],
      plugins: ['cucumber'],
      rules: {
        'cucumber/expression-type': ['error', 'RegExp'],
        'cucumber/no-arrow-functions': 'error'
      }
    }
  ]
};
