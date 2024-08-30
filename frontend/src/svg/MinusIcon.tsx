import { splitProps } from 'solid-js'

export const MinusIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <title>minus</title>
      <path d="M2.25 7.5a.5.5 0 0 1 .5-.5h9.5a.5.5 0 1 1 0 1h-9.5a.5.5 0 0 1-.5-.5z" />
    </svg>
  )
}
