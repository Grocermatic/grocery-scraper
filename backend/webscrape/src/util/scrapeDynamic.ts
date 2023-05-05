import puppeteer from 'puppeteer'
import {URL} from 'url'



export const scrapeDynamic = async(url:string):Promise<any> => {  
  // Disable sandbox to decrease scrape time
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setRequestInterception(true);

  // Block extaneous information to decrease scrape time
  const excludeContentType = ['image', 'media', 'stylesheet']
  page.on('request', (req:any) => {
    if(excludeContentType.includes(req.resourceType())){
        req.abort();
    }
    else {
        req.continue();
    }
  })

  try {
    await page.goto(url, {waitUntil: 'domcontentloaded'})
    const html:string = await page.content()
    await browser.close()
    return html
  } catch (err:any) {
    await browser.close()
    return ''
  }
}