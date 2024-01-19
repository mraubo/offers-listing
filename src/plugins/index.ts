import vuetify from './vuetify'
import { DefaultApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'
import { apolloClient } from '@/api/apolloClient'

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.provide(DefaultApolloClient, apolloClient)
}
