<script  setup lang="ts">
 
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getIndexList, gameList, tags } from '../composables/useGameList'

const router = useRouter()

const toDetail =  (id:number) => {
  //跳转到详情页，并且把id传递过去
  router.push({
    path: `/detail`,
    query: { did: id }
  })
}
onMounted(() => { getIndexList() })

</script>
<script lang="ts">
export default {
  name: "GameList",
}
</script>
<template>
  <!-- <van-skeleton title avatar :row="10" :loading="loading"> -->
  <div class="container">
    <div v-for="(item, index) in gameList" :key="item.id">
      <div class="content">
        <div class="left">
          <van-image alt="" lazy-load width="70" height="70" :src="item.icon" />
          <p class="grade">评分：<span>{{ ((item.grade) / 10).toFixed(1) }}</span></p>
        </div>
        <div class="right">
          <div class="title">{{ item.gameName }}<span v-if="item.is_hot == 1"><img src="@/assets/img/hot.png"
                alt=""></span></div>
          <div class="introduction">
            <span>{{ item.introduction }}</span>
            <div class="btn" @click="toDetail(item.id)">
              <img src="@/assets/img/btn.png" alt="">
            </div>
          </div>
          <div class="tag">

            <span v-for=" (i) in tags[index].splice(0,4)">
              <van-tag color="#E5E5E5" text-color="#666666">{{ i }}</van-tag>
            </span>

          </div>
          <p class="first">首服时间{{ item.first }} 19点首战区</p>
          <p class="engine">游戏引擎：{{ item.engine }}</p>
          <p class="platform">
            <img v-if="item.android == 1" src="@/assets/img/and.png" alt="">
            <img v-if="item.ios_sign == 1 || item.ios_store == 1" src="@/assets/img/ios.png" alt="">
            <img v-if="item.pc == 1" src="@/assets/img/pc.png" alt="">
          </p>
        </div>
      </div>
      <van-divider />
    </div>
  </div>
  <!-- </van-skeleton> -->
</template>

<style lang="scss" scoped>
.container {
  margin-bottom: 1rem;

}

.content {
  display: flex;

  .left {
    // margin:0 0.4rem;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
    display: flex;
    align-items: center;
    // justify-content: center;
    flex-direction: column;
    color: #333333;
    font-weight: 600;

    img {
      width: 2.1rem;
    }

    .grade {
      margin-top: 0.5rem;
      font-size: 0.35rem;
      display: flex;
      align-items: center;
      color: #666;
      font-family: PingFangSC-Regular;

      span {
        color: #FA623E;
        // margin-top: 0.3rem;
        font-size: 0.65rem;
        width: 40%;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: 0.4rem;
      display: flex;
      align-items: center;

      img {
        width: 0.8rem;
        margin-left: 0.5rem;
      }
    }

    .introduction {
      margin: 0.2rem 0;
      display: flex;
      line-height: 0.4rem;
      .btn {
        position: absolute;
        right: 0.2rem;
      }

      span {
        // padding-right: 0.rem;
        width: 50vw;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      img {
        width: 2rem;
        object-fit: cover;
        margin-right: 0.2rem;
      }
    }

    .tag {
      display: flex;

      span {
        margin-left: 0.1rem;
        // margin: 0 0.2rem;
        // background-color: #E5E5E5;
        // color: #666666;
        // padding: 0.05rem;
      }
    }

    .first {
      color: #FFB400;
      margin: 0.2rem 0;
    }

    .engine {
      margin: 0.1rem;
    }

    .platform {
      display: flex;

      img {
        margin: 0.1rem;
        width: 0.4rem;
      }
    }
  }
}
</style>
