import { createHash } from 'node:crypto'

export const safeSha256 = async (input: string) => {
  return createHash('sha256')
    .update(input)
    .digest('base64')
    .replaceAll('/', '_')
    .replaceAll('+', '-')
}
