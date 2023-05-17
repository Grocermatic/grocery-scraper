import axios from 'axios'
import { generateHttpHeaders, generatePublicIP } from './proxy'



export const scrapeStatic = async(url:string):Promise<any> => {
  try {
    const proxyClient = axios.create({
      baseURL: `https://${generatePublicIP()}`,
      timeout: 3000,
      headers: generateHttpHeaders()['headers']
    })
    const response = await proxyClient.get(url)
    return response.data
  } catch (err:any) {
    return ''
  } 
}