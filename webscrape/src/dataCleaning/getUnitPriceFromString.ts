import { getMetricQuantity } from './getMetricQuantity'
import { getNumFromString } from './getNumFromString'
import { roundDecimal } from './roundDecimal'

export const getUnitPriceFromString = (
  unitPriceImplicitString: string,
): number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  let unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  if (!unitPriceImplicitString.includes('$')) unitPriceImplicit /= 100
  const unitPrice = roundDecimal(unitPriceImplicit / unitQuantityImplicit, 2)
  return unitPrice
}
