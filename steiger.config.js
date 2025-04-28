import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // disable the `public-api` rule for files in the Shared layer
    files: ['./src/shared/**/*.ts', './src/shared/**/*.tsx'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])