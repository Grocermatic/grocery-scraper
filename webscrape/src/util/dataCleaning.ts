export const generateRandInt = (min:number, max:number):number => {
  const randomInteger = min + Math.floor((max - min + 1) * Math.random())
  return randomInteger <= max ? randomInteger : randomInteger - 1
}



export const roundDecimal = (decimal:number, places:number):number => {
  return Math.round(decimal * 10**places) / 10**places
}



export const getNumFromString = (str:string):number[] => {
  const matches = str.match(/\d+(\.\d+)?/g) // Match integers and decimals
  if (matches) {
    let numArray:number[] = []
    matches.forEach((num:string) => {
      numArray.push(parseFloat(num))
    })
    return numArray
  }
  return [];
}



export const getUnitFromString = (str:string):string => {
  let unitMeasure = str.slice(-2).toLowerCase() // Units are assumed to be 1-2 characters
  unitMeasure = unitMeasure.replace(/[^a-z]/g, '') // Only extract letters
  if (!['l','ml','kg','g'].includes(unitMeasure)) { return '' }
  return unitMeasure
}



export const shuffleArrayFisherYates = (array:any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = generateRandInt(0, i)
    const swapValue = array[i]
    array[i] = array[j]
    array[j] = swapValue
  }
  return array
}



export const generateUniqueArray = (array:any[]) => {
  const uniqueArray = [...new Set(array)]
  return uniqueArray
}