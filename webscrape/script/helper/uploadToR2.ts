import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios from 'axios'
require('dotenv').config()

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  },
})

export const uploadToR2 = async (
  data: Buffer,
  bucketName: string,
  objectName: string,
  contentType: string,
) => {
  const url = await getSignedUrl(
    r2 as any,
    new PutObjectCommand({ Bucket: bucketName, Key: objectName }) as any,
    { expiresIn: 300 } as any,
  )
  await axios({
    method: 'put',
    url,
    data: data,
    headers: {
      'Content-Type': contentType,
    },
  })
}
