export const pickerColorList = [
  { color: '#63b359', colorID: 'Color010' },
  { color: '#2c9f67', colorID: 'Color020' },
  { color: '#509fc9', colorID: 'Color030' },
  { color: '#5885cf', colorID: 'Color040' },
  { color: '#9062c0', colorID: 'Color050' },
  { color: '#d09a45', colorID: 'Color060' },
  { color: '#ee903c', colorID: 'Color070' },
  { color: '#e4b138', colorID: 'Color080' },
  { color: '#dd6549', colorID: 'Color090' },
  { color: '#cc463d', colorID: 'Color100' }
]

export const code_type_list = [
  { code: 'CODE_TYPE_TEXT', name: '文本' },
  { code: 'CODE_TYPE_BARCODE', name: '一维码' },
  { code: 'CODE_TYPE_QRCODE', name: '二维码' },
  { code: 'CODE_TYPE_ONLY_QRCODE', name: '仅显示二维码' },
  { code: 'CODE_TYPE_ONLY_BARCODE', name: '仅显示一维码' },
  { code: 'CODE_TYPE_NONE', name: '不显示任何码型' }
]

export const bindList = [
  { name: '姓名', value: '0' },
  { name: '生日', value: '1' },
  { name: '性别', value: '2' }
  // {name: '密码', value: '3'}
]

export const optionLeves = [
  { name: '默认', leves: '0' }, { name: '一级显示', leves: '1' }, { name: '二级显示', leves: '2' }, { name: '顶级显示', leves: '3' }
]

export const optionsType = [
  { label: '商品', value: '0' }, { label: '积分商品', value: '1' }, { label: '券', value: '2' }, { label: '文章', value: '3' }
]

export const optionsLabelType = [
  '全部', '门店标签', '商品标签'
]

export const stockTypeList = [
  { label: '不使用库存', value: '0' },
  { label: '使用商城库存', value: '1' },
  { label: '使用门店库存', value: '2' },
  // { label: '使用门店指定库存', value: '3' }
]

export const optionsRetreat = [  
  { label: '审核退款', value: '3' },
  { label: '不可退款', value: '2' }
]
// 推广订单
export const sharingStatus = [
  { label: '待买家支付', value: '-1' },
  { label: '买家已支付', value: '-2' },
  { label: '订单取消', value: '-3' },
  { label: '预定', value: '0' },
  { label: '生产', value: '1' },
  { label: '已送货', value: '2' },
  { label: '已提货', value: '3' },
  { label: '已退款', value: '4' }
]
export const sharingRefund =[
  { label: '订单正常', value: '1' },
  { label: '申请退款', value: '2' },
  { label: '退款成功', value: '3' },
  { label: '退款失败', value: '4' }
]
// 申请提现
export const withStatus =[
  { label: '未申请', value: '0' },
  { label: '申请返佣', value: '1' },
  { label: '处理成功', value: '2' },
  { label: '处理失败', value: '3' }
]
export const withRebated =[
  { label: '未申请', value: '0' },
  { label: '已返佣', value: '1' }
]
export const payTypeLists = [
  { label: '微卡支付', value: '1' },
  { label: '微信支付', value: '2' }
  // { label: '货到付款', value: '3' }
]

export const stateLists = [
  { label: '已取消', value: '-3' },
  { label: '待付款', value: '-1' },
  { label: '已预定', value: '0' },
  { label: '生产中', value: '1' },
  { label: '已送货', value: '2' },
  { label: '已提货', value: '3' },
  { label: '已退款', value: '4' }
]
export const stateLists1 = [
  { label: '已取消', value: '-3' },
  { label: '待付款', value: '-1' }
]
export const stateLists2 = [
  { label: '已预定', value: '0' },
  { label: '生产中', value: '1' },
  { label: '已送货', value: '2' },
  { label: '已提货', value: '3' },
  { label: '已退款', value: '4' }
]

export const TickStateList = [
  { label: '已取消', value: '-3' },
  { label: '已付款', value: '-2' },
  { label: '待付款', value: '-1' }]

export const deliveryTypeLists = [
  { label: '到店取餐', value: '1' },
  { label: '外卖配送', value: '2' }
  // { label: '物流配送', value: '3' }
]

export const refundStateTypeLists = [
  { label: '暂无申请', value: '1' },
  { label: '申请退款中', value: '2' },
  { label: '退款成功', value: '3' },
  { label: '驳回退款', value: '4' }
]
export const refundState = [
  { label: '暂无申请', value: '1' },
  { label: '申请退款中', value: '2' },
  { label: '退款成功', value: '3' },
  { label: '驳回退款', value: '4' }
]
export const integralStateList = [
  { label: '下架', value: '0' },
  { label: '上架', value: '1' },
  { label: '售罄', value: '2' }
]
// 活动类型（1秒杀活动，2爆款活动）
export const activeTypeNorms = [
  { label: '秒杀活动', value: '1' }
  // { label: '拼团活动', value: '5' }
]
// export const activeTypeNorms2 = [
//   { label: '拼团活动', value: '5' }
// ]
// 参与人员 和 卡类型
export const ConditionPerson = [
  { value: '0', label: '全部粉丝'},
  { value: '1', label: '新粉丝'}, 
  { value: '2', label: '会员'}
]

export const ConditionCard = [
  { value: '0', label: '全部'}, 
  { value: '1', label: '绑定卡'}, 
  { value: '2', label: '申请卡'}
]
export const giftType = [
  { value: '1', label: '电子券'}, 
  // { value: '2', label: '积分'},
  // { value: '3', label: '卡充值'}
]
export const DirectType = [
  { value: '0', label: '微卡卡号'}, 
  { value: '1', label: '充值订单'}, 
  { value: '2', label: '销售订单 '}, 
  { value: '3', label: '电子券订单'}, 
  { value: '4', label: '积分订单'}, 
  // { value: '5', label: '全部微卡用户'}, 
  // { value: '6', label: '全部会员'}, 
  // { value: '2', label: '积分'},
  // { value: '3', label: '卡充值'}
]
export const seckillType = [
  { value: '0', label: '未开始'}, 
  { value: '1', label: '进行中'}, 
  { value: '2', label: '已结束 '}
]
export const activeStatus = [
  { value: '0', label: '已停用'}, 
  { value: '1', label: '已启用'}
]
export const optionsWeek= [//按星期
  { value: "1", label: "星期一" },
  { value: "2", label: "星期二" },
  { value: "3", label: "星期三" },
  { value: "4", label: "星期四" },
  { value: "5", label: "星期五" },
  { value: "6", label: "星期六" },
  { value: "0", label: "星期天" }
]
export const addverStatus=[
  {value:"0",label:"关闭"},
  {value:"1",label:"开启"}
]
export const addverType=[
  {value:"0",label:"活动"},
  {value:"1",label:"商品"},
  {value:"2",label:"文章"}
]
export const commonOrder=[
  {value:"2",label:"普通订单"}
]
export const AddRebateState=[
  { label: '未申请', value: '0' },
  { label: '申请返佣', value: '1' }
]
export const ReplyKind=[
  {value:"1",label:"关键词自动回复"},
  {value:"2",label:"关注后自动回复"},
  {value:"3",label:"消息托管"},
  {value:"4",label:"小尾巴"}
]
export const NewsKind=[
  {value:"1",label:"文本"},
  {value:"2",label:"图文"},
  {value:"3",label:"图片"}
]