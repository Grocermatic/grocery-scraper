import * as fs from 'fs'

import { getWoolworthsProductInfo } from '../getProductInfo'
import { ProductInfo } from '../../interface'



describe("Woolworths product scraper", () => {
  it("should parse nutrition data", async()=>{
    const testUrl = `${__dirname}/milk.test.html`
    const html:string = await fs.readFileSync(testUrl).toString()
    const productInfo = getWoolworthsProductInfo(html)
    const expectedProductInfo:ProductInfo = {
      name: 'Woolworths Whole Milk 3l',
      url: 'https://www.woolworths.com.au/shop/productdetails/807384',
      img: 'https://cdn0.woolworths.media/content/wowproductimages/large/807384.jpg',
      price: 4.5,
      quantity: 3,
      unitPrice: 1.5,
      nutrition: {
        servings: 12,
        servingSize: 0.25,
        kilojoules: 659,
        protein: 8.3,
        fat: 8.5,
        fatSaturated: 5.5,
        carb: 12,
        sugar: 12,
        sodium: 110
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })
})