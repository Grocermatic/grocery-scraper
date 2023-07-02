import React from "react"
import styles from "./NutrientSlider.module.css"

const NutrientSlider = ({ nutrient, value, rdi }: any) => {
  const hiddenExtension = 100
  return (
    <>
      {value && (
        <div className={styles.nutrientSlider}>
          <p className={styles.labelText}>{nutrient}</p>
          <div className={styles.sliderBase}>
            {value > rdi && (
              <div
                className={styles.sliderFillOver}
                style={{ width: `${(100 * value) / rdi}%` }}
              />
            )}
            {value <= rdi && (
              <div
                className={styles.sliderFill}
                style={{
                  marginLeft: `-${hiddenExtension}%`,
                  width: `${(100 * value) / rdi + hiddenExtension}%`,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default NutrientSlider
