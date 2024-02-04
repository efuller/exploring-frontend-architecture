import { Config } from 'jest'

const config: Config = {
  testTimeout: 30000,
  maxWorkers: 1,
  projects: [
    {
      displayName: 'e2e',
      preset: "jest-puppeteer",
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
    },
    {
      displayName: 'app',
      testMatch: ['**/@(src|tests)/**/*.@(app).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
    },
  ],
}

export default config;