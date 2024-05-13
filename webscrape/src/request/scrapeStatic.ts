import axios from 'axios'
import https from 'https'
import { randHttpHeader } from '../proxy/randHttpHeader'

export const scrapeStatic = async (url: string, cookie?: string): Promise<string> => {
  const headers: any = randHttpHeader()
  if (cookie != undefined) headers.Cookie = cookie
  try {
    const proxyClient = axios.create({
      headers: headers,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    })
    const response = await proxyClient.get(url)
    return response.data
  } catch (err: any) {
    return ''
  }
}
