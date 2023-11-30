import { AutoScaleAxis, Interpolation, LineChart, LineChartOptions } from 'chartist'
import { onMount, splitProps } from 'solid-js'

const options: LineChartOptions = {
  axisX: {
    type: AutoScaleAxis,
    onlyInteger: true,
  },
  lineSmooth: Interpolation.step({ postpone: false }),
  classNames: {
    line: 'fill-none stroke-dark',
    chart: '-ml-2',
    label: 'text-xs p-2',
    grid: 'stroke-light',
    start: 'justify-center p-4',
    vertical: 'absolute -ml-1 mt-2',
    horizontal: 'absolute -ml-2.5',
  },
}

export const ChartLine = (props: any) => {
  const [local, _] = splitProps(props, ['class', 'data'])
  let ctx: HTMLDivElement | undefined
  onMount(() => {
    if (!ctx) return
    new LineChart(ctx, local.data, options)
  })
  return <div ref={ctx} class={`h-full w-full ${local.class}`} />
}
