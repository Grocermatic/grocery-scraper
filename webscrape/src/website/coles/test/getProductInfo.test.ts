import * as fs from 'fs'

import { ProductInfo } from "../../interface"
import { colesPageProducts, getColesProductInfo } from "../getProductInfo"



const expectedPageProductInfo:ProductInfo[] = [
  {
    name: 'Bananas',
    url: 'https://www.coles.com.au/product/fresh-bananas-approx.-180g-each-409499',
    img: 'https://productimages.coles.com.au/productimages/4/409499.jpg',
    price: 0.45,
    quantity: 0.18,
    unitPrice: 2.5
  },
  {
    name: 'White Seedless Grapes Loose',
    url: 'https://www.coles.com.au/product/coles-white-seedless-grapes-loose-approx.-800g-6706395',
    img: 'https://productimages.coles.com.au/productimages/6/6706395.jpg',
    price: 2.88,
    quantity: 0.8,
    unitPrice: 3.6
  },
  {
    name: 'Strawberries Prepacked',
    url: 'https://www.coles.com.au/product/fresh-strawberries-prepacked-250g-5191256',
    img: 'https://productimages.coles.com.au/productimages/5/5191256.jpg',
    price: 4.5,
    quantity: 0.25,
    unitPrice: 18
  },
  {
    name: 'Imperial Mandarins Medium',
    url: 'https://www.coles.com.au/product/coles-imperial-mandarins-medium-approx.-80g-409750',
    img: 'https://productimages.coles.com.au/productimages/4/409750.jpg',
    price: 0.23,
    quantity: 0.08,
    unitPrice: 2.9
  },
  {
    name: 'Broccoli',
    url: 'https://www.coles.com.au/product/coles-broccoli-approx.-340g-each-407755',
    img: 'https://productimages.coles.com.au/productimages/4/407755.jpg',
    price: 1.53,
    quantity: 0.34,
    unitPrice: 4.5
  },
  {
    name: 'Raspberries',
    url: 'https://www.coles.com.au/product/coles-raspberries-125g-134029',
    img: 'https://productimages.coles.com.au/productimages/1/134029.jpg',
    price: 4,
    quantity: 0.125,
    unitPrice: 32
  },
  {
    name: 'Royal Gala Apples Loose',
    url: 'https://www.coles.com.au/product/coles-royal-gala-apples-loose-approx.-160g-each-5226000',
    img: 'https://productimages.coles.com.au/productimages/5/5226000.jpg',
    price: 0.78,
    quantity: 0.16,
    unitPrice: 4.9
  },
  {
    name: 'Carrots Prepacked 1Kg',
    url: 'https://www.coles.com.au/product/coles-carrots-prepacked-1kg-1-each-9006560',
    img: 'https://productimages.coles.com.au/productimages/9/9006560.jpg',
    price: 2.4,
    quantity: 1,
    unitPrice: 2.4
  },
  {
    name: 'Green Zucchini',
    url: 'https://www.coles.com.au/product/coles-green-zucchini-approx.-260g-each-4910506',
    img: 'https://productimages.coles.com.au/productimages/4/4910506.jpg',
    price: 1.69,
    quantity: 0.26,
    unitPrice: 6.5
  },
  {
    name: 'William Bartlett Pears',
    url: 'https://www.coles.com.au/product/coles-william-bartlett-pears-approx.-200g-each-409998',
    img: 'https://productimages.coles.com.au/productimages/4/409998.jpg',
    price: 0.5,
    quantity: 0.2,
    unitPrice: 2.5
  },
  {
    name: 'Red Capsicum',
    url: 'https://www.coles.com.au/product/coles-red-capsicum-approx.-200g-each-4580208',
    img: 'https://productimages.coles.com.au/productimages/4/4580208.jpg',
    price: 1.58,
    quantity: 0.2,
    unitPrice: 7.9
  },
  {
    name: 'Greenhouse Truss Tomatoes',
    url: 'https://www.coles.com.au/product/coles-greenhouse-truss-tomatoes-approx.-140g-each-4628676',
    img: 'https://productimages.coles.com.au/productimages/4/4628676.jpg',
    price: 1.53,
    quantity: 0.14,
    unitPrice: 10.9
  },
  {
    name: 'Sweet Gold Potatoes Loose',
    url: 'https://www.coles.com.au/product/coles-sweet-gold-potatoes-loose-approx.-350g-each-4199503',
    img: 'https://productimages.coles.com.au/productimages/4/4199503.jpg',
    price: 1.72,
    quantity: 0.35,
    unitPrice: 4.9
  },
  {
    name: 'Brown Onions Loose',
    url: 'https://www.coles.com.au/product/fresh-brown-onions-loose-approx.-180g-each-4239517',
    img: 'https://productimages.coles.com.au/productimages/4/4239517.jpg',
    price: 0.67,
    quantity: 0.18,
    unitPrice: 3.7
  },
  {
    name: 'Brown Onions',
    url: 'https://www.coles.com.au/product/coles-brown-onions-1kg-4803991',
    img: 'https://productimages.coles.com.au/productimages/4/4803991.jpg',
    price: 2,
    quantity: 1,
    unitPrice: 2
  },
  {
    name: 'Field Tomatoes Loose',
    url: 'https://www.coles.com.au/product/coles-field-tomatoes-loose-approx.-110g-each-4597109',
    img: 'https://productimages.coles.com.au/productimages/4/4597109.jpg',
    price: 1.2,
    quantity: 0.11,
    unitPrice: 10.9
  },
  {
    name: 'Fresh Loose Cup Mushrooms',
    url: 'https://www.coles.com.au/product/coles-fresh-loose-cup-mushrooms-approx.-200g-4594010',
    img: 'https://productimages.coles.com.au/productimages/4/4594010.jpg',
    price: 2.58,
    quantity: 0.2,
    unitPrice: 12.9
  },
  {
    name: 'Grape Mini Roma Tomatoes',
    url: 'https://www.coles.com.au/product/coles-grape-mini-roma-tomatoes-250g-7941197',
    img: 'https://productimages.coles.com.au/productimages/7/7941197.jpg',
    price: 3,
    quantity: 0.25,
    unitPrice: 12
  },
  {
    name: 'Pink Lady Apples',
    url: 'https://www.coles.com.au/product/coles-pink-lady-apples-approx.-200g-each-5111654',
    img: 'https://productimages.coles.com.au/productimages/5/5111654.jpg',
    price: 1.18,
    quantity: 0.2,
    unitPrice: 5.9
  },
  {
    name: 'Medium Navel Oranges',
    url: 'https://www.coles.com.au/product/coles-medium-navel-oranges-approx.-180g-each-4255717',
    img: 'https://productimages.coles.com.au/productimages/4/4255717.jpg',
    price: 0.88,
    quantity: 0.18,
    unitPrice: 4.9
  },
  {
    name: 'Carrots Loose',
    url: 'https://www.coles.com.au/product/coles-carrots-loose-approx.-170g-each-4223335',
    img: 'https://productimages.coles.com.au/productimages/4/4223335.jpg',
    price: 0.42,
    quantity: 0.17,
    unitPrice: 2.5
  },
  {
    name: 'Seedless Watermelon Cut',
    url: 'https://www.coles.com.au/product/coles-seedless-watermelon-cut-approx-1.99-kg-each-7508229',
    img: 'https://productimages.coles.com.au/productimages/7/7508229.jpg',
    price: 5.77,
    quantity: 1.99,
    unitPrice: 2.9
  },
  {
    name: 'Blackberries Prepacked',
    url: 'https://www.coles.com.au/product/coles-blackberries-prepacked-125g-134040',
    img: 'https://productimages.coles.com.au/productimages/1/134040.jpg',
    price: 4.5,
    quantity: 0.125,
    unitPrice: 36
  },
  {
    name: 'Creme Gold Washed Potatoes Loose',
    url: 'https://www.coles.com.au/product/coles-creme-gold-washed-potatoes-loose-approx-140g-each-1182162',
    img: 'https://productimages.coles.com.au/productimages/1/1182162.jpg',
    price: 0.63,
    quantity: 0.14,
    unitPrice: 4.5
  },
  {
    name: 'Grape Perino Tomatoes Prepacked',
    url: 'https://www.coles.com.au/product/coles-grape-perino-tomatoes-prepacked-200g-7265535',
    img: 'https://productimages.coles.com.au/productimages/7/7265535.jpg',
    price: 3.5,
    quantity: 0.2,
    unitPrice: 17.5
  },
  {
    name: 'Lebanese Cucumbers',
    url: 'https://www.coles.com.au/product/coles-lebanese-cucumbers-approx.-210g-4575208',
    img: 'https://productimages.coles.com.au/productimages/4/4575208.jpg',
    price: 1.24,
    quantity: 0.21,
    unitPrice: 5.9
  },
  {
    name: 'Blueberries Prepacked',
    url: 'https://www.coles.com.au/product/coles-blueberries-prepacked-125g-5543535',
    img: 'https://productimages.coles.com.au/productimages/5/5543535.jpg',
    price: 6.9,
    quantity: 0.125,
    unitPrice: 55.2
  },
  {
    name: 'Red Onions Loose',
    url: 'https://www.coles.com.au/product/coles-red-onions-loose-approx.-200g-each-4218459',
    img: 'https://productimages.coles.com.au/productimages/4/4218459.jpg',
    price: 0.88,
    quantity: 0.2,
    unitPrice: 4.4
  },
  {
    name: 'Kent Pumpkin Cut',
    url: 'https://www.coles.com.au/product/coles-kent-pumpkin-cut-approx.-900g-each-4202540',
    img: 'https://productimages.coles.com.au/productimages/4/4202540.jpg',
    price: 1.35,
    quantity: 0.9,
    unitPrice: 1.5
  },
  {
    name: 'Green Capsicum Loose',
    url: 'https://www.coles.com.au/product/coles-green-capsicum-loose-approx.-250g-each-7214862',
    img: 'https://productimages.coles.com.au/productimages/7/7214862.jpg',
    price: 1.73,
    quantity: 0.25,
    unitPrice: 6.9
  },
  {
    name: 'Baby Cucumbers',
    url: 'https://www.coles.com.au/product/coles-baby-cucumbers-250g-4578148',
    img: 'https://productimages.coles.com.au/productimages/4/4578148.jpg',
    price: 4.5,
    quantity: 0.25,
    unitPrice: 18
  },
  {
    name: 'Baby Carrots Prepacked',
    url: 'https://www.coles.com.au/product/coles-baby-carrots-prepacked-500g-4236122',
    img: 'https://productimages.coles.com.au/productimages/4/4236122.jpg',
    price: 1.2,
    quantity: 0.5,
    unitPrice: 2.4
  },
  {
    name: 'Kids Pack Bananas',
    url: 'https://www.coles.com.au/product/coles-kids-pack-bananas-750g-2511791',
    img: 'https://productimages.coles.com.au/productimages/2/2511791.jpg',
    price: 2.5,
    quantity: 0.75,
    unitPrice: 3.33
  },
  {
    name: 'Ready To Eat Strawberry Jelly',
    url: 'https://www.coles.com.au/product/aeroplane-ready-to-eat-strawberry-jelly-120g-1389353',
    img: 'https://productimages.coles.com.au/productimages/1/1389353.jpg',
    price: 1.2,
    quantity: 0.12,
    unitPrice: 10
  },
  {
    name: 'Red Seedless Grapes',
    url: 'https://www.coles.com.au/product/coles-red-seedless-grapes-approx.-800g-6706191',
    img: 'https://productimages.coles.com.au/productimages/6/6706191.jpg',
    price: 3.6,
    quantity: 0.8,
    unitPrice: 4.5
  }
]



describe("Coles page scraper", () => {
  it("should parse product data", async()=>{
    const testUrl = `${__dirname}/fruit-vegetables.test.json`
    const testJson:any = fs.readFileSync(testUrl)
    const testPageProductInfos = colesPageProducts(testJson)
    expect(testPageProductInfos).toEqual(expectedPageProductInfo)
  })
})