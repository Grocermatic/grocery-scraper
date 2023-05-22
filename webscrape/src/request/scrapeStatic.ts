import axios from 'axios'

import { generateHttpHeaders, generatePublicIP } from './proxy'
import { wait } from '../util/wait'
import { generateRandInt } from '../util/dataCleaning'



export const scrapeStatic = async(url:string, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  await wait(generateRandInt(1000,2000))
  
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