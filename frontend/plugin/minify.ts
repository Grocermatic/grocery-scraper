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
  })
    .code.replaceAll(/--.[a-z-]+: ;/gi, '') // Delete undefined css variables
    .replaceAll(/--[a-z-]+: }/gi, '}')
    .replaceAll(/: /gi, ':') // Delete spaces
}

export const minify = (source: string, sourceType: string) => {
  if (sourceType === 'script') {
    return minifyJs(source)
  } else if (sourceType === 'style') {
    return minifyCss(source)
  }
}
