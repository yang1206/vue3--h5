import axios from 'axios'
import { Dialog } from 'vant';
import { diffTokenTime } from '@/utils/auth.js'
import { useUserStore } from '@/store/index'

const service = axios.create({
    // baseURL: 'http://fatest.hzbaoliandeng.com',
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 5000,
    headers: { 'Content-Type': 'multipart/form-data' },
})


const setData = (obj) => {
    let formData = new FormData()
    for (let key in obj) {
        formData.append(key, obj[key])
    }
    return formData
}

//（业务代码，通常不需要这样）从域名取agentCode，agentCode是请求必填参数
const aid = location.search?.split("?")[1] || ''
const id = aid.split('=')[1]
console.log(id);

if (aid !== '') {
    if (aid.split('=')[0] == 'id') {
        // const userStore = useUserStore()
        // 取到后存入localStorage
        // userStore.SetAid(id)
        localStorage.setItem('aid', id)
    }
}


service.interceptors.request.use(

    (config) => {
        //查找有没有token
        if (localStorage.getItem('token')) {
            //token有没有过期
            if (diffTokenTime()) {
                //过期后注销登录
                const userStore = useUserStore()
                userStore.logout()
                return Promise.reject(new Error('token 失效了'))
            }
        }
        config.data = {
            ...config.data,
            "baoCode": '0c82787733b64ed5',
            // "baoCode":'000b06cd24745b01',
            "imei": '',
            "agentCode": localStorage.getItem('aid')

        }
        // console.log(userStore.token);
        // const token = localStorage.getItem('token')
        // token && (config.headers.token = token)
        config.data = setData(config.data)
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

service.interceptors.response.use(
    (response) => {
        const { data, msg, ret } = response.data
        if (ret == 200 || ret == 201 || ret == 0) {
            return response.data
        } else if (ret == 886) {
            //token失效，注销登录
            const userStore = useUserStore()
            userStore.logout()
            Dialog({ message: '请重新登录' });

            return Promise.reject(new Error(msg))
        } else {
            Dialog({ message: msg });
            return Promise.reject(new Error(msg))
        }
    },
    (error) => {
        console.log(error.response)
        error.response
        return Promise.reject(new Error(error.response.data))
    }
)
export default service
