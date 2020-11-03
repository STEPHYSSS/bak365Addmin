import axios from 'axios';
import vue from 'vue';
import Cookies from 'js-cookie';
import store from '../store'

axios.defaults.withCredentials = false
axios.defaults.timeout = 50000
axios.defaults.baseURL = process.env.BASE_URL

// request拦截器
axios.interceptors.request.use(config => {
  let AppNo = store.getters.AppNo ? store.getters.AppNo : config.data.AppNo
  let ViewKay = config.data.ViewKay
  let UserMAC = Cookies.get('UserMAC')
  let url = config.url + '?AppNo=' + AppNo + '&ViewKay=' + ViewKay + '&UserMAC=' + UserMAC
  config.url = url
  // config
  // console.log(config, 'config')
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
axios.interceptors.response.use(
  response => {
    let success = response.data.Success
    let isTip = response.data.hasOwnProperty('Success')
    if (isTip) {
      if (success) {
        return response.data
      } else {
        return Promise.reject(response.data.Message || '操作失败')
      }
    } else {
      return response.data
    }
  },
  error => {
    // alert(error)
    if (axios.isCancel(error)) {
      console.log('请求被取消了')
    }
    // console.log(error.search('Error:') ,55)
    let errors = ''
    if (error.toString().search('TypeError') || error.toString().search('500')) {
      errors = '获取请求失败'
    } else {
      errors = error
    }
    return Promise.reject(errors);
  }
)

export default axios;
