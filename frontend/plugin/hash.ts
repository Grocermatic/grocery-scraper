import { createHash } from 'crypto'

export const sha512 = (source: string) => {
  return createHash('sha512').update(source).digest().toString('base64')
}
