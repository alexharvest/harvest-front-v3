import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    rules: {
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
      'no-console': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/state-in-constructor': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': ['error', { allow: ['_provider'] }],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'one-var': ['error', { let: 'always' }],
      'prettier/prettier': 'error',
      'react/display-name': 'off',
      'react/no-array-index-key': 'off',
      'import/no-cycle': 'off',
      'prefer-destructuring': ['error', { object: false, array: false }],
      camelcase: ['error', { allow: ['aa_bb'] }],
      'react/no-danger': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
