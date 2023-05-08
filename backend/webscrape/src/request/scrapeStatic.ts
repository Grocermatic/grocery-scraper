import axios from 'axios'



export const scrapeStatic = async(url:string):Promise<any> => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err:any) {
    return ''
  } 
}