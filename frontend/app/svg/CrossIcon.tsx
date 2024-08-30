import { splitProps } from 'solid-js'

export const CrossIcon = (props: any) => {
  const [local, _] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="0 0 15 15" class={local.class}>
      <title>cross</title>
      <path d="M11.782 4.032c.225-.225.225-.589 0-.813s-.589-.225-.813 0L7.5 6.687 4.032 3.218c-.225-.225-.589-.225-.813 0s-.225.589 0 .813L6.687 7.5l-3.468 3.468c-.225.225-.225.589 0 .813s.589.225.813 0L7.5 8.313l3.468 3.468c.224.225.589.225.813 0s.225-.589 0-.813L8.313 7.5l3.468-3.468z" />
    </svg>
  )
}
