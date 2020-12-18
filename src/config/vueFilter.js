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
               return '已作废';
          default: '已作废'
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
               return '已作废';
          default: '已作废'
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
          return process.env.BASE_URL + val; 
     } else {
          return '';
     }
})
