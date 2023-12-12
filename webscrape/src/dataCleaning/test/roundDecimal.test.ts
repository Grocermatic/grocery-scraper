import { expect, test } from 'vitest'
import { roundDecimal } from '../../../../common/roundDecimal'

test('Function: roundDecimal - should extract numbers including decimals from string', async () => {
  const num = 0.12
  expect(roundDecimal(num, 0)).toEqual(0)
  expect(roundDecimal(num, 1)).toEqual(0.1)
  expect(roundDecimal(num, 2)).toEqual(0.12)
  expect(roundDecimal(num, 3)).toEqual(0.12)
})
