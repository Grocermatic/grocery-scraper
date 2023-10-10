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
      unitPrice: 3.2
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
      unitPrice: 1.5
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
      unitPrice: 2.25
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })
})