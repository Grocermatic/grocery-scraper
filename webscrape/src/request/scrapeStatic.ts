import axios from 'axios'
import { randHttpHeader } from '../proxy/randHttpHeader'

export const scrapeStatic = async (url: string, cookie?: string): Promise<string> => {
  const headers: any = randHttpHeader()
  if (cookie != undefined) headers.Cookie = cookie
  try {
    const proxyClient = axios.create({
      headers: headers,
    })
    const response = await proxyClient.get(url)
    return response.data
  } catch (err: any) {
    return ''
  }
}
