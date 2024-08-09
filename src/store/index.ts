import { createPinia } from 'pinia'
import useGlobalStore from './global'

const store = createPinia()
export { store }
export function useStore() {
  return {
    globalData: useGlobalStore(),
  }
}

export default useStore
