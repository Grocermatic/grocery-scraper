/* istanbul ignore file */

import axios from 'axios'

import { generateHttpHeaders, generatePublicIP } from './proxy'



export const getRequestJson = async(url:string, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }

  const proxyClient = axios.create({
    baseURL: `https://${generatePublicIP()}`,
    timeout: 3000,
    headers: headers
  })

  try {
    const response = await proxyClient.get(url)
    return JSON.stringify(response.data)
  } catch {
    return ''
  } 
}



export const postRequestJson = async(url:string, postRequestPayload:any, cookie?:string):Promise<string> => {
  const headers = generateHttpHeaders()['headers']
  if (cookie != undefined) {
    headers.Cookie = cookie
  }
  
  const proxyClient = axios.create({
    baseURL: `https://${generatePublicIP()}`,
    timeout: 3000,
    headers: headers
  })

  try {
    const response = await proxyClient.post(url, postRequestPayload)
    return JSON.stringify(response.data)
  } catch {
    return ''
  }
}