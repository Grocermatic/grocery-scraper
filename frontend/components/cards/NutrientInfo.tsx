import React from 'react'
import NutrientSlider from './NutrientSlider'

const NutrientInfo = ({ nutrition }:any) => {
  return (
    <>
      { nutrition &&
        Object.getOwnPropertyNames(nutrition).map((key:any, id:number) => {
          const nutrient = key as keyof Object
          console.log(nutrition[nutrient])
          return (
            <NutrientSlider
              key={id}
              nutrient={nutrient}
              value={nutrition[nutrient]}
              rdi={100}
            />
          )
        })
      }
      { !nutrition &&
        <span><p className='center-text italic-text'>Nutrition info available</p></span>
      }
    </>
  )
}

export default NutrientInfo