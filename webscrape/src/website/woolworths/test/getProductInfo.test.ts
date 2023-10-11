import * as fs from 'fs'
import { getPageProductInfo } from '../getPageProductInfo'



describe("Woolworths page scraper", () => {
  it("should parse product data", async () => {
    const testJson = fs.readFileSync(`${__dirname}/page.test.json`).toString()
    const expectedJson = fs.readFileSync(`${__dirname}/expected.test.json`).toString()
    const expectedPageProductInfo = JSON.parse(expectedJson)
    const expectedReport = {
      success: 33,
      failedData: []
    }

    const { productInfos, report } = getPageProductInfo(testJson)
    expect(productInfos).toEqual(expectedPageProductInfo)
    expect(report).toEqual(expectedReport)
  })
})
