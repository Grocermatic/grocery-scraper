// @ts-ignore
import { transformSync } from 'esbuild'
import { minify } from 'html-minifier'

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

export const minifyHtml = (sourceHtml: string) => {
  return minify(sourceHtml, {
    minifyCSS: true,
    minifyURLs: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
    collapseWhitespace: true,
  })
}
