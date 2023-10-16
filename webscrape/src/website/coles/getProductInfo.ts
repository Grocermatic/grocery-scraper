import { ProductInfo } from "../interface"
import { getUnitPriceFromString } from "../../dataCleaning/getUnitPriceFromString";
import { getMetricQuantity } from '../../dataCleaning/getMetricQuantity';



export const getProductInfo = (product: any) => {
  const urlSlug = `${product.brand}-${product.name}-${product.size}-${product.id}`.toLowerCase().split(' ').join('-')

  const productUnit = product.pricing.unit
  let quantity = getMetricQuantity(`${productUnit.quantity * productUnit.ofMeasureQuantity}${productUnit.ofMeasureUnits}`)
  try { quantity = getMetricQuantity(product.size) } catch { }

  const productInfo: ProductInfo = {
    name: product.name,
    url: `https://www.coles.com.au/product/${urlSlug}`,
    img: `https://productimages.coles.com.au/productimages${product.imageUris[0].uri}`,
    price: product.pricing.now,
    quantity: getMetricQuantity(product.size),
    unitPrice: getUnitPriceFromString(product.pricing.comparable)
  }
  return productInfo
}



export const filterUncomparableProduct = (jsonData: any) => {
  // Filter non-available products and quantities with each
  const products = JSON.parse(jsonData).props.pageProps.searchResults.results.filter((product: any) => {
    return product.availability == true
      && product.pricing.unit.ofMeasureUnits != 'ea'
  })
  return products
}



export const getProductInfoPage = (jsonData: any) => {
  const productInfos: ProductInfo[] = []

  const products = filterUncomparableProduct(jsonData)
  for (const product of products) {
    const productInfo = getProductInfo(product)
    productInfos.push(productInfo)
  }
  return productInfos
}

// const $ = cheerio.load(html)
// const jsonData = JSON.parse($('#__NEXT_DATA__').text())
