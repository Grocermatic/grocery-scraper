import { expect, test } from 'vitest'
import { mergeStepChart } from '../mergeStepChart'
import { stepChart } from '../stepChart'

test('Function: mergeStepChart - should merge step charts', async () => {
  const charts = [
    [
      [0, 2],
      [5, 2],
    ],
    stepChart(
      [
        [-1, 3],
        [1, 1],
        [4, 3],
      ],
      5,
    ),
    stepChart([
      [-2, 4],
      [2, 0],
      [3, 4],
    ]),
  ]
  const expectedChart = stepChart(
    [
      [-2, 4],
      [-1, 3],
      [0, 2],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 2],
    ],
    5,
  )
  expect(mergeStepChart(charts)).toEqual(expectedChart)
})
