import { splitProps } from 'solid-js'

export const SearchIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <title>search</title>
      <path
        fill-rule="evenodd"
        d="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 1 1 7 0zm-.691 3.516A4.48 4.48 0 0 1 6.5 11a4.5 4.5 0 1 1 0-9A4.5 4.5 0 0 1 11 6.5a4.48 4.48 0 0 1-.984 2.809l2.838 2.838a.5.5 0 1 1-.707.707l-2.838-2.838z"
      />
    </svg>
  )
}
