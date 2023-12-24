import { keys } from '../keys'
import { stepChart } from './stepChart'

export const mergeStepChart = (lineCharts: number[][][], lastX: undefined | number = undefined) => {
  const pointHash: {
    [x: number]: {
      y: number
      chartId: number
    }[]
  } = {}
  lineCharts.map((points: number[][], chartId: number) => {
    for (const point of points) {
      const oldPoint = pointHash[point[0]]
      const currentPoint = {
        y: point[1],
        chartId: chartId,
      }
      if (!oldPoint) pointHash[point[0]] = [currentPoint]
      else pointHash[point[0]].push(currentPoint)
    }
  })

  const currentY: {
    [chartId: number]: number
  } = {}
  const mergeStep: number[][] = []
  for (const x of keys(pointHash).toSorted((a, b) => Number(a) - Number(b))) {
    for (const point of pointHash[x]) currentY[point.chartId] = point.y
    const minValue = Math.min(...Object.values(currentY))
    const mergeId = mergeStep.length - 1
    if (mergeId == -1 || mergeStep[mergeId][1] != minValue) mergeStep.push([Number(x), minValue])
  }
  const lastPoint = mergeStep[mergeStep.length - 1]
  if (lastX) mergeStep.push([lastX, lastPoint[1]])
  return stepChart(mergeStep)
}
