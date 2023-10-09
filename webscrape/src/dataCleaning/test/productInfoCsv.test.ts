import { objectToCsvLine, productInfoCsv } from '../productInfoCsv'



describe("turn json object string into csv string", () => {
  it("should extract json object to one line with comma delimeters", ()=>{
    const jsonObject = {
      "name": "Kitchen Family Coleslaw Kit",
      "url": "https://www.coles.com.au/product/coles-kitchen-family-coleslaw-kit-520g-3615657",
      "img": "https://productimages.coles.com.au/productimages/3/3615657.jpg",
      "price": 4.5,
      "quantity": 0.52,
      "unitPrice": 8.65,
      "nutrition": {
        "servingSize": 0.13,
        "kilojoules": 370.58,
        "protein": 1.9,
        "fat": null,
        "fatSaturated": null,
        "carb": 8.5,
        "sugar": 3.8,
        "sodium": 145
      }
    }
    const expectedCsvLine = "Kitchen Family Coleslaw Kit,https://www.coles.com.au/product/coles-kitchen-family-coleslaw-kit-520g-3615657,https://productimages.coles.com.au/productimages/3/3615657.jpg,4.5,0.52,8.65,0.13,370.58,1.9,,,8.5,3.8,145"
    expect(objectToCsvLine(jsonObject)).toEqual(expectedCsvLine)
  })
})



describe("turn productInfo json to csv string", () => {
  it("should compile multiple lines", ()=>{
    const productInfos = [
      {
        "name": "Kitchen Family Coleslaw Kit",
        "url": "https://www.coles.com.au/product/coles-kitchen-family-coleslaw-kit-520g-3615657",
        "img": "https://productimages.coles.com.au/productimages/3/3615657.jpg",
        "price": 4.5,
        "quantity": 0.52,
        "unitPrice": 8.65,
        "nutrition": {
          "servingSize": 0.13,
          "kilojoules": 370.58,
          "protein": 1.9,
          "fat": null,
          "fatSaturated": null,
          "carb": 8.5,
          "sugar": 3.8,
          "sodium": 145
        },
      },
      {
        "name": "Market Fare Corn Kernels",
        "url": "https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-corn-kernels-1kg-1/",
        "img": "https://www.aldi.com.au/fileadmin/_processed_/a/2/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_2_b2bba5422e.jpg",
        "price": 4.19,
        "quantity": 1,
        "unitPrice": 4.19
      }
    ]
    let productsCsv = "Kitchen Family Coleslaw Kit,https://www.coles.com.au/product/coles-kitchen-family-coleslaw-kit-520g-3615657,https://productimages.coles.com.au/productimages/3/3615657.jpg,4.5,0.52,8.65,0.13,370.58,1.9,,,8.5,3.8,145\n"
    productsCsv += "Market Fare Corn Kernels,https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-corn-kernels-1kg-1/,https://www.aldi.com.au/fileadmin/_processed_/a/2/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_2_b2bba5422e.jpg,4.19,1,4.19\n"
    expect(productInfoCsv(productInfos)).toEqual(productsCsv)
  })
})
