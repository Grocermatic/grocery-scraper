import { Match, Switch, splitProps } from 'solid-js'
import { AldiLogo } from './AldiLogo'
import { ColesLogo } from './ColesLogo'
import { WoolworthsLogo } from './WoolworthsLogo'
import { IgaLogo } from './IgaLogo'

export const StoreLogo = (props: any) => {
  const [local, _] = splitProps(props, ['storeName', 'class'])
  return (
    <Switch>
      <Match when={local.storeName == 'Aldi'}>
        <AldiLogo class={local.class} />
      </Match>
      <Match when={local.storeName == 'Coles'}>
        <ColesLogo class={local.class} />
      </Match>
      <Match when={local.storeName == 'Iga'}>
        <IgaLogo class={local.class} />
      </Match>
      <Match when={local.storeName == 'Woolworths'}>
        <WoolworthsLogo class={local.class} />
      </Match>
    </Switch>
  )
}
