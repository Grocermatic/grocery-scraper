export const cloneJson = <T>(object: T) =>
  JSON.parse(JSON.stringify(object)) as T
