import { createPinia } from 'pinia'
import type { App } from 'vue'

export const store = createPinia()

export default function setupStore(app: App<Element>) {
  app.use(store)
}
