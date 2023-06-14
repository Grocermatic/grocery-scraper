import axios from 'axios'

import { generateHttpHeaders, generatePublicIP } from './proxy'



export const scrapeStatic = async(url:string, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  
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