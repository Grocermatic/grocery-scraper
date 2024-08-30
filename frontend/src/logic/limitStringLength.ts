export const limitStringLength = (
  originalString: string,
  maxLength: number,
) => {
  if (originalString.length <= maxLength) return originalString
  return `${originalString.slice(0, maxLength)}...`
}
