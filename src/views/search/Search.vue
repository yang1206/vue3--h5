<script lang="ts"  setup>
import { ref, onActivated, onDeactivated } from 'vue'
import { useRouter } from 'vue-router'
import HotList from './component/HotList.vue'
import SearchResult from './component/SearchResult.vue'
import { SearchGame } from '@/api/home'

const router = useRouter()
//搜索名称
const game_name = ref('')
const isResult = ref(true)
const noResult = ref(false)
const gameList = ref([])
const tagList = ref([])
//搜索点击事件
const onClickButton = () => {
  SearchGame({ game_name: game_name.value }).then(res => {
    gameList.value = res.data
    gameList.value.map(item => {
      tagList.value.push(item.tags.split(','))
    });
    if (gameList.value.length !== 0) {
      isResult.value = false
      noResult.value = false
    }
    else {
      noResult.value = true
    }
    
  })
}

const clear = () => {
  isResult.value = true
  noResult.value = true
  gameList.value = []
}

//返回上一页
const backRouter = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

</script>

<template>
  <div>
  <div class="top"></div>
    <div class="nav safe-area-inset-top">
      <van-icon @click="backRouter" class="left" size="18" name="arrow-left" />
      <van-search class="right" v-model="game_name" @clear="clear" show-action placeholder="请输入搜索关键词"
        @search="onClickButton">
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>
    </div>
    <div v-show="noResult" class="noResult">
      <img src="@/assets/img/no.png" alt="">
      <p>啊哦，没有找到相关游戏，换个关键词吧！</p>
    </div>
    <HotList v-show="isResult" />
    <SearchResult :gameList="gameList" :tagList="tagList" />
  </div>
</template>

<style lang="scss" scoped>

.top{
  width: 100%;
  height: 0.5rem;
  background-image: linear-gradient(to bottom, #e4e5e5, #fff);
}
.nav {
  display: flex;
  align-items: center;
  // margin-top: 0.2rem;
  
  .left {
    width: 10%;
    text-align: center;
  }

  .right {
    flex: 1;
    margin-right: 5%;
    line-height: 2rem;
  }
}

.noResult {
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 5rem;
  }
}
</style>
