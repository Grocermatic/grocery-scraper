import { scrapeWoolworths } from '../src/website/woolworths/scrapeWoolworths'
import { getCookie } from '../src/request/getCookie'
import { scrapeAldi } from '../src/website/aldi/scrapeAldi'
import { scrapeColes } from '../src/website/coles/scrapeColes'
import { saveJson } from '../src/dataCleaning/saveJson'
import { scrapeIga } from '../src/website/iga/scrapeIga'

const basePath = 'data/productInfo'

const aldiProductInfo = async () => {
  const report = await scrapeAldi()
  saveJson(`${basePath}/aldi.json`, report.get())
}

const colesProductInfo = async () => {
  let cookie = ''
  for (let i = 0; i < 3; i++) {
    try {
      cookie = await getCookie('https://www.coles.com.au')
      break
    } catch {}
  }
  const report = await scrapeColes(cookie)
  saveJson(`${basePath}/coles.json`, report.get())
}

const igaProductInfo = async () => {
  const report = await scrapeIga()
  saveJson(`${basePath}/iga.json`, report.get())
}

const woolworthsProductInfo = async () => {
  let cookie = ''
  for (let i = 0; i < 3; i++) {
    try {
      cookie = await getCookie('https://www.woolworths.com.au')
      break
    } catch {}
  }
  const report = await scrapeWoolworths(cookie)
  saveJson(`${basePath}/woolworths.json`, report.get())
}

Promise.all([aldiProductInfo(), woolworthsProductInfo(), colesProductInfo(), igaProductInfo()])
