import puppeteer from 'puppeteer'



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

  await page.goto(url, {waitUntil: 'domcontentloaded'})
  const html:string = await page.content()
  
  // Close browser to save memory
  await browser.close()
  return html
}