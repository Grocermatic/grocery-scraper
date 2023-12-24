import { Show, splitProps } from 'solid-js'

export const LabelledInput = (props: any) => {
  const [local, _] = splitProps(props, [
    'type',
    'label',
    'value',
    'id',
    'placeholder',
    'onChange',
    'onInput',
  ])
  return (
    <label
      for={local.id}
      class="w-full card text-center px-2 focus-within:border-dark focus-within:ring-0"
    >
      <Show when={local.label}>
        <span class="text-xs font-semibold text-dark">{local.label}</span>
      </Show>
      <input
        onChange={local.onChange}
        onInput={local.onInput}
        type={local.type}
        id={local.id}
        value={local.value}
        placeholder={local.placeholder}
        class="w-full text-center focus:border-transparent focus:outline-none focus:ring-0"
      />
    </label>
  )
}
