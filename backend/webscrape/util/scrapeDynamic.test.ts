const fs = require('fs');
const scrapeDynamic = require('./scrapeDynamic')




describe("Scrape HTML from dynamic site", () => {
  it("Should contain additional paragraph text", ()=>{
    const testFile = `file://${__dirname}/test.html`
    exports.scrapeDynamic(testFile)
    .then((html)=>{
      html = html.replaceAll('\n','')
      fs.readFile('./util/test.html', (e,data)=>{
        const expectedHTML = data.toString().replaceAll('</p>', 'Paragraph</p>')

        console.log(html)
        console.log(expectedHTML)
        expect(html).toEqual(expectedHTML)
      })
    })
  })
})