import type {Config} from 'jest';



const config:Config = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/*.ts"
  ],
  coverageThreshold: {
    "global": {
      "statements": 80,
      "branches": 80,
      "functions": 80,
      "lines": 80
    }
  }
}
export default config;