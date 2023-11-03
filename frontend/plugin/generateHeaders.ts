import { writeFileSync } from 'fs'

export const generateHeaders = (csp: string) => {
  const headers: any = {
    '/*': {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'microphone=(),camera=()',
      'Content-Security-Policy': csp,
    },
  }
  let _headers = ''
  for (const uri of Object.keys(headers)) {
    _headers += `${uri}\n`
    for (const header of Object.keys(headers[uri])) {
      _headers += `  ${header}: ${headers[uri][header]}\n`
    }
  }
  writeFileSync(`${__dirname}/../dist/_headers.txt`, _headers)
  return
}
