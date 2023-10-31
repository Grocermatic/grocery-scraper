import * as fs from 'fs'
import axios from 'axios'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
require('dotenv').config()

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  },
})

export const uploadToR2 = async (filePath: string, bucketName: string, objectName: string) => {
  const url = await getSignedUrl(
    r2,
    new PutObjectCommand({ Bucket: bucketName, Key: objectName }),
    { expiresIn: 5 },
  )
  await axios({
    method: 'put',
    url,
    data: fs.readFileSync(filePath),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const productionPath = `data/production`
const files = fs.readdirSync(productionPath)
files.map(async (fileName) => {
  const filePath = `${productionPath}/${fileName}`
  await uploadToR2(filePath, 'grocermatic-product', fileName)
})
