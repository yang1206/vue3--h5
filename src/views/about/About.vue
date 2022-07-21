<script  lang="ts">
export default {
  name: "About"
}
</script>
<template>
  <div>
    <CustomHeader title="关于我们" />
    <div class="logo">
      <img src="@/assets/img/login.png" alt="">
    </div>
    <div class="bottom">
      <p class="xieyi">
        <a href="">《用户协议》</a>|<a href="">《隐私协议》</a>
      </p>
      <p>著作权人：xxxxxxxxxxxx</p>
      <p>著作权号：xxxxxxxxxxxxxx</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>



.logo{
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 2rem;
  }
}
.bottom{
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom:1rem;
  display:flex;
  flex-direction: column;
  align-items: center;
  .xieyi{
    color: #FECE55;
  }
  p{
    margin: 0.1rem;
  }
}
</style>
