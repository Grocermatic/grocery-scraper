import { limitArrayLengths } from "../limitArrayLengths"



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