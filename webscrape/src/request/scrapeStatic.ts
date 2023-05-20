import axios from 'axios'
import { generateHttpHeaders, generatePublicIP, generateRandInt } from './proxy'
import { wait } from '../util/wait'



export const scrapeStatic = async(url:string, cookie?:string):Promise<any> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  await wait(generateRandInt(1000,3000))
  
  try {
    const proxyClient = axios.create({
      baseURL: `https://${generatePublicIP()}`,
      timeout: 3000,
      headers: headers
    })
    const response = await proxyClient.get(url)
    return response.data
  } catch (err:any) {
    return ''
  } 
}