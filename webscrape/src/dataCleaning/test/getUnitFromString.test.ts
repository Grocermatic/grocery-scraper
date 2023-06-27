import { getUnitFromString } from "../getUnitFromString"



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