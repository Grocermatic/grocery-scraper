import { createEffect, splitProps } from 'solid-js'
import uPlot from 'uplot'
import { daySinceEpoch } from '../../../common/daysSinceEpoch'

const dateFormatGB = (days: number, mini = true) => {
  if (!days) return '--'
  const date = new Date(days * 24 * 60 * 60 * 1000)
  const dateString = `${date.getUTCDate()}/${date.getMonth() + 1}`
  if (mini) return dateString
  return `${dateString}/${date.getUTCFullYear().toString().slice(2)}`
}

export const ChartLine = (props: any) => {
  const [local, _] = splitProps(props, ['class', 'data'])
  let ctx: HTMLDivElement | undefined
  let legendRef: HTMLDivElement | undefined
  let plot: undefined | uPlot

  createEffect(() => {
    if (!ctx || !legendRef) return
    plot?.destroy()
    const opts: uPlot.Options = {
      width: 0,
      height: 0,
      axes: [
        {
          values: (_u, splits) =>
            splits.map((days) => (days % 1 === 0 ? dateFormatGB(days) : '')),
        },
      ],
      scales: { x: { time: true } },
      series: [
        {
          label: 'Date',
          value: (_uplot, days) =>
            days
              ? dateFormatGB(days, false)
              : dateFormatGB(daySinceEpoch, false),
        },
        {
          label: '$/kg',
          stroke: 'red',
          width: 2,
          value: (_uplot, unitPrice) =>
            unitPrice ? unitPrice : local.data[1][local.data[0].length - 1],
        },
      ],
      legend: {
        mount: (_self: uPlot, el: HTMLElement) => legendRef?.append(el),
      },
    }
    plot = new uPlot(opts, local.data, ctx)
    new ResizeObserver((entries) => {
      plot?.setSize({
        width: entries[0]!.contentRect.width,
        height: entries[0]!.contentRect.height,
      })
    }).observe(ctx)
  })
  return (
    <div>
      <div ref={legendRef!} />
      <div ref={ctx!} class={`h-48 w-full ${local.class} -mt-2`} />
    </div>
  )
}
