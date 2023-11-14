import axios from 'axios'
import sharp from 'sharp'
import { uploadToR2 } from './uploadToR2'
import { config } from '../../global'
import { generateUniqueArray } from '../src/dataCleaning/generateUniqueArray'
import { readFileSync } from 'fs'
import { safeSha256 } from '../../common/safeSha256'

const uploadImageToR2 = (sharpImage: sharp.Sharp, objectName: string, imageType: string) => {
  sharpImage.toBuffer().then((imageBuffer) => {
    uploadToR2(
      imageBuffer,
      'grocermatic-product',
      `image/${objectName}.${imageType}`,
      `image/${imageType}`,
    )
  })
}

const transformProductImage = async (url: string) => {
  const objectName = safeSha256(url.replaceAll('/medium/', '/large/'))
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const resizedImage = sharp(response.data).resize({
      height: 1200,
      width: 1200,
      fit: 'inside',
    })
    const webp = resizedImage.webp({
      quality: 15,
      effort: 6,
    })
    uploadImageToR2(webp, objectName, 'webp')
    const avif = resizedImage.avif({
      quality: 12,
      effort: 3,
    })
    uploadImageToR2(avif, objectName, 'avif')
    return url
  } catch {
    return null
  }
}

const getProductsFromUrl = async () => {
  let products: any[] = []
  const urls = Array.from(
    { length: config.numChunks },
    (_, i) => `${config.productBaseUrl}/product${i}.json`,
  )
  for (const url of urls) {
    const res = await fetch(url)
    if (!res) return products
    const json = await res.json()
    products = [...products, ...json]
  }
  return products
}

const getProductsFromFile = () => {
  let products: any[] = []
  const filePath = 'data/cleanProductInfo.json'
  const res = readFileSync(filePath).toString()
  if (!res) return products
  return JSON.parse(res)
}

;(async () => {
  const res = await fetch(`${config.productBaseUrl}/image.json`)
  const uploadedImages = generateUniqueArray(await res.json())
  const uploadedImagesLen = uploadedImages.length

  const products = getProductsFromFile()
  const productImages = products.map((product: any) => product.img)

  const unsavedImages = generateUniqueArray(
    productImages.filter((x: string) => !uploadedImages.includes(x)),
  )
  const failedImages = []
  console.log(`Transforming ${unsavedImages.length} unsaved images...\n\n\n\n\n\n\n\n`)
  const saveUploadProgress = (uploadedImages: string[]) => {
    try {
      const uploadedImagesBuffer = Buffer.from(JSON.stringify(uploadedImages, null, 2), 'utf-8')
      uploadToR2(uploadedImagesBuffer, 'grocermatic-product', `image.json`, `application/json`)
      process.stdout.moveCursor(0, -8)
      process.stdout.clearLine(1)
      console.table({
        'Current images': uploadedImages.length,
        'New images': uploadedImages.length - uploadedImagesLen,
        'Failed uploads': failedImages.length,
        'Not uploaded': unsavedImages.length - (uploadedImages.length - uploadedImagesLen),
      })
    } catch {}
  }

  let i = 0
  for (const unsavedImageUrl of unsavedImages) {
    const url = await transformProductImage(unsavedImageUrl)
    if (url != null) uploadedImages.push(url)
    else failedImages.push(unsavedImageUrl)
    console.log(i)
    if (++i % 10 == 0) saveUploadProgress(uploadedImages)
  }

  saveUploadProgress(uploadedImages)
  console.info('Failed images:')
  console.info(failedImages)
  getProductsFromUrl()
})()
