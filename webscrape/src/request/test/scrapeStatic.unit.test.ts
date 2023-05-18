import * as fs from 'fs'
import * as http from 'http'

import {scrapeStatic} from '../scrapeStatic'



describe("static html scraper", () => {
  it("should render javascript html", async()=>{
    const testUrl = `${__dirname}/test.html`
    const originalHTML = fs.readFileSync(testUrl).toString()

    http.createServer((req:any, res:any) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(originalHTML)
        res.end()
    }).listen(3000)
    
    const html = await scrapeStatic('http://localhost:3000/')
    expect(html).toEqual(originalHTML)
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeStatic(testUrl)
    expect(html).toEqual("")
  })
})