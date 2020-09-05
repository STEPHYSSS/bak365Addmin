const getters = {
  siderbar_routers:state => state.permission.siderbar_routers,
  addRouters: state => state.permission.addRouters,
  controlNavClick: state => state.storeData.controlNavClick,
  AppNo: state => state.user.AppNo,
  AreaNo: state => state.user.AreaNo,
  AreaList: state => state.user.AreaList,
  userName:state => state.user.userName
}

export default getters
