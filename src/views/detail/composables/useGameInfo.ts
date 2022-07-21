import { ref } from 'vue'
import { getInformation, getCoupon } from '@/api/home'
import { Notify } from 'vant';
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

// import { useAppStore } from '@/store/index'
// const appStore = useAppStore()
// const id = computed(()=>{
//   return appStore.getDetailId
// })
const game_id = ref()
const gameInfo = ref({
  detail_img: '',
  tags: '',
  icon: '',
  gameName: '',
  grade: null,
  is_hot: null,
  engine: '',
  android: null,
  ios_sign: null,
  shangwu: '',
  zhongwu: '',
  wanshang: '',
  content: '',
  first: '',
  ios_store: null,
  pc: null,
  introduction: '',
  difficulty: null,
  cycle: null,
  money: null,
  packSize: '',
  libao: '',
  game_id:''
})
const active = ref(0)
const tagList = ref([])
const couponList = ref([])
const getInfo = async (id) => {
  getInformation(id).then(res => {
    getCouponList({ game_id: res.data.game_id })
    game_id.value = res.data.game_id
    gameInfo.value = res.data
    tagList.value = (gameInfo.value.tags.split(',').splice(0, 4))
  })
}

const getCouponList = (id)=>{
  getCoupon(id).then(res=>{
    couponList.value = res.data
  })
}


const copy = async () => {
  try {
    await toClipboard(gameInfo.value.libao)
    Notify('复制成功');
  } catch (e) {
    console.error(e)
  }
}
export { gameInfo, tagList, active, getInfo, copy, getCouponList, couponList, game_id }