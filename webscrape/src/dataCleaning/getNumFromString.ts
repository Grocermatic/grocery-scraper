export const getNumFromString = (str: string): number[] => {
  if (!str) return []

  const matches = str.match(/\d+(\.\d+)?/g) // Match integers and decimals
  if (matches) {
    let numArray: number[] = []
    matches.forEach((num: string) => {
      numArray.push(parseFloat(num))
    })
    return numArray
  }
  return []
}
