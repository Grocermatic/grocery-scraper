import { getNumFromString } from '../getNumFromString'

describe('number extractor from string', () => {
  it('should extract numbers including decimals', async () => {
    const numArray = getNumFromString('abc12def3.4 5.6 7.89')
    expect(numArray).toEqual([12, 3.4, 5.6, 7.89])
  })

  it('should handle no numbers', async () => {
    const numArray = getNumFromString('abcdef')
    expect(numArray).toEqual([])
  })

  it('should handle empty string', async () => {
    const numArray = getNumFromString('')
    expect(numArray).toEqual([])
  })
})
