import { roundDecimal } from '../../../common/roundDecimal'
import { getNumFromString } from './getNumFromString'
import { getUnitFromString } from './getUnitFromString'

export const getMetricQuantity = (_quantityString: string): number => {
  const quantityString = _quantityString.toLowerCase()
  if (quantityString.slice(-6) === 'per kg') return 1
  if (quantityString.slice(-9) === 'per litre') return 1
  const numArray = getNumFromString(quantityString)
  if (numArray.length === 0) return 0

  // Assume last number is associated with quantity
  let metricQuantity = numArray.slice(-1)[0]

  // Get last 2 letters after quantity as units
  const regex = new RegExp(`${metricQuantity}..?`)
  const quantitySnippet = (quantityString.match(regex) as RegExpMatchArray)[0]
    .split(' ')
    .join('')
  const unitMeasure = getUnitFromString(quantitySnippet)

  if (['g', 'ml'].includes(unitMeasure)) metricQuantity /= 1000
  return roundDecimal(metricQuantity, 3)
}
