export const transpose = (m: number[][]) => {
  if (!m[0]) return []
  return m[0].map((_x, i) => m.map((x) => x[i]))
}
