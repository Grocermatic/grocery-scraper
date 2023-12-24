export const safeSha256 = async (input: string) => {
  const encodedText = new TextEncoder().encode(input)
  const buffer = await crypto.subtle.digest('SHA-256', encodedText)
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  return base64String.replaceAll('/', '_').replaceAll('+', '-')
}
