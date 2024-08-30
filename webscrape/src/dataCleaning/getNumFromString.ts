export const getNumFromString = (str: string): number[] => {
  if (!str) return []

  const matches = str.match(/\d+(\.\d+)?/g) // Match integers and decimals
  if (matches) {
    const numArray: number[] = []
    matches.map((num: string) => {
      numArray.push(Number.parseFloat(num))
    })
    return numArray
  }
  return []
}
