export interface ProductPriceDay {
  daySinceEpoch: number
  price: number
}

export interface ProductInfo {
  name: string
  url: string
  img: string
  price: number
  quantity: number
  unitPrice: number
}

export interface ProductInfoPublic {
  name: string
  url: string
  img: string
  quantity: number
  history: ProductPriceDay[]
  id?: number | string
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
