import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
}
export default config
