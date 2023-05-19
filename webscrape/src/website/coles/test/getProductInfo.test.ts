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
        servings: 12,
        servingSize: 0.25,
        kilojoules: 650,
        protein: 8.5,
        fat: 8.25,
        fatSaturated: 0,
        carb: 11,
        sugar: 10.75,
        sodium: 90
      }
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })
  
  it("should parse nutrition data", async()=>{
    const testUrl = `${__dirname}/rice.test.html`
    const testHtml:any = fs.readFileSync(testUrl)
    const productInfo = getColesProductInfo(testHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'Medium Grain Brown Rice',
      url: 'https://www.coles.com.au/product/sunrice-medium-grain-brown-rice-5kg-1751530',
      img: 'https://productimages.coles.com.au/productimages/1/1751530.jpg',
      price: 19,
      quantity: 5,
      unitPrice: 3.8,
      nutrition: {
        servings: 71.4,
        servingSize: 0.07,
        kilojoules: 514.5,
        protein: 2.73,
        fat: 0.84,
        fatSaturated: 0.7,
        carb: 25.2,
        sugar: 0.7,
        sodium: 3.5
      }
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
        servings: 6.6,
        servingSize: 0.121,
        kilojoules: 333.96,
        protein: 0.73,
        fat: 1.21,
        fatSaturated: 0,
        carb: 18.15,
        sugar: 18.15,
        sodium: 4.84
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