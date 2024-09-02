import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
    coverage: {
      enabled: true,
      include: ['common', 'webscrape'],
    },
    // Faster than 'fork' pool at the cost of less isolation.
    pool: 'threads',
    reporters: process.env.GITHUB_ACTIONS
      ? ['verbose', 'github-actions']
      : ['verbose'],
    logHeapUsage: true,
  },
})
