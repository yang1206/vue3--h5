import { ref, computed } from 'vue'
import { getIndex } from '@/api/home'
import { useAppStore } from '@/store/index'
const appStore = useAppStore()

//游戏列表数据
export const gameList = ref([])
//标签数据
export const tags = ref([])
//骨架屏状态
export const loading = computed(() => {
  return appStore.getLoading
})

//列表请求
export const  getIndexList = (tag1: number = 0, tag2: number = 0) => {
  getIndex({ tag1: tag1, tag2: tag2 }).then((res) => {
    gameList.value =  res.data
    gameList.value.map(item => {
      tags.value.push(item.tags.split(','))
    });
    appStore.changeLoading(false)
  })
}