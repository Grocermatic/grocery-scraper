import { scrapeStatic } from "./src/request/scrapeStatic"

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"



export const handler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => {
  const html = await scrapeStatic('https://www.coles.com.au/browse/fruit-vegetables')
  return {
    statusCode: 200,
    body: JSON.stringify({
        html: html
    })
  }
}
