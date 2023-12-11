import { stepChart } from '../stepChart'

describe('steppify a chart', () => {
  it('Should not modify a flat line chart', async () => {
    const simpleChart = [
      [0, 2],
      [5, 2],
    ]
    expect(stepChart(simpleChart)).toEqual(simpleChart)
  })
  it('Should steppify a chart', async () => {
    const simpleChart = [
      [-1, 3],
      [1, 1],
      [4, 3],
    ]
    const expectedChart = [
      [-1, 3],
      [1, 3],
      [1, 1],
      [4, 1],
      [4, 3],
    ]
    expect(stepChart(simpleChart)).toEqual(expectedChart)
  })
  it('Should steppify a chart', async () => {
    const simpleChart = [
      [-2, 4],
      [2, 0],
      [3, 4],
    ]
    const expectedChart = [
      [-2, 4],
      [2, 4],
      [2, 0],
      [3, 0],
      [3, 4],
    ]
    expect(stepChart(simpleChart)).toEqual(expectedChart)
  })
  it('Should account for shift', async () => {
    const simpleChart = [
      [-1, 3],
      [1, 1],
      [4, 3],
    ]
    const expectedChart = [
      [-1, 3],
      [1, 3],
      [1, 1],
      [4, 1],
      [4, 3],
      [5, 3],
    ]
    expect(stepChart(simpleChart, 5)).toEqual(expectedChart)
  })
})
