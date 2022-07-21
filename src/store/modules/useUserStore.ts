import { defineStore } from 'pinia'
import { Login as loginApi } from '@/api/home'
import { getTokenTime, setTokenTime } from '@/utils/auth'
import router from '@/router'
export const useUserStore = defineStore('user',
  {
    state: () => ({
      token: localStorage.getItem('token') || '',
      aid:localStorage.getItem('token') || ''
    }),
    getters: {
      getToken(state) { return state.token },
      getAid(state){return state.aid}
    },
    actions: {
      setToken(token) {
        this.token = token
        localStorage.setItem('token', token)
      },
      login(userInfo) {
        return new Promise((resolve, reject) => {
          loginApi(userInfo).then(res => {
            let token = res.data.mobile + '-' + res.data.token
            this.setToken(token)
            localStorage.setItem('nickname',res.data.nickname)
            localStorage.setItem('avatar', res.data.avatar)
            localStorage.setItem('mobile', res.data.mobile)
            let data = JSON.stringify(res.data)
            localStorage.setItem('info',data)
            setTokenTime()
            router.replace('/user')
          }).catch(err => reject(err))
        })
      },

      logout() {
        this.setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenTime')
        router.replace('/login')
      },
      SetAid(id: string){
        this.aid = id
        localStorage.setItem('aid', id)
      }
    }
  }
)
