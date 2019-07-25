/**
 * Created by zhangyupeng on 18/12/5.
 */
import axios from 'axios'
import Config from '@/config'
import qs from 'qs'

axios.defaults.timeout = 10000 // 请求超时
axios.defaults.baseURL = '//zxxb.haibian.com/admin' // 公用url

// 根据自己具体逻辑实现
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

// 公用请求头
const baseHeaders = {
  'Authorization': 'Bearer ' + getToken()
}

export default {
  /***
   * GET 请求
   * @param url
   * @param responseType : 'json', 'text', 'file'
   */
  get (url, responseType = 'json') {
    return axios({
      method: 'get',
      url: url,
      headers: baseHeaders,
      responseType: responseType
    })
      .then(checkStatus)
      .then(checkCode)
  },
  /***
   * POST 请求
   * @param url // url地址
   * @param data // 参数
   * @param responseType : 'json', 'text', 'file'
   */
  post (url, data, responseType = 'json') {
    // 解决php后台无法读取收据
    for (const i in data) {
      if (data.hasOwnProperty(i) && typeof data[i] !== 'function') {
        if (typeof (data[i]) === 'object') {
          data[i] = JSON.stringify(data[i])
        }
      }
    }
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      responseType: responseType,
      headers: Object.assign({}, baseHeaders)
    })
      .then(checkStatus)
      .then(checkCode)
  }
}

/**
 * 返回json数据
 * @param response
 * @returns {*}
 */
function checkStatus (response) {
  // 检查状态码
  if (response && response.status >= 200 && response.status < 400) {
    return response
  }
  return {// 网络错误,可以弹出一个错误提示，告诉用户
    code: Config.ERROR_CODE,
    msg: '贴合项目进行错误提示'
  }
}

function checkCode (res) {
  // 根据自己具体逻辑做处理。
  return res
  // if (res.code === 4012) {
  //   router.app.$message({
  //     message: res.msg,
  //     type: 'warning'
  //   })
  //   router.app.$router.replace('/login')
  // } else {
  //   return res
  // }
}

// 获取token
function getToken () {
  return localStorage.getItem('token') ? localStorage.getItem('token') : ''
}
