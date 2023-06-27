import { generateUniqueArray, getNumFromString, getUnitFromString, limitArrayLengths, shuffleArrayFisherYates } from "../dataCleaning"



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



describe("unique array maker", () => {
  it("should produce array containing only unique elements", () => {
    const originalArray = [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5]
    const expectedArray = [1,2,3,4,5]
    const uniqueArray = generateUniqueArray(originalArray)
    expect(uniqueArray).toEqual(expectedArray)
  })
})



describe("limit array length", () => {
  it("should regroup arrays into smaller chunks", () => {
    const originalArray = [
      [1,2,3,4,5,6,7,8,9,10,11,12],
      [1,2,3,4,5,6,7,8],
      [1],
      [1,2,3,4,5]
    ]
    const expectedArray = [
      [[1,2,3],[1,2,3],[1],[1,2,3]],
      [[4,5,6],[4,5,6],[4,5]],
      [[7,8,9],[7,8]],
      [[10,11,12]]
    ]
    const uniqueArray = limitArrayLengths(originalArray, 3)
    expect(uniqueArray).toEqual(expectedArray)
  })
})