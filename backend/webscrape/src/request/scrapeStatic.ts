import axios from 'axios'
import { generateHtmlHeader, generatePublicIP } from './proxy'



export const scrapeStatic = async(url:string):Promise<any> => {
  try {
    const proxyClient = axios.create({
      baseURL: `https://${generatePublicIP()}`,
      timeout: 10000,
      headers: generateHtmlHeader()['headers']
    })
    const response = await proxyClient.get(url, generateHtmlHeader())
    return response.data
  } catch (err:any) {
    return ''
  } 
}