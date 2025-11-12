import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'

export default [
  {
    ignores: ['coverage/**', 'node_modules/**']
  },
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: ['./tsconfig.json'] }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' }
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals
    },
    rules: {
      'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
      'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
      'jest/valid-title': ['error', { mustMatch: { it: '^should\\s' } }]
    }
  }
]
