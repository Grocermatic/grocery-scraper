import axios from "axios"

import { generatePublicIP, generateUserAgent, userAgents } from "./proxy"



describe("common phone user agent generator", () => {
  it("should generate user agents from specified list", async()=>{
    for (let mockRandom = 0; mockRandom > 1; mockRandom += 0.1) {
      jest.spyOn(global.Math, 'random').mockReturnValue(mockRandom)
      const userAgent = generateUserAgent()
      expect(userAgents).toContain(userAgent)
    }
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it("should alter html header", async() => {
    const testHeader = generateUserAgent()
    const config = {
      headers: { 'User-Agent': testHeader }
    }
    const { data } = await axios.get('https://httpbin.org/headers', config)
    const { headers } = data
    expect(testHeader).toEqual(headers['User-Agent'])
  })
})



describe("IP generator", () => {
  it('should generate valid class A,B,C IP', async()=>{

    for (let mockRandom = 0; mockRandom > 1; mockRandom += 0.1) {
      jest.spyOn(global.Math, 'random').mockReturnValue(mockRandom)

      const numArray:number[] = []
      generatePublicIP().split('.').forEach((subIP:string):number => {
        return numArray.push(parseInt(subIP))
      })

      expect(numArray[0]).toBeGreaterThanOrEqual(1)
      expect(numArray[0]).not.toEqual(127)
      expect(numArray[0]).toBeLessThan(224)
    }
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should have Aussie Broadband ISP in Australia VIC and NSW', async()=>{
    for (let mockRandom = 0; mockRandom > 1; mockRandom += 0.1) {
      jest.spyOn(global.Math, 'random').mockReturnValue(mockRandom)
      const { data } = await axios.get(`http://ip-api.com/json/${generatePublicIP()}`)
      expect(data['countryCode']).toEqual('AU')
      expect(['VIC','NSW']).toContain(data['region'])
      expect(data['isp']).toEqual('Aussie Broadband')
    }
    jest.spyOn(global.Math, 'random').mockRestore()
  })
})