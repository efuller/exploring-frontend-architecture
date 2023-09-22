import { Config } from 'jest'

const config: Config = {
  maxWorkers: 1,
  preset: "jest-puppeteer",
  testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
}

export default config;