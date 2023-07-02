import React from "react"
import styles from "./NutrientSlider.module.css"

const NutrientSlider = ({ nutrient, value, rdi }: any) => {
  const hiddenExtension = 100
  const percentage = value / rdi
  const styleBase = percentage > 1 ? styles.sliderFillOver : styles.sliderBase
  return (
    <>
      {value && (
        <div className={styles.nutrientSlider}>
          <p className={styles.labelText}>{nutrient}</p>
          <div className={styleBase}>
            {value > rdi && (
              <>
                <div
                  className={styles.sliderFill}
                  style={{
                    marginLeft: `-${hiddenExtension}%`,
                    width: `${100 / percentage + hiddenExtension}%`,
                  }}
                />
              </>
            )}
            {value <= rdi && (
              <div
                className={styles.sliderFill}
                style={{
                  marginLeft: `-${hiddenExtension}%`,
                  width: `${100 * percentage + hiddenExtension}%`,
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
