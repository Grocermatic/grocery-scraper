export const getUnitFromString = (str: string): string => {
  let unitMeasure = str.slice(-2).toLowerCase() // Units are assumed to be 1-2 characters
  unitMeasure = unitMeasure.replace(/[^a-z]/g, '') // Only extract letters
  if (!['l', 'ml', 'kg', 'g'].includes(unitMeasure)) return ''
  return unitMeasure
}
