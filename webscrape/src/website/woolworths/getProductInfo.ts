import { ProductInfo, ProductNutrition, GetProductInfo, GetBatchProductInfo } from "../interface"
import { getMetricQuantity, getNumFromString, roundDecimal } from "../../util/dataCleaning";
import { scrapeJson } from '../../request/scrapeJson';



export const getWoolworthsProductInfo:GetProductInfo = (productJsonString) => {
  const productJson = JSON.parse(productJsonString)
  const productInfoJson = productJson['Product']

  const unitPriceImplicitString = productInfoJson['CupString']
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  const unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  const unitPrice = unitPriceImplicit / unitQuantityImplicit

  const quantity = getMetricQuantity(productInfoJson['PackageSize'])

  // Prefill mandatory values
  const productInfo:ProductInfo = {
    name: productInfoJson['Name'],
    url: `https://www.woolworths.com.au/shop/productdetails/${productInfoJson['Stockcode']}`,
    img: productInfoJson['LargeImageFile'],
    price: productInfoJson['Price'],
    quantity: roundDecimal(quantity, 3),
    unitPrice: roundDecimal(unitPrice, 2)
  }

  // Add nutritional information if possible
  const servingsPerPack = productInfoJson['AdditionalAttributes']['servingsperpack-total-nip']
  let servingSize:number | null = getMetricQuantity(productInfoJson['AdditionalAttributes']['servingsize-total-nip'])
  if (!servingSize && servingsPerPack) {
    servingSize = roundDecimal(quantity / servingsPerPack, 3)
  } else if (!servingSize) {
    servingSize = null
  }

    
  const nutrition:ProductNutrition = {
    servingSize: servingSize,
    kilojoules: null,
    protein: null,
    fat: null,
    fatSaturated: null,
    carb: null,
    sugar: null,
    sodium: null
  }
    
  // Extract 7 mandatory labeled nutirents
  productJson['NutritionalInformation'].forEach((singleNutrientInfo:any) => {
    const nutrientValueJson = singleNutrientInfo['Values']
    let nutrientQuantity:number|null = getNumFromString(nutrientValueJson['Quantity Per 100g / 100mL'])[0]
    
    // Extrapolate quantity from serving if possible
    if (!nutrientQuantity && servingSize) {
      const servingNutrientQuantity = getNumFromString(nutrientValueJson['Quantity Per Serving'])[0]
      nutrientQuantity = servingNutrientQuantity * servingSize / 0.1
    } else if (!nutrientQuantity) {
      nutrientQuantity = null
    }

    switch (singleNutrientInfo['Name']) {
      case 'Energy':
        nutrition.kilojoules = nutrientQuantity
        break
      case 'Protein':
        nutrition.protein = nutrientQuantity
        break
      case 'Fat, Total':
        nutrition.fat = nutrientQuantity
        break
      case '– Saturated':
        nutrition.fatSaturated = nutrientQuantity
        break
      case 'Carbohydrate':
        nutrition.carb = nutrientQuantity
        break
      case '– Sugars':
        nutrition.sugar = nutrientQuantity
        break
      case 'Sodium':
        nutrition.sodium = nutrientQuantity
        break
      default:
    }
  })

  productInfo.nutrition = nutrition
  return productInfo
}



const woolworthsCookie = "bm_sz=8AD67C4F57EDFD0F87BB0FF819E8FFA1~YAAQRsfOF+TdNgSIAQAAjsrzNxOrXBbyLy2vIYnoO7yClVXtKsEjc/StC/EjKBUW70TSkPqQzv4dP8yxIxU/knLjT44RhRYWk5xAB5tviZKc653+aUnwQuS7k4kkvAaFHMefNZT0ll/ykuXEFU+5kLqMZox3ChgjUq23aOTkiwbAGjZf1qC+2Fu3OoeAm81RGvSN4OXLLXGM+X8FnSor5Uwti9vZOppLILzgMlRJXBaGRkmgnQdDoW0LUqvLngPzlJ2fITTv9tbKuFAIsXTmcA7e9CX97OZqwdcQpWcvFkeElx+CTvUKIFkV~3487288~3223604; dtSa=-; bff_region=syd2; rxVisitor=1684318349338CUTLA1G2EFS5DQG4U24J7GCA9296BLTD; dtLatC=3; at_check=true; AMCVS_4353388057AC8D357F000101%40AdobeOrg=1; INGRESSCOOKIE=1684565912.431.71.360382|37206e05370eb151ee9f1b6a1c80a538; akaalb_woolworths.com.au=~op=www_woolworths_com_au_ZoneA:PROD-ZoneA|www_woolworths_com_au_BFF_SYD2:WOW-BFF-SYD2|www_woolworths_com_au_BFF_SYD_Launch:WOW-BFF-SYD2|www_woolworths_com_au_ZoneAandC:PROD-ZoneC|~rv=12~m=PROD-ZoneA:0|WOW-BFF-SYD2:0|PROD-ZoneC:0|~os=43eb3391333cc20efbd7f812851447e6~id=e0f1663a1b41ee7a95597f65a1db1f0a; ai_user=/On/OrhZBPcEqz9xEAAR0x|2023-05-20T06:58:32.529Z; fullstoryEnabled=false; utag_main=v_id:018837f40705001ac9ca6ee417a804065005c05d0078d$_sn:1$_se:7$_ss:0$_st:1684567720699$ses_id:1684565919495%3Bexp-session$_pn:1%3Bexp-session$vapi_domain:woolworths.com.au$dc_visit:1$dc_event:1%3Bexp-session; s_cc=true; AMCV_4353388057AC8D357F000101%40AdobeOrg=179643557%7CMCIDTS%7C19498%7CMCMID%7C20311929928764655151740983520350715488%7CMCOPTOUT-1684573120s%7CNONE%7CvVersion%7C5.5.0; mbox=session#fd33c5395ca743e08b1c5520f69b4c1c#1684567782|PC#fd33c5395ca743e08b1c5520f69b4c1c.36_0#1747810722; _abck=4BD341FFE855D862DFDE04BA71D50BA1~-1~YAAQNMfOF55FnTeIAQAAKntNOAnRv4UFEmXFgQSYJw5jKde3E9NDyKqbxsxHTK0yVeY1oVokOGH8BSpjWKBiM1PwFrY6wf56FdFyDq2J3y8c4+v3hEuxfM9o8heScMrkkD7ktvOxgA/wBuyo7F8tPIcpv86qbhPlfbXoL3fvUG0swDUhaBmBCQRquBs5sCK6A357/XV6HUuBV7drkSQGWz6ndpYCaYcJPKiGFwlpSc4M0rO34PlZcRhGTf8ezn8zQOon8JAM+C7S2Iiz87r4k8jk39stoAtUMWgTtpf8DZrBEqCdlwC4tdGMjwTA7e54j+qWjtGfnc5qNQLalk6wubHVCgtmJ84KiCfMctqyFILGxFklDbmWNX3pEflDrCDjUdih4+P2gW82WuLX95Lmhw==~-1~-1~-1; dtCookie=v_4_srv_2_sn_3RD31OFTG2QN3E60VAUALH6H7TAU72NO_perc_100000_ol_0_mul_1_app-3Af908d76079915f06_1_rcs-3Acss_0; dtPC=2$365911101_886h-vDWGREFCFFRHIRVLPGHHFOHHCFQHUFWFR-0e0; rxvt=1684574917257|1684573117257; w-rctx=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2ODQ1NzMxNDAsImV4cCI6MTY4NDU3Njc0MCwiaWF0IjoxNjg0NTczMTQwLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6ImUyNjE4YzU4LTUxM2EtNGNjZS05MzJmLTQ1YTJhZGU2MjUzNCIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.BpP98M8JtjS75Ml5kTFPGV9Dj6FolT-pER5FXNUpH3a7a0pLnob8CMUpVLOPL_OQcueMRS0ZA0Z7UosGLyismh1axvD7Cu2hmE__DMem-7ZCgu-ISAcDS_SWYTuV-nTFPnocSDR_YGOGFsqfPCMPL7jhFOSakBkBn-VNoZuejQztpDfnQBZmmPLVJtE2w8gtLYbHTpxN9_6rYabtHQUavRTfbJ7myjzhoyc8Ij9lltjb-ZA7jwcgM1wFLcuzAnXJhko1h9u9u6HGCJWFR9LEA-R17TUCrYMr4ouWEyFKpSC1TF7JFVjx-jS-xB2etybiNzjmpbp1xi00xoQHiirjEA; wow-auth-token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2ODQ1NzMxNDAsImV4cCI6MTY4NDU3Njc0MCwiaWF0IjoxNjg0NTczMTQwLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6ImUyNjE4YzU4LTUxM2EtNGNjZS05MzJmLTQ1YTJhZGU2MjUzNCIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.BpP98M8JtjS75Ml5kTFPGV9Dj6FolT-pER5FXNUpH3a7a0pLnob8CMUpVLOPL_OQcueMRS0ZA0Z7UosGLyismh1axvD7Cu2hmE__DMem-7ZCgu-ISAcDS_SWYTuV-nTFPnocSDR_YGOGFsqfPCMPL7jhFOSakBkBn-VNoZuejQztpDfnQBZmmPLVJtE2w8gtLYbHTpxN9_6rYabtHQUavRTfbJ7myjzhoyc8Ij9lltjb-ZA7jwcgM1wFLcuzAnXJhko1h9u9u6HGCJWFR9LEA-R17TUCrYMr4ouWEyFKpSC1TF7JFVjx-jS-xB2etybiNzjmpbp1xi00xoQHiirjEA; prodwow-auth-token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2ODQ1NzMxNDAsImV4cCI6MTY4NDU3Njc0MCwiaWF0IjoxNjg0NTczMTQwLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6ImUyNjE4YzU4LTUxM2EtNGNjZS05MzJmLTQ1YTJhZGU2MjUzNCIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.BpP98M8JtjS75Ml5kTFPGV9Dj6FolT-pER5FXNUpH3a7a0pLnob8CMUpVLOPL_OQcueMRS0ZA0Z7UosGLyismh1axvD7Cu2hmE__DMem-7ZCgu-ISAcDS_SWYTuV-nTFPnocSDR_YGOGFsqfPCMPL7jhFOSakBkBn-VNoZuejQztpDfnQBZmmPLVJtE2w8gtLYbHTpxN9_6rYabtHQUavRTfbJ7myjzhoyc8Ij9lltjb-ZA7jwcgM1wFLcuzAnXJhko1h9u9u6HGCJWFR9LEA-R17TUCrYMr4ouWEyFKpSC1TF7JFVjx-jS-xB2etybiNzjmpbp1xi00xoQHiirjEA; ak_bmsc=1F526877342DBD2AECADA201A1C852F4~000000000000000000000000000000~YAAQRsfOF4gyPgSIAQAAcjdiOBNH8H0bQ4+u2sVjzrd7JsDLyG4lAGJNx95V1OPcOqouJ9DkephKhLpsju3mWN5cBxmRKQtKJLY9k3661xQprqkKhVr4m3lcbaN7U7NlRSgpbcGTjeKdhyspiSb1rl0N41ppG54tn97+97cgvfNJaPgKw500tkkbZ16JeCt1gtFrrdQe+tbBiNlDNWgam8WYDKUF1eC/IrItsbyZFq3/rQpw4l7YXsMGi1MGzBlnSQ01hCuxBIy1ABezDC+eMA7RHYN2/2S29IxeJ2K8yRR3Pr2f+NG1wB5hrFoI15MA1UcK5a5uoSABnN0zfvTiDE03QiuVIsKI9QDLYqydRuflHGnZ4eaMTbqEXSSZMph6AigLPxFVl5HSB3EXDa4KPfuQ; ai_session=9WrAOBr1EeuitP8mJFpIum|1684571315629|1684573141027"

export const getWoolworthsBatchProductInfo:GetBatchProductInfo = async(urls) => {
  const productInfos:ProductInfo[] = []
  for (const url of urls) {
    const productCode = url.split('/').slice(-2)[0]
    const jsonUrl = `https://www.woolworths.com.au/apis/ui/product/detail/${productCode}`
    const productJson = await scrapeJson(jsonUrl, woolworthsCookie)
    const productInfo = getWoolworthsProductInfo(productJson)
    if (productInfo != null) { productInfos.push(productInfo) }
  }
  return productInfos
}