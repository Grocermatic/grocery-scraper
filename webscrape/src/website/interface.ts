// Standardize product

export interface ProductInfo {
  name: string
  url: string
  img: string
  price: number
  quantity: number
  unitPrice: number
}

export interface GetProductInfo {
  (html:string):ProductInfo | null
}

export interface GetBatchProductInfo {
  (urls:string[]):Promise<ProductInfo[]>
}

export interface GetProductLinks {
  ():Promise<string[]>
}