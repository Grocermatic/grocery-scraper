import * as fs from 'fs'

import { ProductInfo } from "../../interface"
import { aldiPageProducts, getProductInfo } from "../getProductInfo"



const expectedPageProductInfo:ProductInfo[] = [
  {
    name: 'Market Fare Corn Kernels',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-corn-kernels-1kg-1/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/a/2/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_2_b2bba5422e.jpg',
    price: 4.19,
    quantity: 1,
    unitPrice: 4.19
  },
  {
    name: 'Market Fare Garden Peas',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-garden-peas-1kg-3/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/4/a/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_3_591795a34d.jpg',
    price: 2.59,
    quantity: 1,
    unitPrice: 2.59
  },
  {
    name: 'Market Fare Baby Peas',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-baby-peas-1kg/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/3/3/csm_1001605-7_1x1_Q4_WEB-AUDIT_FREEZER_228x128_1_e46efc8a61.jpg',
    price: 4.69,
    quantity: 1,
    unitPrice: 4.69
  },
  {
    name: 'Market Fare Peas, Carrots & Corn',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-peas-carrots-corn-1kg-2/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/a/b/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_4_32b4dc35ff.jpg',
    price: 4.19,
    quantity: 1,
    unitPrice: 4.19
  },
  {
    name: 'Market Fare Green Beans',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-green-beans-1kg/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/f/0/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_5_728efad4f0.jpg',
    price: 2.79,
    quantity: 1,
    unitPrice: 2.79
  },
  {
    name: 'Market Fare Broccoli',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-broccoli-500g-1/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/c/b/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_6_31d847d825.jpg',
    price: 2.99,
    quantity: 0.5,
    unitPrice: 5.98
  },
  {
    name: 'Market Fare Spinach',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-spinach-250g-2/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/a/d/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_7_e00448fa4c.jpg',
    price: 0.89,
    quantity: 0.25,
    unitPrice: 3.56
  },
  {
    name: 'Market Fare Winter Vegetables',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-winter-vegetables-1kg-2/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/1/8/csm_ALN3354_Q2-WEB-AUDIT_1x1_228x128_23_0421a1bc07.jpg',
    price: 4.19,
    quantity: 1,
    unitPrice: 4.19
  },
  {
    name: 'Market Fare Stir Fry Vegetables',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-stir-fry-vegetables-850g/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/d/3/csm_ALN2853_FROZEN_FOOD_1x1_228x128_2_b87e9b8cb1.jpg',
    price: 4.29,
    quantity: 0.85,
    unitPrice: 5.05
  },
  {
    name: 'Market Fare Cauliflower or Broccoli Bake',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-cauliflower-or-broccoli-bake-800g/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/b/6/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_8_b9622172af.jpg',
    price: 6.99,
    quantity: 0.8,
    unitPrice: 8.74
  },
  {
    name: 'The Best Margherita Pizza Ever',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/the-best-margherita-pizza-ever-365g/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/f/5/csm_ALN2626_MARGHERITA_PIZZA_1x1_228x128_663241c472.jpg',
    price: 6.49,
    quantity: 0.365,
    unitPrice: 17.78
  },
  {
    name: 'International Cuisine Beef Lasagne',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/international-cuisine-beef-lasagne-2kg/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/9/5/csm_ALN3708_Q4-WEB_NEW-1x1_228x128_14_369e372c71.jpg',
    price: 9.99,
    quantity: 2,
    unitPrice: 5
  },
  {
    name: 'Orchard & Vine Blueberries',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/orchard-vine-blueberries-500g-1/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/d/8/csm_ALN2364_FROZEN_FOOD_1x1_228x128_3_97631fd247.jpg',
    price: 5.69,
    quantity: 0.5,
    unitPrice: 11.38
  },
  {
    name: 'Kenny’s Frozen Dessert',
    url: 'https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/kennys-frozen-dessert-475ml/',
    img: 'https://www.aldi.com.au/fileadmin/_processed_/8/a/csm_ALN2853_FROZEN_FOOD_1x1_228x128_8_4f548ce5ec.jpg',
    price: 6.99,
    quantity: 0.475,
    unitPrice: 14.72
  }
]



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
    const testUrl = `${__dirname}/freezer.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const testProductInfos = aldiPageProducts(testHtml)
    expect(testProductInfos).toEqual(expectedPageProductInfo)
  })
})