import * as fs from 'fs'

import {scrapeDynamic} from '../scrapeDynamic'



describe("dynamic html scraper", () => {
  it("should render javascript html", async()=>{
    const testUrl = `${__dirname}/test.html`
    let html:string = await scrapeDynamic('file://' + testUrl)

    const data = await fs.readFileSync(testUrl)
    // Additional html is rendered through JavaScript
    const expectedHTML = data.toString().replaceAll('</p>', 'Paragraph</p>')

    expect(html).toEqual(expectedHTML)
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeDynamic(testUrl)
    expect(html).toEqual('')
  })
})