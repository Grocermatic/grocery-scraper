import { splitProps } from 'solid-js'

export const PlusIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <path d="M8 2.75a.5.5 0 1 0-1 0V7H2.75a.5.5 0 1 0 0 1H7v4.25a.5.5 0 1 0 1 0V8h4.25a.5.5 0 1 0 0-1H8V2.75z" />
    </svg>
  )
}
