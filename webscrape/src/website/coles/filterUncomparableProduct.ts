export const filterUncomparableProduct = (jsonData: any) => {
  // Filter non-available products and quantities with each
  const products = JSON.parse(
    jsonData,
  ).props.pageProps.searchResults.results.filter((product: any) => {
    return (
      product.availability == true &&
      product.pricing.unit.ofMeasureUnits != 'ea'
    )
  })
  return products
}
