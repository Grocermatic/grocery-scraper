import { test, expect } from 'vitest'
import { getNumFromString } from '../getNumFromString'

test('Function: getNumFromString - should extract numbers including decimals', async () => {
  const numArray = getNumFromString('abc12def3.4 5.6 7.89')
  expect(numArray).toEqual([12, 3.4, 5.6, 7.89])
})

test('Function: getNumFromString - should handle no numbers', async () => {
  const numArray = getNumFromString('abcdef')
  expect(numArray).toEqual([])
})

test('Function: getNumFromString - should handle empty string', async () => {
  const numArray = getNumFromString('')
  expect(numArray).toEqual([])
})
