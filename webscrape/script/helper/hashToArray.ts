export const hashToArray = (hash: { [key: string]: any }) => {
  return Object.keys(hash).map((key) => hash[key])
}
