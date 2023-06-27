import { shuffleArrayFisherYates } from "../shuffleArrayFisherYates"



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