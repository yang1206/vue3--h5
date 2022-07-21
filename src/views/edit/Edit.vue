<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog } from 'vant';
import { getKey,SetInfo } from '@/api/home'
//ws上传文件封装
import subFile from '@/utils/fileUpload'


const uploadFile = ref(null)
const nickname = ref()

//WebSocket需要的key
const key = ref()

const avatar = ref(localStorage.getItem('avatar') || '')

const upload = (event) => {
  const file = event.target.files[0]
  console.log(file);

  const type = file.name.split('.')[file.name.split('.').length - 1]
  let url = ''
  url = `ws://houtaixin.17wanba.org/upload/FileUpload?fileType=${type}&allowKey=${key.value}`
  subFile(file, url, getMst)
}

const getMst = (obj?) => {

  let { ret, linear, url } = obj
  if (ret == 1) {
    avatar.value = url
    localStorage.setItem('avatar', url)
    // document.getElementById('files').value = ''
  }
  console.log(linear)
}
const click = () => {
  getKey().then((res) => {
    key.value = res.data
    const time = setTimeout(() => {
      uploadFile.value.click()
      clearInterval(time)
    }, 1)
  })
}

const editInfo = ()=>{
  SetInfo({ avatar: avatar.value, nickname: nickname.value }).then((res)=>{
    localStorage.setItem('nickname', res.data.nickname)
    localStorage.setItem('avatar', res.data.avatar)
    localStorage.setItem('mobile', res.data.mobile)
    Dialog({ message: '修改成功！' });
  })
}
</script>

<template>
  <div>
    <CustomHeader title="修改信息" />
    <div class="content">
      <div class="avatar">
        <div class="img">
          <van-image round width="3rem" height="3rem" :src="avatar" @click="click" />
          <input type="file" id="files" ref="uploadFile" style="display: none" accept="image/*" @change="upload" />
        </div>
        <p class="tips">点击修改头像</p>
      </div>
      <div class="form">
        <p>请输入新昵称</p>
        <van-field v-model="nickname" placeholder="请输入" :clickable="true" label="" />
      </div>
      <div class="btn">
        <van-button type="primary" @click="editInfo" color="linear-gradient(to right,#FF512D , #FFA339)" round>保存修改</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .avatar {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 3rem;
    }

    .tips {
      font-size: 0.4rem;
      color: #FF5D65;
      margin-top: 0.3rem;
    }
  }
  .form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    // align-items: center;
    p {
      margin-left: 0.4rem;
      color: #666666;
    }
  }

  .btn {
    margin-top: 1rem;
  }
}
</style>
