import { createHash } from 'crypto'

export const safeSha256 = (input: string) => {
  return createHash('sha256')
    .update(input)
    .digest('base64')
    .replaceAll('/', '_')
    .replaceAll('+', '-')
}
