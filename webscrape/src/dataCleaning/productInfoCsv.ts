export const objectToCsvLine = (object:Object):string => {
  let csvLine = ''
  Object.entries(object).forEach(entry => {
    csvLine += ','
    if (typeof entry[1] === 'object' && entry[1] != null) {
      csvLine += objectToCsvLine(entry[1])
    } else if (entry[1] != null) {
      csvLine += entry[1]
    }
  })
  return csvLine.slice(1)
}



export const productInfoCsv = (productInfos:Object[]):string => {
  let csv = ''
  productInfos.forEach((object:Object) => {
    csv += objectToCsvLine(object)
    if (!object.hasOwnProperty("nutrition")) {
      csv += ',,,,,,,,'
    }
    csv += '\n'
  })
  return csv
}
