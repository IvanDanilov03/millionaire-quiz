module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'promise', 'unicorn', 'import'],
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-catch': 'off',
    // "import/no-default-export": "error",
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'no-restricted-exports': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['^.*\\.d\\.ts$'],
      },
    ],
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: {
            properties: false,
          },
        },
      },
    ],
    'unicorn/prefer-array-find': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'promise/always-return': 'off',
    'import/no-relative-parent-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in types (React, etc.)
          'external', // External imports (components, libraries)
          'internal', // Internal imports (custom components)
          ['parent', 'sibling'], // Parent and sibling imports
          'index', // Index imports
          'object', // Imports with a style extension
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'ui/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '**/styles',
            group: 'object',
            position: 'after',
          },
          {
            pattern: 'api|modules|stores/**',
            group: 'parent',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['./src/pages/**/*.ts', './src/pages/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
