//公共数据
export const route = {
    login: '/login'
}
export const TOKEN = 'token'

// http://localhost:8080/wechatCard/vip/list
// 当前的http
export const HeardUrl = window.location.protocol + '//' + window.location.host + '/WebApp/Mobile/index.html#/'
    // export const HeardUrl = window.location.protocol + '//' + window.location.host+'/WeixinNew/Dist/index.html#/'//测试环境
// export const PhoneUrl = 'http://dingtalk.bak365.cn/WeixinNew/Dist/#/' //测试环境
export const defaultImg = ''

export const Key = 'IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT'

export const PhoneUrlGood = HeardUrl + 'pages/shoppingMall/list/infoGood'

export const integralUrlGood = HeardUrl + 'pages/shoppingMall/list/infoGood'

export const activeUrlGood = HeardUrl + 'pages/shoppingMall/list/infoGood'
export const seckill = HeardUrl + 'pages/shoppingMall/seckill/index' //秒杀首页
    // export const autoHome = HeardUrl + 'pages/shoppingMall/index'//自定义首页
export const autoHome = HeardUrl //自定义首页
export const autoLinkIndex = HeardUrl + 'pages/shoppingMall/autoLinkIndex/autoLinkIndex' //自定义页面
export const scanCoupon = HeardUrl + 'pages/scanCoupons/scanCoupons' //扫码领券