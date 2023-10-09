import axios from 'axios'



export const scrapeStatic = async(url:string, cookie?:string):Promise<string> => {
  const headers:any = {}
  if (cookie != undefined) headers["Cookie"] = cookie
  try {
    const proxyClient = axios.create({headers: headers})
    const response = await proxyClient.get(url)
    return response.data
  } catch (err:any) {
    return ''
  } 
}