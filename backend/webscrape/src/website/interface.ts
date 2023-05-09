// Standardize product
export interface ProductNutrition {
  servings: number,
  servingSize: number,
  kilojoules: number,
  protein: number,
  fat: number,
  fatSaturated: number,
  carb: number,
  sugar: number,
  sodium: number,
  
  fibre?: number,
  nacin?: number,
  thiamin?: number,
  magnesium?: number,
  potassium?: number,
  trans?: number
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