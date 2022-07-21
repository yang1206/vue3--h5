<script  setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { Dialog } from 'vant';
import GameInfo from './component/GameInfo.vue'
import TabInfo from './component/TabInfo.vue'
import { getPackInfo } from '@/api/home';
import { Fetch } from '@/api/fetch'
import { gameInfo, getInfo, game_id } from './composables/useGameInfo'
import { useAppStore } from '@/store/index'
import { device } from '@/utils/device'
import useToUrl from '@/hook/useToUrl';
const { toCustomer } = useToUrl()
//判断设备
const isIos = device()






const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
//接到从路由传来的游戏id
const did = ref(route.query)

appStore.changeDetailId(did.value)






const backRouter = () => {
  appStore.changeLoading(true)
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}


const getUrl = (formData: FormData) => {
  Fetch('https://t.yqwb.com/webPage/game/getUrl', formData).then(data => {
    // console.log(Object.keys(data.data).length);
    
    if (!data.data.url) {
      Dialog({ message: '游戏正在打包中，请稍后过来下载' })
    } else {
      location.href = data.data.url

    }
  }).catch(data => {
    Dialog({ message: data.msg })
  })
}

const anddown = () => {
  getPackInfo({ game_id: game_id.value }).then(()=>{
    let formData = new FormData()
    formData.append('game_id', game_id.value)
    formData.append('agent_id', localStorage.getItem('aid'))
    formData.append('type', '1')
    getUrl(formData)
  })
  
}
const iosdown = () => {
  getPackInfo({ game_id: game_id.value }).then(() => {
    let formData = new FormData()
    formData.append('game_id', game_id.value)
    formData.append('agent_id', localStorage.getItem('aid'))
    formData.append('type', '2')
    getUrl(formData)
  })
  

}
getInfo({ id: did.value.did })

onMounted(() => {
  //回到顶部
  window.scroll(0, 0)
})
</script>
<template>
  <div>
    <div >
      <div class="top" v-lazy:background-image="gameInfo.detail_img">
      </div>
      <div class="back" @click="backRouter">
        <van-icon name="arrow-left" />
      </div>
      <!-- <van-skeleton  avatar :row="3"> -->
      <GameInfo />
      <TabInfo />
      <div style="height:2rem">

      </div>
      <!-- 底部固定下载按钮 -->
      <div class="btnContent">
        <div class="kefu" @click="toCustomer">
          <img src="@/assets/img/kefu.png" alt="">
        </div>
        <div class="down">
          <!-- <span>下载（{{ gameInfo.packSize }}MB）</span> -->
          <van-button class="btn" @click="iosdown" round size="large" color="#FF9836" v-if="isIos == 2">
            下载

          </van-button>
          <van-button class="btn" @click="anddown" round size="large" color="#FF9836" v-else>下载<span
              v-if="gameInfo.packSize">（{{
              gameInfo.packSize
              }}MB）</span></van-button>
        </div>
      </div>
      <!-- </van-skeleton> -->

    </div>
  </div>
</template>
<style lang="scss" scoped>

.top {
  width: 100%;
  height: 30vh;
  background-size: cover;
}

.back {
  position: fixed;
  left: 0.3rem;
  top: 0.9rem;
  color: rgb(118, 108, 108);
  font-size: 0.6rem;
  width: 100%;
}

.btnContent {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 1.7rem;
  padding: 0.3rem;
  width: 100%;

  .kefu {
    img {
      width: 0.5rem;
    }
  }

  .down {
    margin-right: 10vw;
    .btn {
      width: 60vw;
      height: 0.9rem;
    }
  }
}
</style>
