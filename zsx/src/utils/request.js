import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
import { removeToken, removedm, removename } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})
// var token = getToken()
// request拦截器
service.interceptors.request.use(

  config => {
    // console.log(config.data)
    if (config.data !== '') {
      config.data = config.data // + '&web_user_token=' //+ `${token}`
    } else {
      config.data = 'web_user_token=' // + `${token}`
    }

    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== '10000') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 1 * 1000
      })
      // debugger
      if (res.code === '40002') {
        removeToken()
        removedm()
        removename()
        location.reload()
        this.$router.push({ path: '/login' })
      }
      // return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 1 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
