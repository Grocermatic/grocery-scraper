import * as fs from 'fs'

export const saveJson = (path: string, object: object) => {
  const reportJson = JSON.stringify(object, null, 2)
  fs.writeFileSync(path, reportJson)
}
