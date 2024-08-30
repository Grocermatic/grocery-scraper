import { config } from '../../../common/global'
import type { ProductInfoPublic } from '../../../common/interface'

export const getProductsFromUrl = async (): Promise<ProductInfoPublic[]> => {
  const url = `${config.productBaseUrl}/cleanProductInfo.json`
  const res = await fetch(url)
  if (!res) return []
  return await res.json()
}
