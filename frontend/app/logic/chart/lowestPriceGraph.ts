import { daySinceEpoch } from '../../../../common/daysSinceEpoch'
import type { Coordinates, ProductInfoPublic, ProductPriceDay } from '../../../../common/interface'
import { roundDecimal } from '../../../../common/roundDecimal'
import { mergeStepChart } from './mergeStepChart'
import { transpose } from './transpose'

export const lowestPriceGraph = (productList: ProductInfoPublic[]) => {
  const priceGraphs: Coordinates[][] = productList.map((product) =>
    product.history.map((p: ProductPriceDay) => [
      p.daySinceEpoch,
      roundDecimal(p.price / product.quantity, 2),
    ]),
  )
  return transpose(mergeStepChart(priceGraphs, daySinceEpoch))
}
