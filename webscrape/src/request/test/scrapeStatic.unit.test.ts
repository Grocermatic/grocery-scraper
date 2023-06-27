import * as fs from 'fs'

import {scrapeStatic} from '../scrapeStatic'
import { hostHtml } from '../hostHtml'



describe("static html scraper", () => {
  it("should render javascript html", async()=>{
    const testUrl = `${__dirname}/test.html`
    const originalHTML = fs.readFileSync(testUrl).toString()

    const port = 3000
    hostHtml(originalHTML, port)
    
    const html = await scrapeStatic(`http://localhost:${port}`)
    expect(html).toEqual(originalHTML)
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeStatic(testUrl)
    expect(html).toEqual("")
  })
})