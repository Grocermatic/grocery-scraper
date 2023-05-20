import * as fs from 'fs'

import { getWoolworthsProductInfo } from '../getProductInfo'
import { ProductInfo } from '../../interface'



describe("Woolworths product scraper", () => {
  it("should not parse servingSize and fatSaturated: onion", async()=>{
    const testUrl = `${__dirname}/onion.test.json`
    const html:string = await fs.readFileSync(testUrl).toString()
    const productInfo = getWoolworthsProductInfo(html)
    const expectedProductInfo:ProductInfo = {
      name: 'Woolworths Onion Brown Bag',
      url: 'https://www.woolworths.com.au/shop/productdetails/144336',
      img: 'https://cdn0.woolworths.media/content/wowproductimages/large/144336.jpg',
      price: 3.2,
      quantity: 1,
      unitPrice: 3.2,
      nutrition: {
        servingSize: null,
        kilojoules: 120,
        protein: 1.6,
        fat: 0.1,
        fatSaturated: null,
        carb: 4.3,
        sugar: 4.3,
        sodium: 10
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should parse all data: milk", async()=>{
    const testUrl = `${__dirname}/milk.test.json`
    const html:string = await fs.readFileSync(testUrl).toString()
    const productInfo = getWoolworthsProductInfo(html)
    const expectedProductInfo:ProductInfo = {
      name: 'Woolworths Lite Milk',
      url: 'https://www.woolworths.com.au/shop/productdetails/888141',
      img: 'https://cdn0.woolworths.media/content/wowproductimages/large/888141.jpg',
      price: 4.5,
      quantity: 3,
      unitPrice: 1.5,
      nutrition: {
        servingSize: 0.25,
        kilojoules: 189,
        protein: 3.4,
        fat: 1.3,
        fatSaturated: 0.9,
        carb: 4.9,
        sugar: 4.9,
        sodium: 43
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should extrapolate nutrition info: potato", async()=>{
    const testUrl = `${__dirname}/potato.test.json`
    const html:string = await fs.readFileSync(testUrl).toString()
    const productInfo = getWoolworthsProductInfo(html)
    const expectedProductInfo:ProductInfo = {
      name: 'Woolworths Brushed Potatoes Bag',
      url: 'https://www.woolworths.com.au/shop/productdetails/124831',
      img: 'https://cdn0.woolworths.media/content/wowproductimages/large/124831.jpg',
      price: 9,
      quantity: 4,
      unitPrice: 2.25,
      nutrition: {
        servingSize: 0.075,
        kilojoules: 246.67,
        protein: 2.3,
        fat: 0.1,
        fatSaturated: 0.1,
        carb: 12.9,
        sugar: 0.67,
        sodium: 4
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })
})