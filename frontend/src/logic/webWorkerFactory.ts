type VoidFunction = () => void

export const webWorkerFactory = (func: VoidFunction) => {
  const functionString = func.toString().match(/{(.|\n)*}/)![0]
  const webWorkerBlob = new Blob([functionString], { type: 'text/javascript' })
  const webWorkerUrl = URL.createObjectURL(webWorkerBlob)
  return new Worker(webWorkerUrl)
}
