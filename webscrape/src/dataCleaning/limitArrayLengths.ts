export const limitArrayLengths = (oldArrays:any[][], desiredArrayLength:number):any[][][] => {
  const newArrays:any[] = []

  const lengthOfEachArray = oldArrays.map((val)=>{return val.length})
  const maxArrayLength = Math.max(...lengthOfEachArray)

  for (let arrayLengthCounter = 0; arrayLengthCounter < maxArrayLength; arrayLengthCounter += desiredArrayLength) {
    const subsetArrays = []
    for (let arrayID = 0; arrayID < oldArrays.length; arrayID++) {
      const arraySample = oldArrays[arrayID].slice(0,desiredArrayLength)
      if (arraySample.length > 0) {
        subsetArrays.push(arraySample)
      }
      oldArrays[arrayID] = oldArrays[arrayID].slice(desiredArrayLength)
    }
    if (subsetArrays.length > 0) {
      newArrays.push(subsetArrays)
    }
  }
  return newArrays
}