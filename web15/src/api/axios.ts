import axios from 'axios'
import { Notify } from 'vant'
const service = axios.create({
  timeout: 15 * 1000,
  baseURL: '/api'
})
// request拦截器
service.interceptors.request.use(
  async config => {
    const openId = localStorage.getItem('openId')
    if(config.method ==='post'){
      config.data.openId = openId
    }else{
      config.params.openId = openId
    }
    return config
  },
  error => {
    if (navigator.onLine) {
      Notify({ type: 'warning', message: '服务器繁忙，请稍后重试' })
    } else {
      Notify({ type: 'warning', message: '网络异常，请稍后重试' })
    }
    console.error('request拦截器error', error)
    return Promise.reject(error)
  }
)

// respone拦截器

service.interceptors.response.use(
  response => {
    console.log('response', response)
    if (response.status !== 200) {
      if (navigator.onLine) {
        Notify({ type: 'warning', message: '服务器繁忙，请稍后重试' })
      } else {
        Notify({ type: 'warning', message: '网络异常，请稍后重试' })
      }
      return Promise.reject(response.data)
    }
    return response
  },
  error => {
    if (navigator.onLine) {
      Notify({ type: 'warning', message: '服务器繁忙，请稍后重试' })
    } else {
      Notify({ type: 'warning', message: '网络异常，请稍后重试' })
    }
    return Promise.reject(error)
  }
)
const api = {
  async get(url: string, params: unknown) {
    try {
      let res = await service.get(url, {
        params
      })

      res = res.data
      return new Promise(resolve => {
        resolve(res)
      })
    } catch (err) {
      console.log('get出错', err)
      return Promise.reject(err)
    }
  },
  async post(url: string, params: unknown) {
    try {
      let res = await service.post(url, params)
      res = res.data
      return new Promise((resolve) => {
        resolve(res)
      })
    } catch (err) {
      console.log('post错误', err)
      return Promise.reject(err)
    }
  }
}

export {
  api
}
