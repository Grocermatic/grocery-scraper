import * as fs from 'fs'
import { expect, test } from 'vitest'
import { getProductInfoPage } from '../getProductInfoPage'

test('Coles page scraper - should parse product data', async () => {
  const testJson = fs.readFileSync(`${__dirname}/page.test.json`).toString()
  const expectedJson = fs
    .readFileSync(`${__dirname}/expected.test.json`)
    .toString()
  const expectedReport = JSON.parse(expectedJson)

  const report = getProductInfoPage(testJson)
  expect(report.get()).toEqual(expectedReport)
})
