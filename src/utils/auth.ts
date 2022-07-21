import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 登录时设置时间
export const setTokenTime = () => {
  const date = Date.now()
  localStorage.setItem(TOKEN_TIME,date)
}

// 获取
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

// 是否已经过期
export const diffTokenTime = ():boolean => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  return (currentTime - tokenTime) > TOKEN_TIME_VALUE
}
