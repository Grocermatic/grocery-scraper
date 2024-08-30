export type ProductPriceDay = {
  daySinceEpoch: number
  price: number
}

export type ProductInfo = {
  name: string
  url: string
  img: string
  price: number
  quantity: number
  unitPrice: number
}

export type ProductInfoPublic = {
  name: string
  url: string
  img: string
  price: number
  quantity: number
  history: [ProductPriceDay, ...ProductPriceDay[]] // Minimum length of one
  unitPrice: number
}

export type GetProductInfo = (product: any) => ProductInfo

export type GetBatchProductInfo = (urls: string[]) => Promise<ProductInfo[]>

export type GetProductLinks = () => Promise<string[]>

export type Coordinates = [number, number]
