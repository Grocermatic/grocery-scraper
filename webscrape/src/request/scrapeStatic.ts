import https from 'https'
import axios from 'axios'
import { randHttpHeader } from '../proxy/randHttpHeader'

export const scrapeStatic = async (
  url: string,
  cookie?: string,
): Promise<string> => {
  const headers = randHttpHeader()
  try {
    const proxyClient = axios.create({
      headers: {
        ...headers,
        Cookie: cookie !== undefined ? cookie : '',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    })
    const response = await proxyClient.get(url)
    return response.data
  } catch (err) {
    console.error(err)
    return ''
  }
}
