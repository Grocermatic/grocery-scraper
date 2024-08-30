type VoidFunction = () => void

export const webWorkerFactory = (func: VoidFunction) => {
  const functionString = func.toString().match(/{(.|\n)*}/)
  if (functionString === null) throw Error('Invalid function')
  const webWorkerBlob = new Blob([functionString[0]], {
    type: 'text/javascript',
  })
  const webWorkerUrl = URL.createObjectURL(webWorkerBlob)
  return new Worker(webWorkerUrl)
}
