import { createPinia } from 'pinia';
import useGlobalStore from './global';
const store = createPinia();
export { store };
export const useStore = () => ({
  globalData: useGlobalStore(),
});

export default useStore;
