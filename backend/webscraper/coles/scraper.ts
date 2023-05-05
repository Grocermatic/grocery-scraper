const puppeteer = require("../node_modules/puppeteer")

const url = 'https://coles.com.au'

async function webScrape(url:string):Promise<any> {
  performance.mark(`browser-open-${url}`)
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-sync',
      '--ignore-certificate-errors'
  ],
  })
  const browserPage = await browser.newPage()

  performance.mark(`scraping-start-${url}`)
  await browserPage.goto(url, {
    waitUntil: 'domcontentloaded',
  })
  performance.mark(`scraping-end-${url}`)

  await browserPage.close()
  await browser.close()
  performance.mark(`browser-close-${url}`)

  console.log(performance.measure(`browser-open-close-${url}`, `browser-open-${url}`, `browser-close-${url}`))
  console.log(performance.measure(`scraping-start-end-${url}`, `scraping-start-${url}`, `scraping-end-${url}`))
}

exports.webScrape = webScrape

webScrape(url).then()