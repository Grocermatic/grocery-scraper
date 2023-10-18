export const ProductCard = (prop: any) => {
  const { productInfo } = prop
  return (
    <>
      <img src={productInfo.img}></img>
      <h1>{productInfo.name}</h1>
      <p>${productInfo.unitPrice} per kg</p>
      <p>${productInfo.price}</p>
      <p>{productInfo.quantity} kg</p>
    </>
  )
}
