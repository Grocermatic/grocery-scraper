import {scrapeDynamic} from './scrapeDynamic'
import * as fs from 'fs'



describe("Scrape HTML from dynamic site", () => {
  test("Should contain additional paragraph text", async()=>{
    const testFile = `file://${__dirname}/test.html`
    let html:string = await scrapeDynamic(testFile)
    html = html.replaceAll('\n','')
    fs.readFile('./src/util/test.html', (err:any, data:any)=>{
      const expectedHTML = data.toString().replaceAll('</p>', 'Paragraph</p>')
      expect(html).toEqual(expectedHTML)
    })
  })
})