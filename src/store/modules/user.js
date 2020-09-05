import {signIn, getInfo} from '@/api/user';
import Cookies from 'js-cookie';
import store from "../index";
import storejs from 'storejs'

import {GetQueryString} from '@/config/publicFunction'

// AppNo和UserMAC存在了 cookie里面
// 其他页面通用的变量存 localStorage 里面了

const user = {
  state: {
    // 商户编号
    AppNo: Cookies.get('AppNo'),
    // 当前地区
    AreaNo: storejs.get('AreaNo'),
    // 当前地区列表
    AreaList: storejs.get('AreaList'),
    // 用户名称
    userName: storejs.get('userName')
  },
  mutations: {
    SET_TOKEN: (state, AppNo, AppNoId) => {
      state.AppNo = AppNo
      setCookie(AppNo,'AppNo')
    },
    SET_AREA: (state, AreaNo) => {
      state.AreaNo = AreaNo
      setStore(AreaNo,'AreaNo')
    },
    GET_AREALIST: (state, AreaList) => {
      state.AreaList = AreaList
      setStore(AreaList,'AreaList')
    },
    SET_USERNAME: (state, name) => {
      state.userName = name
      setStore(name,'userName')
    }
  },
  actions: {
    // 登录
    LoginBy({commit}, userInfo) {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await signIn(userInfo.UserName, userInfo.PassWord, userInfo.AppNo)
          const data = response.Data
          // 获取地区列表
          store.dispatch('getArea')

          Cookies.set('UserMAC', data.UserMAC)

          // 登录获取信息成功 保存AppNo 参数
          commit('SET_TOKEN', userInfo.AppNo)
          commit('SET_USERNAME', data.UserName)

          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },
    set_AppNo({commit}, AppNo) {
      // 改变AppNo
      commit('SET_TOKEN', AppNo)
    },
    // 获取地区列表
    getArea({commit}) {
      return new Promise((resolve, reject) => {
        try {
          let AreaLists = [{AreaNo: 'wuhan', AreaName: '武汉'}]

          commit('SET_AREA', AreaLists[0])
          commit('GET_AREALIST', AreaLists)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },
    setArea({commit}, AreaNo) {
      commit('SET_AREA', AreaNo)
    },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {

        commit('SET_TOKEN', '');
        commit('SET_AREA', '');
        commit('GET_AREALIST', '')
        commit('SET_USERNAME', '')

        // Cookies.remove('currentTime')
        Cookies.remove('UserMAC')
        resolve();
      });
    },
  }
}

/**
 * 有值的时候设置，没有的时候清除cookie
 * @param val
 * @param str
 */
function setCookie(val, str) {
  if (!val) {
    Cookies.remove(str)
  } else {
    Cookies.set(str, val)
  }
}
/**
 * 有值的时候设置，没有的时候清除store
 * @param val
 * @param str
 */
function setStore(val, str) {
  if (!val) {
    storejs.remove(str)
  } else {
    storejs.set(str, val)
  }
}

export default user
