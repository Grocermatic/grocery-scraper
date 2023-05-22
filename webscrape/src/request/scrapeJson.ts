/* istanbul ignore file */

import axios from 'axios'

import { generateHttpHeaders, generatePublicIP } from './proxy'
import { wait } from '../util/wait'
import { generateRandInt } from '../util/dataCleaning'



export const getRequestJson = async(url:string, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  await wait(generateRandInt(1000,2000))
  
  const proxyClient = axios.create({
    baseURL: `https://${generatePublicIP()}`,
    timeout: 3000,
    headers: headers
  })

  try {
    const response = await proxyClient.get(url)
    return JSON.stringify(response.data)
  } catch(err) {
    return ''
  } 
}



export const postRequestJson = async(url:string, postRequestPayload:any, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  await wait(generateRandInt(1000,2000))
  
  const proxyClient = axios.create({
    baseURL: `https://${generatePublicIP()}`,
    timeout: 3000,
    headers: headers
  })

  try {
    const response = await proxyClient.post(url, postRequestPayload)
    return JSON.stringify(response.data)
  } catch(err) {
    return ''
  } 
}