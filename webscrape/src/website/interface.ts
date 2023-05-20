// Standardize product
export interface ProductNutrition {
  servingSize: number | null,
  kilojoules: number | null,
  protein: number | null,
  fat: number | null,
  fatSaturated: number | null,
  carb: number | null,
  sugar: number | null,
  sodium: number | null,
}

export interface ProductInfo {
  name: string
  url: string
  img: string
  price: number
  quantity: number
  unitPrice: number
  nutrition?: ProductNutrition
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