export const mergeStepChart = (lineCharts: number[][][]) => {
  // Sort all points by x coordinate, then y coordinate
  let points: number[][] = []
  lineCharts.forEach((lineChart: number[][]) => (points = [...points, ...lineChart]))
  points = points.sort((a, b) => {
    const dx = a[0] - b[0]
    if (dx != 0) return dx
    return a[1] - b[1]
  })

  // Determine smallest point of each x coordinate batch
  const batchPoints: number[][] = []
  points.forEach((point: number[]) => {
    const lastId = batchPoints.length - 1
    if (lastId == -1 || point[0] != batchPoints[lastId][0])
      return batchPoints.push([point[0], point[1]])
    if (point[1] < batchPoints[lastId][1]) batchPoints[lastId][1] = point[1]
  })

  // Create step graph from points
  const mergedLineChart: number[][] = []
  let lastX: undefined | number = undefined
  let lastY: undefined | number = undefined
  for (let i = batchPoints.length - 1; i >= 0; i--) {
    if (
      typeof lastX == 'number' &&
      typeof lastY == 'number' &&
      lastX != batchPoints[i][0] &&
      lastY != batchPoints[i][1]
    ) {
      lastY < batchPoints[i][1]
        ? mergedLineChart.unshift([lastX, batchPoints[i][1]])
        : mergedLineChart.unshift([batchPoints[i][0], lastY])
    }
    mergedLineChart.unshift([batchPoints[i][0], batchPoints[i][1]])
    lastX = batchPoints[i][0]
    lastY = batchPoints[i][1]
  }
  return mergedLineChart
}
