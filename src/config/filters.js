// 推广订单 过滤
// 订单类型
export const orderTip = (val)=>{
     if(val === '1'){
          return '充值'
     }else if(val === '2'){
          return '销售'
     }else if(val === '3'){
          return '电子券'
     }else if(val === '4'){
          return '积分兑换'
     }else if(val === '5'){
          return '活动'
     }
}
//订单状态
export const statusTip = (val)=>{
     if(val === '-1'){
          return '待买家支付'
     }else if(val === '-2'){
          return '买家已支付'
     }else if(val === '-3'){
          return '订单取消'
     }else if(val === '0'){
          return '已预定'
     }else if(val === '1'){
          return '生产中'
     }else if(val === '2'){
          return '已送货'
     }else if(val === '3'){
          return '已提货'
     }else if(val === '4'){
          return '已退款'
     }
}
//退款状态
export const RefundTip = (val)=>{
     if (val === '1') {
          return '订单正常'
     } else if (val === '2') {
          return '申请退款'
     } else if (val === '3') {
          return '退款成功'
     } else if (val === '4') {
          return '退款失败'
     }
}
//支付类型
export const PayTypeTip = (val)=>{
     if (val === '1') {
          return '微卡支付'
     } else if (val === '2') {
          return '微信支付'
     } else if (val === '3') {
          return '货到付款'
     }
}
// 申请提现过滤
// 返佣状态
export const servantStaus = (val) => {
     if (val === '0') {
          return '未申请'
     } else if (val === '1') {
          return '申请返佣'
     } else if (val === '2') {
          return '处理成功'
     } else if (val === '3') {
          return '处理失败'
     } else {
          return value
     }
}
// 是否返佣
export const IsRebateTip = (val) => {
     if (val === '0') {
          return '未返佣'
     } else if (val === '1') {
          return '已返佣'
     }
}

export const filterArea = val => {
     let AreaList = JSON.parse(localStorage.getItem("AllAreaList"));
     if (AreaList) {
       for (const item of AreaList) {
         if (val == item.SID) {
           var name = item.Name;
         }
       }
       return name;
     } else {
       return;
     }
   };
   