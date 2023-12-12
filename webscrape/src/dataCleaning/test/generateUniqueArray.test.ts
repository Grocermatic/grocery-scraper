import { test, expect } from 'vitest'
import { generateUniqueArray } from '../generateUniqueArray'

test('Function: generateUniqueArray - should produce array containing only unique elements', () => {
  const originalArray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]
  const expectedArray = [1, 2, 3, 4, 5]
  const uniqueArray = generateUniqueArray(originalArray)
  expect(uniqueArray).toEqual(expectedArray)
})
