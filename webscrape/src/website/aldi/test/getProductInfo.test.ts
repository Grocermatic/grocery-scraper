import * as fs from 'fs'

import { ProductInfo } from "../../interface"
import { aldiPageProducts, getProductInfo } from "../getProductInfo"



describe("Aldi product scraper", () => {
  it("should parse product data", async()=>{
    const testUrl = `${__dirname}/corn.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Market Fare Corn Kernels',
      url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-corn-kernels-1kg-1/',
      img: 'https://www.aldi.com.au/fileadmin/_processed_/a/2/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_2_b2bba5422e.jpg',
      price: 4.19,
      quantity: 1,
      unitPrice: 4.19
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should parse product with cents", async()=>{
    const testUrl = `${__dirname}/spinach.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Market Fare Spinach',
      url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-spinach-250g-2/',
      img: 'https://www.aldi.com.au/fileadmin/_processed_/a/d/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_7_e00448fa4c.jpg',
      price: 0.89,
      quantity: 0.25,
      unitPrice: 3.56
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should extract quantity from complex title", async()=>{
    const testUrl = `${__dirname}/egg.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Lodge Farms Large Free Range Eggs',
      url: 'https://www.aldi.com.au/en/groceries/fresh-produce/dairy-eggs/dairy-eggs-detail/ps/p/lodge-farms-large-free-range-eggs-12pk600g/',
      img: 'https://www.aldi.com.au/fileadmin/_processed_/b/8/csm_1001829-2_Q1-WEB-AUDIT_DAIRY-EGGS_1x1_228x128_1_RET_7e823d24d7.png',
      price: 4.49,
      quantity: 0.6,
      unitPrice: 7.48
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should handle lack of JSON", async()=>{
    const noJsonHtml = ''
    const productInfo = getProductInfo(noJsonHtml)
    expect(productInfo).toEqual(null)
  })
})



describe("Aldi page scraper", () => {
  it("should parse product data", async()=>{
    const html = fs.readFileSync(`${__dirname}/freezer.test.html`).toString()
    const productInfos = aldiPageProducts(html)
    const expectedJson = fs.readFileSync(`${__dirname}/expected.test.json`).toString()
    const expectedPageProductInfo = JSON.parse(expectedJson)

    expect(productInfos).toEqual(expectedPageProductInfo)
  })
})