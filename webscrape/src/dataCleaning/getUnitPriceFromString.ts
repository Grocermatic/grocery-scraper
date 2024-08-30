import { roundDecimal } from '../../../common/roundDecimal'
import { getMetricQuantity } from './getMetricQuantity'
import { getNumFromString } from './getNumFromString'

export const getUnitPriceFromString = (
  unitPriceImplicitString: string,
): number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  let unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  if (!unitPriceImplicitString.includes('$')) unitPriceImplicit /= 100
  const unitPrice = roundDecimal(unitPriceImplicit / unitQuantityImplicit, 2)
  return unitPrice
}
