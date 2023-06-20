import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer'
const chromium = require("@sparticuz/chromium");
require('dotenv').config();


import { generateHttpHeaders } from './proxy'



export const scrapeDynamic = async(url:string):Promise<string> => {  
  const launchOption:PuppeteerLaunchOptions = {
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    args: [...chromium.args]
  }
  if (process.env.LOCAL != "true") {
    launchOption.executablePath = await chromium.executablePath("/opt/bin")
  }
  const browser = await puppeteer.launch(launchOption)

  const page = await browser.newPage()
  await page.setRequestInterception(true)
  await page.setExtraHTTPHeaders(generateHttpHeaders()['headers'])

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
    await page.goto(url, {waitUntil: 'networkidle0'})
    try {
      const html:string = await page.evaluate(() =>  document.documentElement.outerHTML)
      await browser.close()
      return html
    } catch (err:any) {
      const html:string = await page.content()
      await browser.close()
      return html
    }
  } catch (err:any) {
    await browser.close()
    return ''
  }
}