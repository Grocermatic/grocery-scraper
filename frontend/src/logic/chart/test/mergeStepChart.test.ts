import { mergeStepChart } from '../mergeStepChart'
import { stepChart } from '../stepChart'

describe('steppify a chart', () => {
  it('Should not modify a flat line chart', async () => {
    const charts = [
      [
        [0, 2],
        [5, 2],
      ],
      [
        [-1, 3],
        [1, 3],
        [1, 1],
        [4, 1],
        [4, 3],
        [5, 3],
      ],
      [
        [-2, 4],
        [2, 4],
        [2, 0],
        [3, 0],
        [3, 4],
        [5, 4],
      ],
    ]
    const expectedChart = stepChart([
      [-2, 4],
      [-1, 3],
      [0, 2],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 2],
      [5, 2],
    ])
    expect(mergeStepChart(charts)).toEqual(expectedChart)
  })
})
