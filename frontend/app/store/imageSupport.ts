import { createStoredStore } from './createStoredStore'

export const [imageSupport, setImageSupport] = createStoredStore(
  'Supported image',
  { type: 'jpg' },
)

async function supportsEncode() {
  if (!createImageBitmap) return 'jpg'
  try {
    const avifData =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABYAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgSAAAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB5tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA=='
    const avifBlob = await fetch(avifData).then((r) => r.blob())
    await createImageBitmap(avifBlob)
    return 'avif'
  } catch (e) {
    console.log('avif not supported:', e)
  }
  try {
    const webpData =
      'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA='
    const webpBlob = await fetch(webpData).then((r) => r.blob())
    await createImageBitmap(webpBlob)
    return 'webp'
  } catch (e) {
    console.log('webp not supported:', e)
  }
  return 'jpg'
}
;(async () => {
  setImageSupport({ type: await supportsEncode() })
})()
