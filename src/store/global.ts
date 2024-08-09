import { defineStore } from 'pinia'
import type { keyDownType } from '../types/globalTypes'

const useGlobalStore = defineStore('global', () => {
  const keyDownObj = ref<keyDownType>({
    key: -1,
    trigger: false,
  })
  const setIsKeyDown = (val: keyDownType) => {
    keyDownObj.value.trigger = val.trigger
    keyDownObj.value.key = val.key
  }

  return {
    keyDownObj,
    setIsKeyDown,
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useGlobalStore as any, import.meta.hot));
// }
export default useGlobalStore
