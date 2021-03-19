import Vue from 'vue'

Vue.filter('orderState', (num) => {
     if (num === '') {
          return '--'
     }
     num = Number(num)
     switch (num) {
          case -3:
               return '已取消';
          case -1:
               return '待付款';
          case 0:
               return '已付款';
          case 1:
               return '生产中';
          case 2:
               return '已送货';
          case 3:
               return '已提货';
          case 4:
               return '已退款';
          default: '已退款'
     }
})
Vue.filter('orderState', (num) => {
     if (num === '') {
          return '--'
     }
     num = Number(num)
     switch (num) {
          case -3:
               return '已取消';
          case -1:
               return '待付款';
          case 0:
               return '已付款';
          case 1:
               return '生产中';
          case 2:
               return '已送货';
          case 3:
               return '已提货';
          case 4:
               return '已退款';
          default: '已退款'
     }
})
Vue.filter('orderRefund', (num) => {
     if (num === '') {
          return '--'
     }
     num = Number(num)
     switch (num) {
          case 2:
               return '申请退款中';
          case 3:
               return '退款成功';
          case 4:
               return '退款失败';
     }
})
Vue.filter('TickOrderState', (num) => {
     if (num === '') {
          return '--'
     }
     num = Number(num)
     switch (num) {
          case -3:
               return '已取消';
          case -1:
               return '待付款';
          case -2:
               return '已付款';
     }
})
Vue.filter('refundStateList', (num) => {
     if (num === '') {
          return '--'
     }
     num = Number(num)
     switch (num) {
          case 1:
               return '订单正常';
          case 2:
               return '申请退款';
          case 3:
               return '退款成功';
          case 4:
               return '退款失败';
     }
})

Vue.filter('deliveryType', (val) => {
     let num = Number(val)
     if (num) {
          return num === 1 ? '到店取餐' : num === 2 ? '外卖配送' : '物流配送'
     } else {
          return ''
     }
})
Vue.filter('payType', (val) => {
     if (!val) {
          return ''
     }
     let num = Number(val)
     if(num===1){
		return '微卡支付'
	}else if(num===2){
		return '微信支付'
	}else if(num===3){
		return '货到付款'
	}else if(num===4){
		return '券支付'
	}else{
		return ''
	}
})

Vue.filter('setImgPrex', (val) => {
     if (val) {
          // return process.env.BASE_URL + val; /* process.env.Prefix */
          return process.env.Prefix + val
     } else {
          return ''
          // return process.env.BASE_URL + val;
     }
     /* {
       return process.env.Prefix + val
  } else {
       return ''
  } */
})
Vue.filter('SetImage',(val) => {     
     if (val) {
     //      if(window.location.hostname == "localhost" ){
     //           return 'http://dingtalk.bak365.cn/WeixinNew/'+ val;
     //   }else if( window.location.hostname == "dingtalk.bak365.cn" ){
     //      return 'http://dingtalk.bak365.cn/WeixinNew/'+ val;
     //   }else{
     //      return 'http://'+window.location.hostname+'/WebApp/'+ val;
     //   }
          return process.env.BASE_URL + val; 
     } else {
          return '';
     }
})
Vue.filter('filterImg',(val) => {     
     if (val) {
          if(window.location.hostname == "localhost" ){
               return 'http://wx8d4708e1e9895e87.manage.bak365.cn/WebApp'+ val;
          }else if( window.location.hostname == "wx8d4708e1e9895e87.manage.bak365.cn" ){
               return 'http://wx8d4708e1e9895e87.manage.bak365.cn/WebApp'+ val;
          }else{
               return 'http://'+window.location.hostname+'/WebApp/'+ val;
          }
     } else {
          return '';
     }
})
Vue.filter('PromType',(val)=>{
     if(val){
          if(val==='0'){
               return '用户关注'
          }else if(val==='1'){
               return '用户申请卡'
          }else if(val==='2'){
               return '用户绑定卡'
          }else if(val==='3'){
               return '用户评价'
          }
     }else{
          return ''
     }
})
Vue.filter('setActiveStatus',(val)=>{//是否审核
     if(val){
          if (val === "1") {
               return "已审核";
          } else return "未审核";
     }else{
          return ''
     }
})
Vue.filter('setActiveOpen',(val)=>{//是否启用
     if(val){
          if (val === "1") {
               return "已启用";
          } else {
               return "已停用";
          }
     }else{
          return ''
     }
})
Vue.filter('startTips',(val)=>{
     if (val === "0") {
      return "开启";
    } else {
      return "关闭";
    }
  })
