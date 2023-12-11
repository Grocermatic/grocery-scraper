import { onMount, splitProps } from 'solid-js'
import uPlot, { AlignedData } from 'uplot'
import { daySinceEpoch } from '../../../common/daysSinceEpoch'
import { steppifyChart } from '../logic/chart/steppifyChart'
import { transpose } from '../logic/chart/transpose'

const dateFormatGB = (days: number, mini: boolean = true) => {
  if (!days) return '--'
  const date = new Date(days * 24 * 60 * 60 * 1000)
  const dateString = `${date.getUTCDate()}/${date.getMonth() + 1}`
  if (mini) return dateString
  else return `${dateString}/${date.getUTCFullYear().toString().slice(2)}`
}

export const ChartLine = (props: any) => {
  const [local, _] = splitProps(props, ['class', 'data'])
  let ctx: HTMLDivElement | undefined
  let legendRef: HTMLDivElement | undefined

  const _data = local.data.series[0].map((val: any) => [val.x, val.y])
  const data = transpose(steppifyChart(_data.reverse(), daySinceEpoch)) as AlignedData

  onMount(() => {
    if (!ctx || !legendRef) return
    const opts: uPlot.Options = {
      width: 0,
      height: 0,
      axes: [
        { values: (_u, splits) => splits.map((days) => (days % 1 == 0 ? dateFormatGB(days) : '')) },
      ],
      scales: { x: { time: true } },
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
          value: (_uplot, unitPrice) => (unitPrice ? unitPrice : _data[_data.length - 1][1]),
        },
      ],
      legend: { mount: (_self: uPlot, el: HTMLElement) => legendRef?.append(el) },
    }
    const plot = new uPlot(opts, data, ctx)
    new ResizeObserver((entries) => {
      plot.setSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height })
    }).observe(ctx)
  })
  return (
    <div>
      <div ref={legendRef}></div>
      <div ref={ctx} class={`h-48 w-full ${local.class} -mt-2`} />
    </div>
  )
}
