import puppeteer, { type PuppeteerLaunchOptions } from 'puppeteer'

const launchOption: PuppeteerLaunchOptions = {
  headless: true,
}

const excludeContentType = [
  'EventSource',
  'Fetch',
  'Font',
  'Image',
  'Manifest',
  'Media',
  'Script',
  'Stylesheet',
  'TextTrack',
  'WebSocket',
  'XHR',
]

export const getCookie = async (url: string): Promise<string> => {
  let cookies = ''

  const browser = await puppeteer.launch(launchOption)
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  // Block extaneous information to decrease scrape time
  page.on('request', (req: any) => {
    if (excludeContentType.includes(req.resourceType())) {
      req.abort()
    } else {
      req.continue()
    }
  })

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    const cookiesArray = await page.cookies(url)
    for (const cookieObject of cookiesArray) {
      cookies += `${cookieObject.name}=${cookieObject.value};`
    }
    console.debug(`Cookie for ${url}`)
    console.debug(cookies)
  } finally {
    browser.close()
  }
  return cookies
}
