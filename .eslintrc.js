module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  ignorePatterns: ['.next/', 'node_modules/', '.pnp.cjs', '.pnp.loader.mjs', 'public', '.yarn', '@types'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports', 'flowtype', 'jest', 'testing-library'],
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {},
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'prettier/prettier': ['error', { useTabs: false }],
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
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    'no-restricted-exports': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` and 'next' related packages come first.
          ['^react', '^next', '^@?\\w'],
          // Internal packages.
          ['@pay-stitches', '^(@/?$)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': [
      'warn',
      { html: 'ignore', exceptions: ['Button', 'AppComponent', 'Input', 'Svg'] },
    ],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'import/order': 'off',
    'consistent-return': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['label'],
        labelAttributes: ['label'],
        controlComponents: ['StyledHiddenInput'],
        depth: 1,
      },
    ],
  },
};
