import { shallowRef, unref } from 'vue'
import type AtModal from './AtModal.vue'

export function useModal() {
  const elRef = shallowRef<InstanceType<typeof AtModal>>()
  async function open() {
    await unref(elRef)?.open()
  }

  async function close() {
    await unref(elRef)?.close()
  }
  return [elRef, open, close] as const
}
