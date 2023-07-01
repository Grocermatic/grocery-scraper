import React from 'react'
import styles from './NutrientSlider.module.css'

const NutrientSlider = ({nutrient, value, rdi}:any) => {
  return (
    <div className={styles.nutrientSlider}>
      <p className={styles.labelText}>{nutrient}</p>
      <div className={styles.sliderBase}>
        <div className={styles.sliderFill} style={{width: `${100 * value / rdi}%`}}/>
      </div>
      <p className={styles.valueText}>{`${value} / ${rdi}`}</p>
    </div>
  )
}

export default NutrientSlider