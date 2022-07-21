<script lang="ts"  setup>
import { ref } from 'vue'
import { getHotGame, getNewGame } from '@/api/home'
import { useRouter } from 'vue-router'

const router = useRouter()
//推荐数据
const hotList = ref([])
//新游数据
const newList = ref([])
getHotGame().then(res => {
  hotList.value = res.data
})
getNewGame().then(res => {
  newList.value = res.data
})
const toDetail = (id) => {
  //跳转到详情页，并且把id传递过去
  router.push({
    path: `/detail`,
    query: { did: id }
  })
}
</script>

<template>
  <div>
    <div class="hot">
      <h2>推荐游戏</h2>
      <div class="content">
        <div class="item" v-for="item in hotList" @click="toDetail(item.id)" :key="item.id">
          <img :src="item.icon" alt="">
          <span>{{ item.gameName }}</span>
        </div>
      </div>
    </div>
    <div class="new">
      <h2>新游上架</h2>
      <div class="content">
        <van-tag class="tag" v-for="item in newList" :key="item.id" @click="toDetail(item.id)" size="medium"
          color="#F2F2F2" text-color="#717171" round type="primary">{{ item.gameName }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.hot {
  h2 {
    font-size: 0.5rem;
    margin: 0.5rem;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    margin: 0 auto;
    width: 90%;

    .item {
      display: flex;
      align-items: center;
      // justify-content: center;
      margin: 0.1rem;

      img {
        width: 0.8rem;
      }

      span {
        margin-left: 0.1rem;
        text-overflow: ellipsis;
      }

    }
  }
}

.new {
  h2 {
    font-size: 0.5rem;
    margin: 0.5rem;
  }

  .content {
    .tag {
      margin: 0.2rem;
    }
  }
}
</style>
