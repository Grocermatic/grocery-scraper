import * as fs from 'fs'

import { ProductInfo } from "../../interface"
import { getColesProductInfo } from "../getProductInfo"



describe("Coles product scraper", () => {
  it("should parse nutrition data", async()=>{
    const testUrl = `${__dirname}/milk.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getColesProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Full Cream Milk',
      url: 'https://www.coles.com.au/product/coles-full-cream-milk-3l-8150288',
      img: 'https://productimages.coles.com.au/productimages/8/8150288.jpg',
      price: 4.5,
      quantity: 3,
      unitPrice: 1.5,
      nutrition: {
        servingSize: 0.25,
        kilojoules: 260,
        protein: 3.4,
        fat: 3.3,
        fatSaturated: null,
        carb: 4.4,
        sugar: 4.3,
        sodium: 36
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })
  
  it("should handle lack of nutrition data", async()=>{
    const testUrl = `${__dirname}/rice.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getColesProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Medium Grain Brown Rice',
      url: 'https://www.coles.com.au/product/sunrice-medium-grain-brown-rice-1kg-154693',
      img: 'https://productimages.coles.com.au/productimages/1/154693.jpg',
      price: 4,
      quantity: 1,
      unitPrice: 4,
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should parse nutrition data", async()=>{
    const testUrl = `${__dirname}/grape.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getColesProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'White Seedless Grapes Loose',
      url: 'https://www.coles.com.au/product/coles-white-seedless-grapes-loose-approx.-800g-6706395',
      img: 'https://productimages.coles.com.au/productimages/6/6706395.jpg',
      price: 3.92,
      quantity: 0.8,
      unitPrice: 4.9,
      nutrition: {
        servingSize: 0.121,
        kilojoules: 276,
        protein: 0.6,
        fat: 1,
        fatSaturated: 0,
        carb: 15,
        sugar: 15,
        sodium: 4
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should handle lack of JSON", async()=>{
    const noJsonHtml = ''
    const productInfo = getColesProductInfo(noJsonHtml)
    expect(productInfo).toEqual(null)
  })
})