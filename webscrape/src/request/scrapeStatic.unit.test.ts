import * as fs from 'fs'
import * as http from 'http'

import {scrapeStatic} from './scrapeStatic'



describe("static html scraper", () => {
  it("should render javascript html", async()=>{
    const data = fs.readFileSync('./src/request/test.html')
    const originalHTML = data.toString()

    http.createServer((req:any, res:any) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(originalHTML)
        res.end()
    }).listen(3000)

    scrapeStatic('http://localhost:3000/')
    .then((html:string) => {
      expect(html).toEqual(originalHTML)
    })
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeStatic(testUrl)
    expect(html).toEqual("")
  })
})