import {scrapeStatic} from './scrapeStatic'
import * as fs from 'fs'
import * as http from 'http'




describe("static html scraper", () => {
  it("should render javascript html", async()=>{    
    const testUrl = 'https://www.saucedemo.com/'
    let html = await scrapeStatic(testUrl)
    console.log(html)
    expect(html).not.toEqual("")
  })

  it("should handle unreachable urls", async()=>{
    const testUrl = "unreachableLink"
    let html:string = await scrapeStatic(testUrl)
    expect(html).toEqual("")
  })
})