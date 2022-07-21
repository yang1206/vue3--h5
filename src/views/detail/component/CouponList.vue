<script lang="ts"  setup>
import { ref, defineProps, PropType } from 'vue';
import { Dialog } from 'vant';
import { ReceiveCoupon } from '@/api/home'
interface ICoupon {
  id: number,
  minus: number,
  name: string,
  reach: number,
  time_limit: number
}
const props = defineProps({
  couponList: {
    type: Array as PropType<ICoupon[]>
  },
  gameInfo: {
    type: Object
  },
})



const show = ref(false)
const coupon = ref()
const username = ref()
const getCoupon = (i) => {
  coupon.value = i
  show.value = true
}

const GetReceiveCoupon = () => {
  if (localStorage.getItem('token')) {
    ReceiveCoupon({
      coupon_id: coupon.value.id,
      username: username.value,
      userToken: localStorage.getItem('token')
    }).then(res => {
      Dialog({ message: '领取成功' })
      show.value = false
    })
  } else {
    Dialog({ message: '请先登录后再领取' })
  }
}
</script>

<template>
  <div>
    <div class="coupon">
      <div id="item" v-for="i in props.couponList" :key="i.id">
        <div class="left">
          <div class="icon">
            <img :src="gameInfo.icon" alt="">
          </div>
          <!-- <div class="money">
            <span class="num">
              ￥{{ (i.minus) / 100 }}
            </span>
            <span class="reach">
              满{{ (i.reach) / 100 }}元可用
            </span>
          </div> -->
          <div class="date">
            <p class="cname">{{ i.name }}</p>
            <p>领取后{{ i.time_limit }}天有效</p>
          </div>
        </div>
        <div class="right">
          <van-button class="btn" round size="small" color="#FA6603" @click="getCoupon(i)">领取</van-button>
        </div>
      </div>
    </div>
    <van-action-sheet v-model:show="show" title="领取">
      <div class="content">
        <div class="item">
          <span class="label">
            优惠券
          </span>
          <div class="left">
            <div class="money">
              <span class="num">
                ￥{{ (coupon.reach - coupon.minus) / 100 }}
              </span>
              <span class="rcoupon.minus - each">
                满{{ (coupon.reach) / 100 }}元可用
              </span>
            </div>
            <div class="date" style="line-height:0.5rem">
              <p style="font-weight: 600;">{{ gameInfo.gameName }}</p>
              <p>领取后{{ coupon.time_limit }}天有效</p>
            </div>
          </div>
        </div>
        <div class="item">
          <span class="label">
            游戏账号
          </span>
          <div class="ipt">
            <input type="text" v-model="username" placeholder="请输入游戏账号">
          </div>
        </div>

      </div>
      <div id="btn">
        <van-button style="width:120px; border-radius: 5px; font-size: 0.4rem;" size="normal" color="#FA6603"
          @click="GetReceiveCoupon">立即申请
        </van-button>
      </div>
      <p id="tips">温馨提示：当申请成功后进入游戏，在游戏中充值时选择使用优惠券来支付即可</p>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>


.coupon {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  #item {
    padding: 0.3rem;
    margin: 0.3rem 0;
    border: 1px solid #e5bb9f;
    border-radius: 0.1rem;
    box-shadow: 0.1px 0.1px 0.1px #FB6600;
    width: 90%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .icon {
        img{
          width: 1.2rem;
          margin-right: 0.1rem;
        }
      }

      .money {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #FB6600;
        margin: 0.1rem;

        .num {
          font-size: 0.5rem;
        }

        .reach {
          // font-size: 0.1rem;
        }
      }

      .date {
        line-height: 0.5rem;
        .cname {
          font-size: 0.4rem;
        }

        p {
          margin: 0.1rem;
        }

        p:nth-child(2) {
          color: #666666;
          // font-size: 0.1rem;
        }
      }
    }

    .right {
      .btn {
        width: 1.6rem;
        font-size: 0.3rem;
      }
    }
  }
}

.content {
  margin: 0 0.2rem;
  .item {
    display: flex;
    margin: 1rem;
    align-items: center;
    // justify-content: space-;
    justify-content: space-evenly;

    .left {
      width: 80%;
      padding: 0.1rem;
      display: flex;
      align-items: center;
      background: url('@/assets/img/pay.png') no-repeat;
      background-size: 100% 100%;

      .money {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #FB6600;
        margin: 0.1rem;

        .num {
          font-size: 0.5rem;
        }

        .reach {
          // font-size: 0.1rem;
        }
      }

      .date {
        p {
          margin: 0.1rem;
        }

        p:nth-child(2) {
          color: #666666;
          // font-size: 0.1rem;
        }
      }
    }

    .ipt {
      width: 80%;
      line-height: 0.5rem;

      input {
        width: 80%;
        border: 1px solid #666666;
        border-radius: 0.1rem;
        outline: none;
        padding: 0.1rem;
      }
    }
  }
}

#btn {
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tips {
  width: 70%;
  text-align: center;
  margin: 1rem auto;
  color: #666666;
}
</style>
