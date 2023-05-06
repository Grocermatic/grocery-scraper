import * as fs from 'fs'

import {scrapeDynamic} from './scrapeDynamic'



describe("dynamic html scraper", () => {
  it("should render javascript html", async()=>{
    const testUrl = `file://${__dirname}/test.html`
    let html:string = await scrapeDynamic(testUrl)
    html = html.replaceAll('\n','')

    fs.readFile('./src/util/test.html', (err:any, data:any)=>{
      const originalHTML = data.toString()
      const expectedHTML = originalHTML.replaceAll('</p>', 'Paragraph</p>')
      expect(html).not.toEqual(originalHTML)
      expect(html).toEqual(expectedHTML)
    })
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeDynamic(testUrl)
    expect(html).toEqual("")
  })
})