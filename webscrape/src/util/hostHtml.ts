/* istanbul ignore file */

import * as http from 'http'



export const hostHtml = (html:string, port:number) => {
  http.createServer((req:any, res:any) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(html)
    res.end()
  }).listen(port)
} 