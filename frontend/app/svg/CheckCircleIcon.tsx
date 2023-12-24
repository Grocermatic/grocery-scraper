import { splitProps } from 'solid-js'

export const CheckCircleIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <path d="M7.5.877C3.842.877.877 3.842.877 7.5s2.965 6.623 6.623 6.623 6.623-2.965 6.623-6.623S11.158.877 7.5.877zM1.827 7.5c0-3.133 2.54-5.673 5.673-5.673s5.673 2.54 5.673 5.673-2.54 5.673-5.673 5.673-5.673-2.54-5.673-5.673zm8.332-1.962a.5.5 0 1 0-.818-.575L6.52 8.972 5.357 7.787a.5.5 0 0 0-.714.701L6.227 10.1a.5.5 0 0 0 .766-.063l3.167-4.5z" />
    </svg>
  )
}
