import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

import { getColesBatchProductInfo } from "./src/website/coles/getProductInfo"



export const serverlessHandler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => {
  const info = await getColesBatchProductInfo([
    'https://www.coles.com.au/product/coles-white-seedless-grapes-loose-approx.-800g-6706395'
  ])
  return {
    statusCode: 200,
    body: JSON.stringify({
        productInfo: info
    })
  }
}
