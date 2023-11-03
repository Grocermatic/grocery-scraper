// @ts-ignore
import { transformSync } from 'esbuild'

export const minifyJs = (sourceJs: string) => {
  return transformSync(sourceJs, {
    minify: true,
  }).code
}

export const minifyCss = (sourceCss: string) => {
  return transformSync(sourceCss, {
    loader: 'css',
    minify: true,
  }).code
}

export const minify = (source: string, sourceType: string) => {
  if (sourceType === 'script') {
    return minifyJs(source)
  } else if (sourceType === 'style') {
    return minifyCss(source)
  }
}
