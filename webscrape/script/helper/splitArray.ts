export const splitArray = <T>(_array: T[], lengths: number[]) => {
  let array = _array
  const newArrays: T[][] = []
  for (const length of lengths) {
    const newArray = array.slice(0, length)
    if (newArray.length === 0) break
    newArrays.push(newArray)
    array = array.slice(length)
  }
  if (array.length !== 0) newArrays.push(array)
  return newArrays
}
