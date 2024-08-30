import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { getProductInfoPage } from '../getProductInfoPage'

test('Woolworths page scraper - should parse product data', async () => {
  const testJson = readFileSync(`${__dirname}/page.test.json`).toString()
  const expectedJson = readFileSync(
    `${__dirname}/expected.test.json`,
  ).toString()
  const expectedReport = JSON.parse(expectedJson)

  const report = getProductInfoPage(testJson)
  expect(report.get()).toEqual(expectedReport)
})
