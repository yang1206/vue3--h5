import { defineStore } from 'pinia'

interface IAppState{
  active:number,
  currentIndex:number | null,
  loading:boolean,
  detail_id:object | null
}
export const useAppStore = defineStore('app', {
  state: (): IAppState => ({
    //tab栏选中状态
    active: 0,
    currentIndex:null,
    loading:true,
    detail_id:null
  }),
  getters: {
    getActive(state) { return state.active },
    getCurrentIndex(state) { return state.currentIndex },
    getLoading(state) { return state.loading },
    getDetailId(state){return state.detail_id}
  },
  actions: {
    //tab栏点击状态
    changeTab(props: number) {
      this.active = props
    },
    changeCurrentIndex(props: number) {
      this.currentIndex = props
    },
    changeLoading(props:boolean){
      this.loading = props
    },
    changeDetailId(props:object){
      this.detail_id = props
    }
  }
})