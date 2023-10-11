import { ProductInfo } from "../interface"
import { getUnitPriceFromString } from "../../dataCleaning/getUnitPriceFromString";
import { getMetricQuantity } from "../../dataCleaning/getMetricQuantity";



export const getProductInfo = (product:any) => {
  const unitPriceString = product['CupString']
  const quantityString = product['PackageSize']

  const productInfo:ProductInfo = {
    name: product['Name'],
    url: `https://www.woolworths.com.au/shop/productdetails/${product['Stockcode']}`,
    img: product['MediumImageFile'],
    price: product['Price'],
    quantity: getMetricQuantity(quantityString),
    unitPrice: getUnitPriceFromString(unitPriceString)
  }
  return productInfo
}
