import { useRouter } from 'vue-router'
const router = useRouter()
export default function useToUrl() {
  const toCustomer = () => {
    location.href = 'http://kf.yqwb.com/zhaosf.html'
  }
  const toRoute = (url: string) => {
    router.push({
      path: `/${url}`,
    })
  }
  return { toCustomer, toRoute }
}