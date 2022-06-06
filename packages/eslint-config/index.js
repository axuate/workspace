module.exports = {
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    node: true
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint']
    },
    {
      files: ['*'],
      extends: ['prettier']
    }
  ]
};
