import { getMetricQuantity } from "./getMetricQuantity"
import { getNumFromString } from "./getNumFromString"
import { roundDecimal } from "./roundDecimal"



export const getUnitPriceFromString = (unitPriceImplicitString:string):number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  const unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  const unitPrice = roundDecimal(unitPriceImplicit / unitQuantityImplicit, 2)
  return unitPrice
}