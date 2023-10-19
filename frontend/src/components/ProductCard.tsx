export const ProductCard = (prop: any) => {
  const { productInfo } = prop
  const maxNameLength = 40
  let productName = productInfo.name
  if (productInfo.name.length > maxNameLength)
    productName = productInfo.name.slice(0, maxNameLength) + '...'
  return (
    <tr class="p-2 dark:bg-slate-900 flex justify-between items-center gap-1">
      <td class="p-1 bg-white rounded-lg shrink-0 dark:brightness-90">
        <img
          class="object-cover h-20 w-20"
          src={productInfo.img}
          loading="lazy"
          alt={productInfo.name}
          aria-label={`Image of: ${productInfo.name}`}
        />
      </td>
      <td class="flex-grow h-20 flex flex-col justify-between">
        <h3 class="font-semibold text-gray-800 dark:text-gray-200">
          {productName}
        </h3>
        <div class="flex justify-between">
          <p class="text-sm text-gray-800 dark:text-gray-200">
            ${productInfo.price} / {productInfo.quantity} kg
          </p>
          <p class="text-sm text-gray-800 dark:text-gray-200">
            ${productInfo.unitPrice} per kg
          </p>
        </div>
      </td>
    </tr>
  )
}
