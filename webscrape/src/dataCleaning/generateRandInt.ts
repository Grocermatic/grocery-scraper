/* istanbul ignore file */

export const generateRandInt = (min:number, max:number):number => {
  const randomInteger = min + Math.floor((max - min + 1) * Math.random())
  return randomInteger <= max ? randomInteger : randomInteger - 1
}