import { expect, test } from 'vitest'
import type { Coordinates } from '../../../../../common/interface'
import { stepChart } from '../stepChart'

test('Function: stepChart - should not modify a flat line chart', async () => {
  const simpleChart: Coordinates[] = [
    [0, 2],
    [5, 2],
  ]
  expect(stepChart(simpleChart)).toEqual(simpleChart)
})
test('Function: stepChart - should steppify a chart', async () => {
  const simpleChart: Coordinates[] = [
    [-1, 3],
    [1, 1],
    [4, 3],
  ]
  const expectedChart: Coordinates[] = [
    [-1, 3],
    [1, 3],
    [1, 1],
    [4, 1],
    [4, 3],
  ]
  expect(stepChart(simpleChart)).toEqual(expectedChart)
})
test('Function: stepChart - should steppify a chart', async () => {
  const simpleChart: Coordinates[] = [
    [-2, 4],
    [2, 0],
    [3, 4],
  ]
  const expectedChart: Coordinates[] = [
    [-2, 4],
    [2, 4],
    [2, 0],
    [3, 0],
    [3, 4],
  ]
  expect(stepChart(simpleChart)).toEqual(expectedChart)
})
test('Function: stepChart - should account for chart extension', async () => {
  const simpleChart: Coordinates[] = [
    [-1, 3],
    [1, 1],
    [4, 3],
  ]
  const expectedChart: Coordinates[] = [
    [-1, 3],
    [1, 3],
    [1, 1],
    [4, 1],
    [4, 3],
    [5, 3],
  ]
  expect(stepChart(simpleChart, 5)).toEqual(expectedChart)
})
