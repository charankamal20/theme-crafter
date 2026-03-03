import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginSecurity from 'eslint-plugin-security'
import pluginNoSecrets from 'eslint-plugin-no-secrets'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ── Next.js ──────────────────────────────────────────────────
  {
    plugins: { '@next/next': next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },

  // ── React + hooks + a11y + security ─────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react':        pluginReact,
      'react-hooks':  pluginReactHooks,
      'jsx-a11y':     pluginJsxA11y,
      'security':     pluginSecurity,
      'no-secrets':   pluginNoSecrets,
    },
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // React
      'react/react-in-jsx-scope':  'off',   // not needed in Next.js
      'react/no-danger':           'error',
      'react/no-array-index-key':  'warn',
      'react/jsx-no-target-blank': 'error',

      // Hooks
      'react-hooks/rules-of-hooks':  'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-explicit-any':         'error',
      '@typescript-eslint/no-unused-vars':          ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion':   'warn',
      '@typescript-eslint/no-floating-promises':    'error',

      // Accessibility
      'jsx-a11y/alt-text':     'error',
      'jsx-a11y/no-autofocus': 'warn',

      // Security
      'security/detect-object-injection':     'warn',
      'security/detect-non-literal-regexp':   'error',
      'security/detect-unsafe-regex':         'error',
      'security/detect-eval-with-expression': 'error',
      'no-secrets/no-secrets': ['error', { tolerance: 4.2 }],

      // General
      'no-console':           ['warn', { allow: ['warn', 'error'] }],
      'prefer-const':         'error',
      'no-var':               'error',
      'eqeqeq':               ['error', 'always'],
      'no-implicit-coercion': 'error',
    },
  },

  // CodePreview uses dangerouslySetInnerHTML for Shiki — safe, not user input
  {
    files: ['**/CodePreview.tsx'],
    rules: { 'react/no-danger': 'off' },
  },

  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', '*.config.*'],
  },
)
