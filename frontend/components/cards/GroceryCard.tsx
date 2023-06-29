import React from 'react'
import Image from 'next/image'
import styles from './GroceryCard.module.css'

const GroceryCard = ({productInfo}:any) => {
  let productName = productInfo.name
  const maxLength = 50;
  if (productName.length > maxLength) {
    productName = productName.slice(0, maxLength - 3) + '...'
  }
  return (
    <div className={styles.card}>
      <a href={productInfo.url}>
        <div className={styles.imageContainer}>
          <div className={styles.imagePadding}>
            <Image
              className={styles.imagePadding}
              src={productInfo.img}
              fill={true}
              style={{objectFit: 'cover'}}
              alt={productInfo.name}
            />
          </div>
        </div>
      </a>
      <div className={styles.textContainer}>
        <p>{productName}</p>
        <div className={styles.priceContainer}>
          <h6>{`${productInfo.unitPrice} $/kg`}</h6>
          <span>
            <p>{`$${productInfo.price} / ${productInfo.quantity}kg`}</p>
            </span>
        </div>
      </div>
    </div>
  )
}

export default GroceryCard