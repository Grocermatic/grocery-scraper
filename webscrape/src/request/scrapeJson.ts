/* istanbul ignore file */

import axios from 'axios'



export const getRequestJson = async(url:string, cookie?:string):Promise<string> => {
  const headers:any = {}
  if (cookie != undefined) headers["Cookie"] = cookie
  try {
    const proxyClient = axios.create({headers: headers})
    const response = await proxyClient.get(url)
    return JSON.stringify(response.data)
  } catch {
    return ''
  } 
}



export const postRequestJson = async(url:string, postRequestPayload:any, cookie?:string):Promise<string> => {
  const headers:any = {}
  if (cookie != undefined) headers["Cookie"] = cookie
  try {
    const proxyClient = axios.create({headers: headers})
    const response = await proxyClient.post(url, postRequestPayload)
    return JSON.stringify(response.data)
  } catch {
    return ''
  }
}