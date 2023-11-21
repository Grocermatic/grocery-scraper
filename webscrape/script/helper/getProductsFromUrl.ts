import { ProductInfo } from '../../../common/interface'
import { config } from '../../../global'

export const getProductsFromUrl = async (): Promise<ProductInfo[]> => {
  const url = `${config.productBaseUrl}/cleanProductInfo.json`
  const res = await fetch(url)
  if (!res) return []
  return await res.json()
}
