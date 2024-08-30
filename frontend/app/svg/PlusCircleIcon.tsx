import { splitProps } from 'solid-js'

export const PlusCircleIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <title>plus</title>
      <path d="M7.5.877C3.842.877.877 3.842.877 7.5s2.965 6.623 6.623 6.623 6.623-2.965 6.623-6.623S11.158.877 7.5.877zM1.827 7.5c0-3.133 2.54-5.673 5.673-5.673s5.673 2.54 5.673 5.673-2.54 5.673-5.673 5.673-5.673-2.54-5.673-5.673zM7.5 4a.5.5 0 0 1 .5.5V7h2.5a.5.5 0 1 1 0 1H8v2.5a.5.5 0 1 1-1 0V8H4.5a.5.5 0 1 1 0-1H7V4.5a.5.5 0 0 1 .5-.5z" />
    </svg>
  )
}
