import { onMount, splitProps } from 'solid-js'
import uPlot, { AlignedData } from 'uplot'
import { daySinceEpoch } from '../../../common/daysSinceEpoch'

const dateFormatGB = (days: number, mini: boolean = true) => {
  if (!days) return '--'
  const date = new Date(days * 24 * 60 * 60 * 1000)
  const dateString = `${date.getUTCDate()}/${date.getUTCMonth()}`
  if (mini) return dateString
  else return `${dateString}/${date.getUTCFullYear().toString().slice(2)}`
}

const steppifyChart = (lineChart: number[][], startX = 0) => {
  const [_x, _y] = lineChart
  const x: number[] = []
  const y: number[] = []
  for (let i = 0; i < _x.length; i++) {
    x.unshift(startX)
    x.unshift(_x[i])
    y.unshift(_y[i])
    y.unshift(_y[i])
    startX = _x[i]
  }
  return [x, y] as AlignedData
}

export const ChartLine = (props: any) => {
  const [local, _] = splitProps(props, ['class', 'data'])
  let ctx: HTMLDivElement | undefined
  let legendRef: HTMLDivElement | undefined

  const _x = local.data.series[0].map((val: any) => val.x)
  const _y = local.data.series[0].map((val: any) => val.y)
  const data = steppifyChart([_x, _y], daySinceEpoch + 1)

  onMount(() => {
    if (!ctx || !legendRef) return
    const opts: uPlot.Options = {
      width: 0,
      height: 0,
      axes: [
        {
          values: (_u, splits) =>
            splits.map((days) => {
              if (days % 1 != 0) return ''
              return dateFormatGB(days)
            }),
        },
      ],
      scales: {
        x: {
          time: true,
        },
      },
      series: [
        {
          label: 'Date',
          value: (_uplot, days) =>
            days ? dateFormatGB(days, false) : dateFormatGB(daySinceEpoch, false),
        },
        {
          label: '$/kg',
          stroke: 'red',
          width: 2,
          value: (_uplot, unitPrice) => (unitPrice ? unitPrice : _y[0]),
        },
      ],
      legend: {
        mount: (_self: uPlot, el: HTMLElement) => {
          if (legendRef) legendRef.append(el)
        },
      },
    }
    const plot = new uPlot(opts, data, ctx)
    const chartSizeObserver = new ResizeObserver((entries) => {
      plot.setSize({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      })
    })
    chartSizeObserver.observe(ctx)
  })
  return (
    <div>
      <div ref={legendRef}></div>
      <div ref={ctx} class={`h-48 w-full ${local.class} -mt-4`} />
    </div>
  )
}
