/* istanbul ignore file */

import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer'
const chromium = require("@sparticuz/chromium");
try { require('dotenv').config() } catch {}


import { generateHttpHeaders } from './proxy'



export const getCookie = async(url:string):Promise<string> => {  
  const launchOption:PuppeteerLaunchOptions = {
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    args: [...chromium.args]
  }
  try {
    launchOption.executablePath = await chromium.executablePath("/opt/bin")
  } catch {}
  const browser = await puppeteer.launch(launchOption)
  
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0);
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

  let cookies = ''
  try {
    await page.goto(url, {waitUntil: 'load'})
    const cookiesArray = await page.cookies(url)
    for (const cookieObject of cookiesArray) {
      cookies += `${cookieObject.name}=${cookieObject.value};`
    }
  } finally {
    browser.close()
  }
  return cookies
}