export const generateUniqueArray = (array:any[]) => {
  const uniqueArray = [...new Set(array)]
  return uniqueArray
}