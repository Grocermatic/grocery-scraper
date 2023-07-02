import React from "react"
import NutrientSlider from "./NutrientSlider"
import styles from "./NutrientInfo.module.css"

const NutrientInfo = ({ nutrition }: any) => {
  return (
    <>
      {nutrition && (
        <h6 className={styles.nutritionTitle}>
          Recommended daily intake per 100g
        </h6>
      )}
      {nutrition &&
        Object.getOwnPropertyNames(nutrition).map((key: any, id: number) => {
          const nutrient = key as keyof Object
          if ((nutrient as string) != "servingSize") {
            let label = nutrient as string
            switch (label) {
              case "kilojoules":
                label = "Energy (kj)"
                break
              case "protein":
                label = "Protein (g)"
                break
              case "fat":
                label = "Fat (g)"
                break
              case "fatSaturated":
                label = "Sat Fat (g)"
                break
              case "carb":
                label = "Carb (g)"
                break
              case "sugar":
                label = "Sugar (g)"
                break
              case "sodium":
                label = "Sodium (mg)"
                break
            }
            return (
              <NutrientSlider
                key={id}
                nutrient={label}
                value={nutrition[nutrient]}
                rdi={100}
              />
            )
          }
        })}
      {!nutrition && (
        <span>
          <p className="center-text italic-text">Nutrition info available</p>
        </span>
      )}
    </>
  )
}

export default NutrientInfo
