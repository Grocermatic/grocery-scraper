/* istanbul ignore file */

import axios from "axios"
try { require('dotenv').config() } catch {}

import { ProductNutrition } from "../website/interface"
import { roundDecimal } from "./roundDecimal"



export const nutritionixNlp = async(text:string) => {
  try {
    const {data} = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query: text,
    }, {
      headers: {
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY,
      }
    })
    const foodData = data.foods[0]
    const nutrients:ProductNutrition = {
      servingSize: foodData.serving_weight_grams,
      kilojoules: roundDecimal(foodData.nf_calories * 4.184, 3),
      protein: foodData.nf_protein,
      fat: foodData.nf_total_fat,
      fatSaturated: foodData.nf_saturated_fat,
      carb: foodData.nf_total_carbohydrate,
      sugar: foodData.nf_sugars,
      sodium: foodData.nf_sodium
    }
    return nutrients
  } catch {
    return null
  }
}