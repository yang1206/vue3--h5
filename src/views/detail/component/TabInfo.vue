<script lang="ts" setup>
import { computed } from 'vue';
import { gameInfo, active, copy, couponList } from '../composables/useGameInfo'
import CouponList from './CouponList.vue';
const isCoupon = computed(() => {
  return couponList.value.length
})
const id = localStorage.getItem('aid')
</script>

<template>
  <div class="tab">
    <van-tabs v-model:active="active" color="#FBB000">
      <van-tab title="游戏介绍">
        <div class="pc_tips" v-show="gameInfo.gameName === '一起玩神途' || gameInfo.game_id == '1298'">
          <p>当前游戏端游下载地址</p>
          <p class="url">www2.yqwst.com/{{ id }}</p>
        </div>
        <div class="introduction">
          <h1>游戏介绍</h1>
          <span>
            {{ gameInfo.introduction }}
          </span>
        </div>
        <div class="intelligence">
          <h1>游戏情报</h1>
          <div class="progress ">
            <p>
              <span>上手难度</span>
              简单
              <span class="item">
                <van-progress :show-pivot="false" color="#FFA200" :percentage="(gameInfo.difficulty * 10)" />
              </span>
              困难
            </p>
            <p>
              <span>氪金周期</span>
              零充
              <span class="item">
                <van-progress :show-pivot="false" color="#FFA200" :percentage="(gameInfo.money * 10)" />
              </span>
              神豪
            </p>
            <p>
              <span>游戏周期</span>
              短期
              <span class="item">
                <van-progress :show-pivot="false" color="#FFA200" :percentage="(gameInfo.cycle * 10)" />
              </span>
              长期
            </p>
          </div>
        </div>
        <div class="strategy">
          <span v-html="gameInfo.content"></span>
        </div>
      </van-tab>
      <van-tab title="礼包">
        <div class="libao">
          <div class="info">
            <span>礼包码：{{ gameInfo.libao }}</span>
            <span class="copy" @click="copy">复制</span>
          </div>
        </div>
      </van-tab>
      <van-tab v-if="isCoupon !== 0" title="优惠券">
        <CouponList :couponList="couponList" :gameInfo="gameInfo" ></CouponList>
      </van-tab>

    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>

.tab {
  margin-top: 0.1rem;

  .pc_tips {
    background: url('@/assets/img/pc_bg.png') no-repeat 100%;
    background-size: cover;
    height: 1.5rem;
    margin: 0.5rem 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    .url{
      margin: 0.1rem;
      background-color: #fff;
      height: 0.3rem;
      color: red;
      // font-size: 0.5rem;
      padding: 4px;
      font-weight: bold;
    }
  }

  .introduction {
    width: 95vw;
    margin: 0 auto;

    h1 {
      margin: 0.3rem;
      font-size: 0.4rem;
    }

    span {
      padding: 0.5rem;
      line-height: 0.5rem;
    }
  }

  .intelligence {
    h1 {
      margin: 0.3rem;
      font-size: 0.4rem;
    }

    .progress {
      display: flex;
      flex-direction: column;

      p {
        margin: 0.15rem 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .item {
          width: 40%;
        }
      }
    }
  }

  .strategy {
    // text-align: center;
    line-height: 1rem;
    padding: 0.4rem;
    font-size: 0.3rem;
  }

  .libao {
    background: url('@/assets/img/libao_new.png');
    width: 90%;
    height: 3rem;
    background-size: cover;
    margin: 0 auto;
    position: relative;

    .info {
      position: absolute;
      top: 55%;
      left: 10%;

      .copy {
        margin-left: 0.5rem;
      }
    }
  }

}
</style>
