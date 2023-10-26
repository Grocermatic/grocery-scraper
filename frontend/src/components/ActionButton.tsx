import { children, mergeProps, splitProps } from 'solid-js'

export const ActionButton = (props: any) => {
  props = mergeProps({ class: '', onClick: () => {} }, props)
  const [local, _] = splitProps(props, ['class', 'onClick'])
  const c = children(() => props.children)
  return (
    <button onClick={local.onClick} class={`card ${local.class}`}>
      {c()}
    </button>
  )
}
