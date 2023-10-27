import { createReadStream, createWriteStream, rmSync } from 'fs'
import { createBrotliCompress } from 'zlib'

export const saveBrotli = (file: string) => {
  createReadStream(file)
    .pipe(createBrotliCompress())
    .pipe(createWriteStream(file + '.br'))
    .on('finish', () => rmSync(file))
}
