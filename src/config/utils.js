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
  { name: '一级显示', leves: '1' }, { name: '二级显示', leves: '2' }, { name: '顶级显示', leves: '3' }
]

export const optionsType = [
  { label: '商品', value: '0' }, { label: '券', value: '1' }, { label: '文章', value: '2' }
]

export const optionsLabelType = [
  '全部', '门店标签', '商品标签'
]

export const stockTypeList = [
  { label: '不使用库存', value: '0' },
  { label: '使用微信库存', value: '1' },
  { label: '使用门店库存', value: '2' },
  { label: '使用门店指定库存', value: '3' }
]

export const optionsRetreat = [
  { label: '直接退款', value: '1' },
  { label: '不可退款', value: '2' },
  { label: '审核退款', value: '3' }
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
  { label: '已作废', value: '4' }
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
  { label: '微信支付', value: '2' },
  { label: '货到付款', value: '3' }
]

export const stateLists = [
  { label: '已取消', value: '-3' },
  { label: '待付款', value: '-1' },
  { label: '已付款', value: '0' },
  { label: '生产中', value: '1' },
  { label: '已送货', value: '2' },
  { label: '已提货', value: '3' },
  { label: '已作废', value: '4' }
]
export const deliveryTypeLists = [
  { label: '到店取餐', value: '1' },
  { label: '外卖配送', value: '2' },
  { label: '物流配送', value: '3' }
]

export const refundStateTypeLists = [
  { label: '订单正常', value: '1' },
  { label: '申请退款中', value: '2' },
  { label: '退款成功', value: '3' },
  { label: '退款失败', value: '4' }
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
export const activeTypeNorms2 = [
  { label: '拼团活动', value: '5' }
]