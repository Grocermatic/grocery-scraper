export const roundDecimal = (decimal: number, places: number): number => {
  return Math.round(decimal * 10 ** places) / 10 ** places
}
