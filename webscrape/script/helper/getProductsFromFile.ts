import { readFileSync } from "fs"

export const getProductsFromFile = () => {
  let products: any[] = []
  const filePath = 'data/cleanProductInfo.json'
  const res = readFileSync(filePath).toString()
  if (!res) return products
  return JSON.parse(res)
}
