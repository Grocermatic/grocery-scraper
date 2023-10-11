import * as fs from 'fs'
import { woolworthsPageProducts } from '../getProductInfo'



describe("Woolworths page scraper", () => {
  it("should parse product data", async()=>{
    const testJson = fs.readFileSync(`${__dirname}/page.test.json`).toString()
    const expectedJson = fs.readFileSync(`${__dirname}/expected.test.json`).toString()
    const expectedPageProductInfo = JSON.parse(expectedJson)

    const testPageProductInfos = woolworthsPageProducts(testJson)
    expect(testPageProductInfos).toEqual(expectedPageProductInfo)
  })
})