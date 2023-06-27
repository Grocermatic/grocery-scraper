import { roundDecimal } from "../roundDecimal"



describe("number extractor from string", () => {
  it("should extract numbers including decimals", async()=>{
    const num = 0.12
    expect(roundDecimal(num, 0)).toEqual(0)
    expect(roundDecimal(num, 1)).toEqual(0.1)
    expect(roundDecimal(num, 2)).toEqual(0.12)
    expect(roundDecimal(num, 3)).toEqual(0.12)
  })
})