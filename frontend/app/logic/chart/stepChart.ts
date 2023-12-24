import type { Coordinates } from '../../../../common/interface'

export const stepChart = (lineChart: Coordinates[], lastX: undefined | number = undefined) => {
  const stepChart: Coordinates[] = []
  let lastY: undefined | number = undefined
  for (let i = lineChart.length - 1; i >= 0; i--) {
    if (typeof lastX == 'number' && lastX != lineChart[i]![0] && lastY != lineChart[i]![1]) {
      stepChart.unshift([lastX, lineChart[i]![1]])
    }
    stepChart.unshift([lineChart[i]![0], lineChart[i]![1]])
    lastX = lineChart[i]![0]
    lastY = lineChart[i]![1]
  }
  return stepChart
}
