<script lang="ts" setup>
import { gameInfo, tagList } from '../composables/useGameInfo'
</script>

<template>
  <div class="info">
    <div class="content">
      <div class="left">
        <img :src="gameInfo.icon" alt="">
      </div>
      <div class="right">
        <div class="title">{{ gameInfo.gameName }}<span v-if="gameInfo.is_hot == 1"><img src="@/assets/img/hot.png"
              alt=""></span></div>
        <div class="tag">
          <div>
            <span v-for=" (i) in tagList">
              <van-tag color="#E5E5E5" text-color="#666666">{{ i }}</van-tag>
            </span>
          </div>
          <p class="grade">评分：<span>{{ ((gameInfo.grade) / 10).toFixed(1) }}</span></p>
        </div>
        <p class="engine">游戏引擎：{{ gameInfo.engine }}</p>
        <p class="platform">
          <img v-if="gameInfo.android == 1" src="@/assets/img/and.png" alt="">
          <img v-if="gameInfo.ios_sign == 1 || gameInfo.ios_store == 1" src="@/assets/img/ios.png" alt="">
          <img v-if="gameInfo.pc == 1" src="@/assets/img/pc.png" alt="">
        </p>
      </div>
    </div>
  </div>
  <div class="time">
    <div class="tips">
      <span class="horn"><img src="@/assets/img/horn.png" alt="">开服计划</span>
      <span class="first">首服时间<span style="margin-left:0.1rem">{{ gameInfo.first }}</span></span>
    </div>
    <div class="bottom">
      <div class="step"><img src="@/assets/img/step.png" alt=""></div>
      <div class="date">
        <p>上午<span>{{ gameInfo.shangwu ? gameInfo.shangwu : '暂无' }}</span></p>
        <p>下午<span>{{ gameInfo.zhongwu ? gameInfo.zhongwu : '暂无' }}</span></p>
        <p>晚上<span>{{ gameInfo.wanshang ? gameInfo.wanshang : '暂无' }}</span></p>
      </div>
      <!-- <van-steps direction="vertical" :active="3" active-color="#FFA200">
          <van-step>
            <p>上午<span>{{ gameInfo.shangwu }}</span></p>
          </van-step>
          <van-step>
            <p>下午<span>{{ gameInfo.zhongwu }}</span></p>
          </van-step>
          <van-step>
            <p>晚上<span>{{ gameInfo.wanshang }}</span></p>
          </van-step>
        </van-steps> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 0.3rem;
  display: flex;

  .left {
    margin: 0 0.3rem;
    display: flex;
    align-items: center;
    // justify-content: center;
    flex-direction: column;
    color: #333333;
    font-weight: 600;

    img {
      width: 1.8rem;
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
      // margin-bottom: 0.1rem;
      margin-left: 0.1rem;
      img {
        width: 0.8rem;
        margin-left: 0.5rem;
      }
    }

    .tag {
      display: flex;
      align-items: center;
      margin: 0.1rem;
      .grade {
        position: absolute;
        right: 0.2rem;
        margin-left: 0.7rem;
        font-size: 0.3rem;
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
      margin: 0.1rem 0;
    }

    .engine {
      margin: 0.2rem;
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

.time {
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;
  .tips {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0.3rem;

    .horn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;

      img {
        width: 0.5rem;
        padding: 0.1rem;
      }
    }

    .first {
      color: #FFB400;
    }

  }

  .bottom {
    display: flex;
    align-items: center;
    margin-top: 0.3rem;

    // justify-content: center;
    .step {
      margin-left: 0.6rem;

      img {
        height: 2.5rem;
      }
    }

    .date {
      display: flex;
      flex-direction: column;
      height: 2.5rem;
      margin-left: 0.5rem;
      color: #FF9C00;
      // font-size: 0.1rem;

      span {
        margin-left: 0.2rem;
        width: 30px;
        text-align: center;
        padding: 0.05rem 0.3rem;
        border: 1px solid #FF9C00;
        border-radius: 15px;
      }

      p:nth-child(2) {
        margin-top: 0.75rem;
      }

      p:nth-child(3) {
        margin-top: 0.75rem;
      }
    }
  }
}
</style>
