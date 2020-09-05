const storeData = {
  state:{
    // 控制当在获取数据的时候，不让点击
    controlNavClick:false
  },
  mutations: {
    SET_NAVCLICK:(state, bool)=>{
      state.controlNavClick = bool
    }
  },
  actions:{
    setControlNavClick({commit},data){
      commit('SET_NAVCLICK',data)
    }
  }
}

export default storeData
