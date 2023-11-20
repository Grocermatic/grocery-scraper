import { hashToArray } from "../hashToArray"

describe('Function hashToArray', () => {
  it('should transform hash values to array', () => {
    const expectedArray = [5, 4, 3, 2, 1]
    const array = hashToArray({
      name: 5,
      url: 4,
      img: 3,
      price: 2,
      quantity: 1,
    })
    expect(array).toEqual(expectedArray)
  })
})
