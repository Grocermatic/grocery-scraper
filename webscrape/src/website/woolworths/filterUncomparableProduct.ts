import { getUnitFromString } from '../../dataCleaning/getUnitFromString'

export const filterUncomparableProduct = (productJson: string) => {
  // Filter non-available products and quantities with each
  const products = JSON.parse(productJson)
    .Bundles.map((product: any) => {
      return product.Products[0]
    })
    .filter((product: any) => {
      return (
        getUnitFromString(product.DisplayName) &&
        getUnitFromString(product.CupMeasure) &&
        getUnitFromString(product.CupString) &&
        product.IsInStock
      )
    })
  return products
}
