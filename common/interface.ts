export interface ProductPriceDay {
  daySinceEpoch: number
  price: number
}

export interface ProductInfo {
  name: string
  url: string
  img: string
  price?: number
  quantity: number
  unitPrice?: number
  id?: number | string
  priceHistory?: ProductPriceDay[]
}

export interface GetProductInfo {
  (product: any): ProductInfo
}

export interface GetBatchProductInfo {
  (urls: string[]): Promise<ProductInfo[]>
}

export interface GetProductLinks {
  (): Promise<string[]>
}
