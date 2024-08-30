import { expect, test } from 'vitest'
import { daySinceEpoch } from '../../../../common/daysSinceEpoch'
import type {
  ProductInfo,
  ProductInfoPublic,
} from '../../../../common/interface'
import { cloneJson } from '../../../../frontend/app/logic/cloneJson'
import { hashProducts, initProduct, mergeProduct } from '../mergeProduct'

const productInfos: ProductInfo[] = [
  {
    name: 'name 0',
    url: 'url 0',
    img: 'img 0',
    price: 2,
    quantity: 2,
    unitPrice: 1,
  },
  {
    name: 'name 1',
    url: 'url 1',
    img: 'jpg 1',
    price: 5,
    quantity: 5,
    unitPrice: 1,
  },
]

const productInfoPublic: ProductInfoPublic = {
  name: 'name 0',
  url: 'url 0',
  img: 'img 0',
  quantity: 2,
  history: [
    {
      daySinceEpoch: daySinceEpoch,
      price: 2,
    },
  ],
}

test('Function hashProducts - should transform ProductInfo arrays to a hashtable', () => {
  const expectedArray: { [key: string]: ProductInfo } = {}
  expectedArray[productInfos[0].url] = productInfos[0]
  expectedArray[productInfos[1].url] = productInfos[1]
  const array = hashProducts(productInfos as any)
  expect(array).toEqual(expectedArray)
})

test('Function initProduct - should transform ProductInfo with history', () => {
  const newProductInfo = initProduct(productInfos[0])
  expect(newProductInfo).toEqual(productInfoPublic)
})

test('Function mergeProduct - should push new price to history array', () => {
  // Replace old history
  const oldProductInfoPublic = cloneJson(productInfoPublic)
  oldProductInfoPublic.history = [
    {
      daySinceEpoch: 0,
      price: 1,
    },
  ]
  // Push new price to expected history
  const expectedProductInfoPublic = cloneJson(oldProductInfoPublic)
  const initProductInfo = initProduct(productInfos[0])
  if (initProductInfo.history)
    expectedProductInfoPublic.history.unshift(initProductInfo.history[0])

  const newProductInfo = mergeProduct(oldProductInfoPublic, productInfos[0])
  expect(newProductInfo).toEqual(expectedProductInfoPublic)
})

test('Function mergeProduct - should not update date of same price in price history', () => {
  // Replace old history
  const oldProductInfoPublic = cloneJson(productInfoPublic)
  oldProductInfoPublic.history = [
    {
      daySinceEpoch: 0,
      price: 2,
    },
  ]

  const newProductInfo = mergeProduct(oldProductInfoPublic, productInfos[0])
  expect(newProductInfo).toEqual(oldProductInfoPublic)
})
