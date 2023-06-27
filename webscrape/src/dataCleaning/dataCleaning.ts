import { getMetricQuantity } from "./getMetricQuantity"
import { getNumFromString } from "./getNumFromString"



export const getUnitPriceFromString = (unitPriceImplicitString:string):number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  const unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  const unitPrice = unitPriceImplicit / unitQuantityImplicit
  return unitPrice
}