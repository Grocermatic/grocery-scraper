import axios from 'axios'
import { generateHttpHeaders, generatePublicIP, generateRandInt } from './proxy'
import { wait } from '../util/wait'



export const scrapeStatic = async(url:string):Promise<any> => {
  await wait(generateRandInt(1000,3000))
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