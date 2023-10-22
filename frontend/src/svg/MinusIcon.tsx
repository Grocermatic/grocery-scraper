import { splitProps } from "solid-js"

export const MinusIcon = (props: any) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" class={local.class}>
      <path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" />
    </svg>
  )
}