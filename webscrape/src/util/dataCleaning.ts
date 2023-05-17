export const getNumFromString = (str:string):number[] => {
  const regex = /\d+(\.\d+)?/g;
  const matches = str.match(regex);
  if (matches) {
    let numArray:number[] = []
    matches.forEach((num:string) => {
      numArray.push(parseFloat(num))
    })
    return numArray
  }
  return [];
}

export const roundDecimal = (decimal:number, places:number):number => {
  return Math.round(decimal * 10**places) / 10**places
}