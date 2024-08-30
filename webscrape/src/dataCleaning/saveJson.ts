import * as fs from 'node:fs'

export const saveJson = (path: string, object: object) => {
  const reportJson = `${JSON.stringify(object, null, 2)}\n`
  fs.writeFileSync(path, reportJson)
}
