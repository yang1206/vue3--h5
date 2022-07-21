<script lang="ts" setup>
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { Dialog } from 'vant';
import { SendCode } from '@/api/home'
import { useUserStore } from '@/store';

const useUser = useUserStore()
const loginForm = ref({
  mobile: '',
  code: ''
})
const checked = ref(true)
const timer = ref(0)
const { pause, resume } = useIntervalFn(() => {
  if (timer.value <= 0) {
    pause()
  } else {
    timer.value -= 1
  }
}, 1000, {
  immediate: false,
  immediateCallback: false
})
const sendCode = () => {
  if (loginForm.value.mobile !== '') {
    if (timer.value === 0) {
      timer.value = 60
      resume()
    } else {
      return
    }
    SendCode({ mobile: loginForm.value.mobile }).then((res) => {

    })
  } else {
    Dialog({ message: '请先输入手机号' });
  }
}
const loginHandler = () => {
  if (checked.value == true) {
    useUser.login(loginForm.value)
  }else{
    Dialog({ message: '请先阅读并同意协议再进行注册登录' });
  }
}
</script>

<template>
  <div>
    <CustomHeader />
    <div class="content">
      <div class="logo">
        <img src="@/assets/img/login.png" alt="">
      </div>
      <div class="from">
        <van-cell-group inset>
          <van-field v-model="loginForm.mobile" size="large" left-icon="phone-o" type="tel" placeholder="请输入手机号" />
          <van-field v-model="loginForm.code" size="large" left-icon="passed" type="number" center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button size="normal" color="#FF9837" type="primary" @click="sendCode">{{ timer === 0 ? '发送验证码' :
                `${timer}秒后发送`
                }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div style="width:65vw;margin-top: 10vh;">
        <van-button @click="loginHandler" type="primary" color="linear-gradient(to right,#FF512D , #FFA339)" round
          block>登录</van-button>
      </div>
      <div class="agreement">
        <p style="display:flex">
          <van-checkbox v-model="checked" checked-color="#FF9837" icon-size="10px" />
          <span style="margin-left:3px">注册登录即代表同意<a href="https://t.yqwb.com/article/13">《用户协议》</a>和<a
              href="https://t.yqwb.com/article/12">《隐私协议》</a></span>
        </p>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.agreement {
  position: absolute;
  text-align: center;
  bottom: 1rem;

  a {
    color: #000;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    img {
      width: 80px;
    }
  }
}
</style>
