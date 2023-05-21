/* istanbul ignore file */

import puppeteer from 'puppeteer'
import { generateHttpHeaders } from './proxy'



export const getCookie = async(url:string):Promise<string> => {  
  // Disable sandbox to decrease scrape time
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
    ]
  })

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


  let cookies = ''
  try {
    await page.goto(url, {waitUntil: 'load'})
    const cookiesArray = await page.cookies(url)
    for (const cookieObject of cookiesArray) {
      cookies += `${cookieObject.name}=${cookieObject.value};`
    }
  } finally {
    await browser.close()
  }
  return cookies
}