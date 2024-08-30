export const loadExternalJs = (url: string) => {
  const script = document.createElement('script')
  script.setAttribute('src', url)
  script.setAttribute('crossorigin', 'anonymous')
  document.head.appendChild(script)
}
