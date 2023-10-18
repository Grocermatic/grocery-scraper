export const ProductCard = (prop: any) => {
  const { productInfo } = prop
  return (
    <>
      <img src={productInfo.img}></img>
    </>
  )
}