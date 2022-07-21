import { createPinia } from "pinia"
import { useAppStore } from '@/store/modules/useAppStore'
import { useUserStore } from '@/store/modules/useUserStore'
export { useAppStore, useUserStore }
export const piniaStore = createPinia()
