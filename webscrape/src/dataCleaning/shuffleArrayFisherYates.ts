import { generateRandInt } from "./generateRandInt"



export const shuffleArrayFisherYates = (array:any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = generateRandInt(0, i)
    const swapValue = array[i]
    array[i] = array[j]
    array[j] = swapValue
  }
  return array
}