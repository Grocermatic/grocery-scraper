import { getNumFromString } from "./getNumFromString"
import { getUnitFromString } from "./getUnitFromString"
import { roundDecimal } from "./roundDecimal"



export const getMetricQuantity = (quanityString:string):number => {
  const numArray = getNumFromString(quanityString)
  if (numArray.length == 0) { return 0 }

  // Assume last number is associated with quantity
  const unitMeasure = getUnitFromString(quanityString)
  let metricQuantity = numArray.slice(-1)[0]

  if (['g', 'ml'].includes(unitMeasure)) {
    metricQuantity /= 1000
  }

  return roundDecimal(metricQuantity, 3)
}



export const getUnitPriceFromString = (unitPriceImplicitString:string):number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  const unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  const unitPrice = unitPriceImplicit / unitQuantityImplicit
  return unitPrice
}