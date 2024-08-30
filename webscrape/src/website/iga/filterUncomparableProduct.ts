import { getUnitFromString } from '../../dataCleaning/getUnitFromString'

export const filterUncomparableProduct = (productJson: string) => {
  // Filter non-available products and quantities with each
  const products = JSON.parse(productJson).items.filter((product: any) => {
    return (
      product.available &&
      product.pricePerUnit &&
      getUnitFromString(product.pricePerUnit)
    )
  })
  return products
}
