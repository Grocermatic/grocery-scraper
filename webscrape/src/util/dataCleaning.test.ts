import { getNumFromString, getUnitFromString, roundDecimal, shuffleArrayFisherYates } from "./dataCleaning"



describe("number extractor from string", () => {
  it("should extract numbers including decimals", async()=>{
    const numArray = getNumFromString("abc12def3.4 5.6 7.89")
    expect(numArray).toEqual([12, 3.4, 5.6, 7.89])
  })

  it("should handle no numbers", async()=>{
    const numArray = getNumFromString("abcdef")
    expect(numArray).toEqual([])
  })

  it("should handle empty string", async()=>{
    const numArray = getNumFromString("")
    expect(numArray).toEqual([])
  })
})



describe("number extractor from string", () => {
  it("should extract numbers including decimals", async()=>{
    const num = 0.12
    expect(roundDecimal(num, 0)).toEqual(0)
    expect(roundDecimal(num, 1)).toEqual(0.1)
    expect(roundDecimal(num, 2)).toEqual(0.12)
    expect(roundDecimal(num, 3)).toEqual(0.12)
  })
})



describe("unit measure extractor for food", () => {
  it("should extract 'kg', 'g', 'l' and 'ml' from end of text", async()=>{
    expect(getUnitFromString('1.0 ml')).toEqual('ml')
    expect(getUnitFromString('1.0 l')).toEqual('l')
    expect(getUnitFromString('1.0ml')).toEqual('ml')
    expect(getUnitFromString('1.0l')).toEqual('l')
    expect(getUnitFromString('1.0 kg')).toEqual('kg')
    expect(getUnitFromString('1.0 g')).toEqual('g')
    expect(getUnitFromString('1.0 km')).toEqual('')
    expect(getUnitFromString('')).toEqual('')
  })
})



describe("Fisher-Yates array shuffling", () => {
  it("should rearrange elements in an array", () => {
    const originalArray = [1,2,3,4,5,6,7,8,9]
    const shuffledArray = shuffleArrayFisherYates(originalArray)    
    shuffledArray.map(shuffledArrayElement => expect(originalArray).toContain(shuffledArrayElement))
  })

  it("should produce an array with same original elements", () => {
    const originalArray = [1,2,3,4,5,6,7,8,9]
    const shuffledArray = shuffleArrayFisherYates(originalArray)
    expect(shuffledArray.sort()).toEqual(originalArray)
  })
})