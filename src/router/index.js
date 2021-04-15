import { route } from "../config/index"
// 主页面
import Full from '@/containers/Full'

const Login = r => require.ensure([], () => r(require('../view/user/login')), 'login')
const Statistic = r => require.ensure([], () => r(require('../view/statistic/list')), 'statistic')
const Page404 = r => require.ensure([], () => r(require('../view/errorPages/Page404')), 'Page404')
const Page500 = r => require.ensure([], () => r(require('../view/errorPages/Page500')), 'Page500')

//商城管理、// 商品管理
const goodsManager = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager')), 'goodsManager')
const goodsManagerAdd = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/addEdit')), 'addEdit')
const couponManagerAdd = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/addEditCoupon')), 'addEditCoupon')
const userEvaluate = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/evaluate/userEvaluate')), 'userEvaluate')
const userEvaluateInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/evaluate/evaluateInfo')), 'userEvaluateInfo')
const tasteList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/taste/index')), 'tasteList') //标签、配件
const newTaste = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/taste/tasteList')), 'newTaste')
const menuBar = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/menuBar')), 'menuBar') //自定义菜单设置
const areaList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/area/list')), 'areaList')
const systemSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet')), 'systemSet')
const logisticsSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/logisticsSet')), 'logisticsSet')
// 统计页面 src\view\weChatManager\Statistics
const Statistics = r => require.ensure([], () => r(require('../view/weChatManager/Statistics')), 'Statistics')
// 商品修改商品
const batchModification = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/batchModification')), 'batchModification')
// 电子券设置
const addTiket = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/addTiket')), 'addTiket')
    // 轮播图设置
const lunboManager = r => require.ensure([], () => r(require('../view/weChatManager/lunboManager/lunboList')), 'lunboList')
const mainStyle = r => require.ensure([], () => r(require('../view/weChatManager/mainStyle/index')), 'index')//主题颜色设置

    // 门店管理
const storeSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeSet')), 'storeSet')
const storeInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeSet/addEdit')), 'storeInfo')
const storeAreaSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeAreaSet/index')), 'storeAreaSet')
    // 订单管理
const orderList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList')), 'orderList')
const TiketIndex = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/TiketIndex')), 'TiketIndex')
const wellFuIndex = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/wellFuIndex')), 'wellFuIndex')
const orderInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/orderInfo')), 'orderInfo')
const refundSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/refund')), 'refundSet')

//订单退款管理
const orderRefund = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/RefundManage/orderRefund')), 'orderRefund')
const ticketRefund = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/RefundManage/ticketRefund')), 'ticketRefund')
const wellFuRefund = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/RefundManage/wellFuRefund')), 'wellFuRefund')
    // 积分商城管理
const integralGoods = r => require.ensure([], () => r(require('../view/weChatManager/integralManager/index')), 'integralManager')
const integralGoodsAdd = r => require.ensure([], () => r(require('../view/weChatManager/integralManager/addEdit/index')), 'integralGoodsAdd')

// 商品活动管理
// activityGoods 秒杀商品活动  groupGoods 拼团商品活动 entStoreCoupon 进店送券
const activityGoods = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/index')), 'activityGoods')
const activityGoodsAdd = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/addEdit')), 'activityGoodsAdd')
const groupGoods = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/groupIndex')), 'groupGoods')
const groupActivityAdd = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/groupActivities')), 'groupActivityAdd')
// index2
const groupActivityAdd2 = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/groupActivities/index2')), 'groupActivityAdd2')
const entStoreCoupon = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/entStoreCoupon/entStoreCouponList')), 'entStoreCoupon') //进店送券
const entCouponAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/entStoreCoupon/entCouponAddEdit')), 'entCouponAddEdit') //进店送券编辑和新增
// 扫码领券
const scanCouponList = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/scanCoupon/scanCouponList')), 'scanCouponList') //进店送券
const scanCouponAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/scanCoupon/scanCouponAddEdit')), 'scanCouponAddEdit') //进店送券编辑和新增

const ConditionsList = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/ConditionSetting/ConditionsList')), 'ConditionsList') //参与条件设置
const ConditionsAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/ConditionSetting/ConditionsAddEdit')), 'ConditionsAddEdit') //参与条件设置新增与编辑
const directCouponList = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/DirectCoupon/directCouponList')), 'directCouponList') //直接送券
const directCouponAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/DirectCoupon/directCouponAddEdit')), 'directCouponAddEdit') //直接送券新增与编辑
const satisfyList = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/satisfy')), 'satisfyList') //满足赠送
const satisfyAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/satisfy/addEdit')), 'satisfyAddEdit') //满足赠送新增编辑
const Act_SuctionPowder = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/Act_SuctionPowderSet')), 'Act_SuctionPowder') //全民吸粉
const Act_addEdit = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/Act_SuctionPowderSet/addEdit')), 'Act_addEdit') //全民吸粉新增编辑
const Act_Statistics = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/Act_SuctionPowderSet/Act_Statistics')), 'Act_Statistics') //全民吸粉统计与详情
    // 自定义页面管理
const customPage = r => require.ensure([], () => r(require('../view/weChatManager/customManager/homeIndex')), 'customPage') //自定义首页
const customPageAdd = r => require.ensure([], () => r(require('../view/weChatManager/customManager/addEdit')), 'customPageAdd') //自定义首页编辑
const customAutoPage = r => require.ensure([], () => r(require('../view/weChatManager/customManager/autoIndex')), 'customAutoPage') //自定义页面
const autoAddEdit = r => require.ensure([], () => r(require('../view/weChatManager/customManager/autoAddEdit')), 'autoAddEdit') //自定义页面编辑
const autoHomeUrl = r => require.ensure([], () => r(require('../view/weChatManager/customManager/autoHomeUrl')), 'autoHomeUrl') //商城链接
const activedUrl = r => require.ensure([], () => r(require('../view/weChatManager/customManager/activedUrl')), 'activedUrl') //活动链接
    // 营销管理
// const markingPage = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/index')), 'markingPage')
// const orderSharing = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/orderSharingList')), 'orderSharingList')
// const commissionWithdrawal = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/commissionDetail')), 'commissionDetail')
// const applicationWithdrawal = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/withdrawal')), 'applicationWithdrawal')
const footPrintList = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/memberFootPrint')), 'footPrintList')

//分销管理
const markingPage = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/index')), 'markingPage')
const orderSharing = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/orderSharingList')), 'orderSharingList')
const commissionWithdrawal = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/commissionDetail')), 'commissionDetail')
const applicationWithdrawal = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/withdrawal')), 'applicationWithdrawal')
const tzList = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/tuanzhangList')), 'tzList')
const checkFanslist = r => require.ensure([], () => r(require('../view/weChatManager/retailManager/tuanzhangLieBiao')), 'tuanzhangLieBiao')
    // 会员列表管理
const menmberShipList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/Membership/membershipList')), 'menmberShipList')
const customerService = r => require.ensure([], () => r(require('../view/weChatManager/customerService')), 'customerService')
const customerServiceUrl = r => require.ensure([], () => r(require('../view/weChatManager/customerService/indexUrl')), 'customerServiceUrl')
const orderNotification = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet/orderNotification')), 'orderNotification')
const ticketNotify = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet/ticketNotify')), 'ticketNotify') //电子券订单通知
const OrderRefund = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet/OrderRefund')), 'OrderRefund') //退款订单通知
const noticeList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/noticeSet/noticeList')), 'noticeList') //回复设置
const keyWordReply = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/noticeSet/keyWordReply')), 'keyWordReply') //关键字回复
const autoReply = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/noticeSet/autoReply')), 'autoReply') //消息托管
const msgHosting = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/noticeSet/msgHosting')), 'msgHosting') //小尾巴
const tails = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/noticeSet/tails')), 'tails') //小尾巴
const sign = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet/sign')), 'sign') //签到设置
//微卡设置
const vipList = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipList')), 'vipList')
    // const menuBar = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/menuBar')), 'menuBar')
const vipGrant = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipGrant')), 'vipGrant')
const vipPayment = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipPayment')), 'vipPayment')
const vipPaymentRule = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/editPaymentRule')), 'vipPaymentRule')
const newlyBuild = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/newlyBuild')), 'newlyBuild')
const newlyBuildCoupon = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/newlyBuildCoupon')), 'newlyBuildCoupon')
const vaccaeParam = r => require.ensure([], () => r(require('../view/wechatCard/basicsSet/vaccaeParam')), 'vaccaeParam')

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    {
        path: '/pages',
        redirect: '/pages/p404',
        name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [{ path: '404', name: 'Page404', component: Page404 },
            { path: '500', name: 'Page500', component: Page500 },
        ]
    }
]

export const asyncRouterMap = [{
        path: route.login,
        component: Login
    },
    {
        path: '*',
        component: Page404
    },
    {
        path: '/',
        redirect: '/weChat/manager',
        component: Full,
        meta: {
            label: '微信管理'
        },
        // hidden: false,
        children: [{ //商城管理
                path: '/weChat/manager',
                meta: {
                    label: '商城管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                // redirect: '/weChat/manager/systemSet',
                redirect:'/weChat/manager/Statistics',
                children: [
                    // {//券销售设置
                    //   path: 'couponSetting',
                    //   meta: {
                    //     label: '券销售设置'
                    //   },
                    //   component: goodsManager
                    // },
                    {//首页统计
                        path: 'Statistics',
                        meta: {
                            label: '商城统计'
                        },
                        component: Statistics
                    },
                    { //优惠券添加
                        path: 'couponAdd',
                        isHidden: true,
                        meta: {
                            label: '优惠券添加'
                        },
                        component: couponManagerAdd
                    }, { //优惠券编辑
                        path: 'couponEdit',
                        isHidden: true,
                        meta: {
                            label: '优惠券编辑'
                        },
                        component: couponManagerAdd
                    }, { //系统设置
                        path: 'systemSet',
                        meta: {
                            label: '系统设置'
                        },
                        component: systemSet
                    }, { //运费设置
                        path: 'logisticsSet',
                        meta: {
                            label: '运费设置'
                        },
                        component: logisticsSet
                    }, 
                    // {
                    //   path:'lunboList',
                    //   meta:{
                    //     label:'轮播图设置'
                    //   },
                    //   component:lunboManager
                    // }
                    { //主题颜色设置
                        path: 'mainStyle',
                        meta: {
                            label: '主题颜色设置'
                        },
                        component: mainStyle
                    },{
                        path: 'menuBar',
                        meta: {
                            label: '自定义菜单栏'
                        },
                        component: menuBar
                    },{
                        path: 'sign',
                        meta: {
                            label: '签到设置'
                        },
                        component: sign
                    }
                ]
            },
            { //商品管理
                path: '/weChat/manager',
                meta: {
                    label: '商品管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/couponSetting',
                children: [{
                        path: 'goodSetting',
                        meta: {
                            label: '商品设置'
                        },
                        component: goodsManager
                    }, {
                        path: 'goodAdd',
                        isHidden: true,
                        meta: {
                            label: '商品添加'
                        },
                        component: goodsManagerAdd
                    }, {
                        path: 'goodEdit',
                        isHidden: true,
                        meta: {
                            label: '商品编辑'
                        },
                        component: goodsManagerAdd
                    }, { //新增、编辑 电子券
                        path: 'addTiket',
                        isHidden: true,
                        meta: {
                            label: '电子券'
                        },
                        component: addTiket
                    },{//批量修改商品
                        path:'batchModification',
                        meta:{
                            label:'批量修改商品'
                        },
                        component:batchModification
                    },{
                        path: 'newTaste',
                        meta: {
                            label: '属性管理'
                        },
                        component: newTaste
                    },
                    {
                        path: 'partsList',
                        meta: {
                            label: '配件管理'
                        },
                        component: tasteList
                    },
                    // {
                    //   path: 'labelList',
                    //   meta: {
                    //     label: '标签管理'
                    //   },
                    //   component: tasteList
                    // },
                    {
                      path: 'userEvaluate',
                      component: {
                        render(c) {
                          return c('router-view')
                        }
                      },
                      meta: {
                        label: '用户评价',
                        noshow: true
                      },
                      redirect: '/weChat/manager/userEvaluate/index',
                      children: [
                        {
                          path: 'index',
                          isHidden: true,
                          meta: {
                            label: '用户评价列表',
                            labelNoshow: true
                          },
                          component: userEvaluate
                        },
                        {
                          path: 'info',
                          isHidden: true,
                          meta: {
                            label: '用户评价详情'
                          },
                          component: userEvaluateInfo
                        }
                      ]
                    }
                ]
            },
            { //门店管理
                path: '/weChat/manager/storeSet',
                meta: {
                    label: '门店管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/storeSet/index',
                children: [{
                        path: 'index',
                        meta: {
                            label: '门店列表',
                        },
                        component: storeSet
                    },
                    {
                        path: 'info',
                        isHidden: true,
                        meta: {
                            label: '门店详情'
                        },
                        component: storeInfo
                    },
                    {
                        path: 'storeAreaSet',
                        meta: {
                            label: '门店区域'
                        },
                        component: storeAreaSet
                    },
                ]

            },
            { //订单管理
                path: '/weChat/manager/orderList',
                meta: {
                    label: '订单管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/orderList/index',
                children: [{
                        path: 'index',
                        meta: {
                            label: '销售订单',
                        },
                        component: orderList
                    },
                    {
                        path: 'TiketIndex',
                        meta: { label: '电子券订单' },
                        component: TiketIndex
                    },
                    {
                        path: 'wellFuIndex',
                        meta: { label: '充值订单' },
                        component: wellFuIndex
                    },
                    {
                        path: 'info',
                        isHidden: true,
                        meta: {
                            label: '订单详情'
                        },
                        component: orderInfo
                    }
                    // , {
                    //   path: 'refundSet',
                    //   meta: {
                    //     label: '退款审核管理'
                    //   },
                    //   component: refundSet
                    // }
                ]
            },
            { //订单退款管理
                path: '/weChat/manager/RefundManage',
                meta: {
                    label: '退款管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/RefundManage/orderRefund',
                children: [{
                        path: 'orderRefund',
                        meta: {
                            label: '销售退款',
                        },
                        component: orderRefund
                    }
                    // ,
                    // {
                    //   path:'ticketRefund',
                    //   meta:{ label: '电子券订单退款审核' },
                    //   component:ticketRefund
                    // },
                    // {
                    //   path:'wellFuRefund',
                    //   meta:{ label: '充值订单退款审核' },
                    //   component:wellFuRefund
                    // }
                ]
            },
            // {//积分商城管理
            //   path: '/weChat/manager/integral',
            //   meta: {
            //     label: '积分商城管理'
            //   },
            //   component: {
            //     render(c) {
            //       return c('router-view')
            //     }
            //   },
            //   redirect: '/weChat/manager/integral/goodSetting',
            //   children: [
            //     {
            //       path: 'goodSetting',
            //       meta: {
            //         label: '积分商品设置'
            //       },
            //       component: integralGoods
            //     },
            //     {
            //       path: 'goodAdd',
            //       isHidden: true,
            //       meta: {
            //         label: '积分商品添加'
            //       },
            //       component: integralGoodsAdd
            //     },
            //   ]
            // },
            { //商品活动管理
                path: '/weChat/manager/activity',
                meta: {
                    label: '活动管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/activity/goodSetting',
                children: [{
                        path: 'goodSetting',
                        meta: {
                            label: '秒杀活动'
                        },
                        component: activityGoods
                    },
                    {
                        path: 'goodAdd',
                        isHidden: true,
                        meta: {
                            label: '添加活动方案'
                        },
                        component: activityGoodsAdd
                    },
                    {
                        path: 'groupGoodSetting',
                        meta: {
                            label: '拼团活动'
                        },
                        component: groupGoods
                    },
                    {
                        path: 'groupGoodAdd',
                        isHidden: true,
                        meta: {
                            label: '添加活动方案'
                        },
                        component: groupActivityAdd
                    },
                    {
                        path: 'groupGoodAdd2',
                        isHidden: true,
                        meta: {
                            label: '统计'
                        },
                        component: groupActivityAdd2
                    }, {
                        path: 'entStoreCoupon',
                        meta: {
                            label: '进店送礼',
                        },
                        component: entStoreCoupon
                    }, {
                        path: 'entCouponAddEdit',
                        isHidden: true,
                        meta: {
                            label: '添加进店送礼'
                        },
                        component: entCouponAddEdit
                    },
                    { //scanCouponList
                        // scanCouponAddEdit
                        path: 'scanCouponList',
                        meta: {
                            label: '扫码领券',
                        },
                        component: scanCouponList
                    },
                    {
                        path: 'scanCouponAddEdit',
                        isHidden: true,
                        meta: {
                            label: '扫码领券',
                        },
                        component: scanCouponAddEdit
                    },{
                        path: 'directCouponList',
                        meta: {
                            label: '直接送券'
                        },
                        component: directCouponList
                    }, {
                        path: 'directCouponAddEdit',
                        isHidden: true,
                        meta: {
                            label: '直接送券'
                        },
                        component: directCouponAddEdit
                    }, { //satisfyList satisfyAddEdit
                        path: "satisfyList",
                        meta: {
                            label: '满足赠送'
                        },
                        component: satisfyList
                    }, {
                        path: "satisfyAddEdit",
                        isHidden: true,
                        meta: {
                            label: '满足赠送'
                        },
                        component: satisfyAddEdit
                    },
                    {//Act_SuctionPowder Act_addEdit
                      path:"Act_SuctionPowder",
                      meta:{
                        label:'全民吸粉'
                      },
                      component:Act_SuctionPowder
                    },
                    {
                        path: "Act_addEdit",
                        isHidden: true,
                        meta: {
                            label: '全民吸粉'
                        },
                        component: Act_addEdit
                    },{
                        path:"Act_Statistics",
                        isHidden:true,
                        meta:{
                            label:'统计',
                        },
                        component:Act_Statistics
                    },{
                        path: 'ConditionsList',
                        meta: {
                            label: '参与条件设置'
                        },
                        component: ConditionsList
                    }, {
                        path: 'ConditionsAddEdit',
                        isHidden: true,
                        meta: {
                            label: '参与条件设置'
                        },
                        component: ConditionsAddEdit
                    }

                ]
            },
            { //自定义页面管理
                path: '/weChat/manager/custom',
                meta: {
                    label: '页面管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/custom/homeIndex',
                children: [{
                        path: 'homeIndex',
                        meta: {
                            label: '首页'
                        },
                        component: customPage
                    }, {
                        path: 'customAutoPage',
                        meta: { label: '自定义页面' },
                        component: customAutoPage
                    },
                    {
                        path: 'addEdit',
                        isHidden: true,
                        meta: {
                            label: '添加自定义首页'
                        },
                        component: customPageAdd
                    }, {
                        path: 'autoAddEdit',
                        isHidden: true,
                        meta: { label: '添加自定义页面' },
                        component: autoAddEdit
                    },
                    {
                        path: 'autoHomeUrl',
                        meta: {
                            label: '商城网址'
                        },
                        component: autoHomeUrl
                    },
                    {
                        path: 'activedUrl',
                        meta: {
                            label: '活动链接'
                        },
                        component: activedUrl
                    }
                ]
            },
            { //营销管理 --会员领导者
                path: '/weChat/manager/marking',
                meta: {
                    label: '营销管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/marking/memberFootPrint',
                children: [
                    // { //申请团长列表
                    //     path: 'markingList',
                    //     meta: {
                    //         label: '团长管理'
                    //     },
                    //     component: markingPage
                    // },
                    // { //推广订单分拥列表
                    //     path: 'orderSharingList',
                    //     meta: {
                    //         label: '推广订单'
                    //     },
                    //     component: orderSharing
                    // },
                    // { //申请提现列表
                    //     path: 'withdrawal',
                    //     meta: {
                    //         label: '申请提现'
                    //     },
                    //     component: applicationWithdrawal
                    // },
                    // { //审核佣金提现详情
                    //     path: 'commissionDetail',
                    //     isHidden: true, //点击进入详情控制子菜单显示
                    //     meta: {
                    //         label: '佣金审核详情'
                    //     },
                    //     component: commissionWithdrawal
                    // },
                    { //会员足迹
                        path: 'memberFootPrint',
                        meta: {
                            label: '足迹管理'
                        },
                        component: footPrintList
                    },
                ]
            },
             {//分销管理
                path: '/weChat/manager/retail',
                meta: {
                    label: '分销管理'
                },
                component: {
                    render(c) {
                        return c('router-view');
                    }
                },
                redirect: '/weChat/manager/retail/markingList',
                children: [
                    //申请团长列表开始
                    { //申请团长列表
                        path: 'markingList',
                        meta: {
                            label: '审核团长'
                        },
                        component: markingPage
                    },
                    { //推广订单分拥列表
                        path: 'orderSharingList',
                        meta: {
                            label: '推广订单'
                        },
                        component: orderSharing
                    },
                    { //申请提现列表
                        path: 'withdrawal',
                        meta: {
                            label: '申请提现'
                        },
                        component: applicationWithdrawal
                    },
                    { //审核佣金提现详情
                        path: 'commissionDetail',
                        isHidden: true, //点击进入详情控制子菜单显示
                        meta: {
                            label: '佣金审核详情'
                        },
                        component: commissionWithdrawal
                    },
                    {//团长列表
                        path: "tuanzhangList",
                        meta: {
                            label: '团长列表'
                        },
                        component: tzList
                    },
                    {//查看团长粉丝列表
                        path: "tuanzhangLieBiao",
                        isHidden: true,
                        meta: {
                            label: "查看团长粉丝列表"
                        },
                        component: checkFanslist
                    },
                ]
            },
            { //会员管理列表
                path: '/weChat/manager',
                meta: {
                    label: '会员管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/menmberShipList',
                children: [{ //申请团长列表
                    path: 'menmberShipList',
                    meta: {
                        label: '会员列表'
                    },
                    component: menmberShipList
                }]
            },
            { //客服管理 customerService
                path: '/weChat/manager',
                meta: {
                    label: '客服管理'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/customerService',
                children: [{
                    path: 'customerService',
                    meta: {
                        label: '客服设置'
                    },
                    component: customerService
                },{
                    path: 'customerServiceUrl',
                    meta: {
                        label: '客服登录'
                    },
                    component: customerServiceUrl
                }]
            }, 
            { //消息设置 noticeSet
                path: '/weChat/manager',
                meta: {
                    label: '消息设置'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/weChat/manager/orderNotification',
                children: [{ //消息通知
                    path: 'orderNotification',
                    meta: {
                        label: '通知设置'
                    },
                    component: orderNotification
                }, {
                    isHidden: true,
                    path: 'ticketNotify',
                    meta: {
                        label: '通知设置'
                    },
                    component: ticketNotify
                }, {
                    isHidden: true,
                    path: 'OrderRefund',
                    meta: {
                        label: '通知设置'
                    },
                    component: OrderRefund
                },{
                    path: 'noticeList',
                    meta: {
                        label: '回复设置'
                    },
                    component: noticeList
                }, { //消息通知 keyWordReply autoReply msgHosting tails
                    path: 'keyWordReply',
                    isHidden: true,
                    meta: {
                        label: '回复设置'
                    },
                    component: keyWordReply
                }, {
                    path: 'autoReply',
                    isHidden: true,
                    meta: {
                        label: '回复设置'
                    },
                    component: autoReply
                }, {
                    path: 'msgHosting',
                    isHidden: true,
                    meta: {
                        label: '回复设置'
                    },
                    component: msgHosting
                }, {
                    path: 'tails',
                    isHidden: true,
                    meta: {
                        label: '回复设置'
                    },
                    component: tails
                }]
            },
           
        ]
    },
    { //微信卡券(点击导航栏，右边展示栏)
        path: '/wechatCard',
        meta: {
            label: '微信卡券'
        },
        redirect: '/wechatCard/basics',
        component: Full,
        children: [{
                path: '/wechatCard/basics',
                meta: {
                    label: '基础设置'
                },
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                redirect: '/wechatCard/basics/set',
                children: [{
                    path: 'set',
                    meta: {
                        label: '微卡参数'
                    },
                    component: vaccaeParam
                }]
            },
            // {
            //     path: '/wechatCard/vip',
            //     meta: {
            //         label: '会员卡管理'
            //     },
            //     component: {
            //         render(c) {
            //             return c('router-view')
            //         }
            //     },
            //     redirect: '/wechatCard/vip/list',
            //     children: [{
            //             path: 'list',
            //             meta: {
            //                 label: '微信卡模板'
            //             },
            //             component: vipList
            //         },
            //         // {
            //         //   path: 'menuBar',
            //         //   meta: {
            //         //     label: '自定义菜单栏'
            //         //   },
            //         //   component: menuBar
            //         // },
            //         {
            //             path: 'grant',
            //             meta: {
            //                 label: '发放会员卡'
            //             },
            //             component: vipGrant
            //         },
            //         {
            //             path: 'payment',
            //             meta: {
            //                 label: '支付即会员'
            //             },
            //             component: vipPayment
            //         },
            //         {
            //             path: 'rule',
            //             meta: {
            //                 label: '支付即会员规则'
            //             },
            //             isHidden: true,
            //             component: vipPaymentRule
            //         },
            //         {
            //             path: 'newlyBuild',
            //             meta: {
            //                 label: '新建会员卡'
            //             },
            //             isHidden: true,
            //             component: newlyBuild
            //         }
            //     ]
            // },
            // {
            //     path: '/wechatCard/Coupon',
            //     meta: {
            //         label: '优惠劵管理'
            //     },
            //     component: {
            //         render(c) {
            //             return c('router-view')
            //         }
            //     },
            //     redirect: '/wechatCard/Coupon/list',
            //     children: [{
            //             path: 'list',
            //             meta: {
            //                 label: '优惠劵列表'
            //             },
            //             component: vipList
            //         },
            //         {
            //             path: 'grant',
            //             meta: {
            //                 label: '发放优惠劵'
            //             },
            //             component: vipGrant
            //         },
            //         {
            //             path: 'newlyBuild',
            //             meta: {
            //                 label: '新建优惠劵'
            //             },
            //             isHidden: true,
            //             component: newlyBuildCoupon
            //         }
            //     ]
            // }
        ]
    },
    {
        path: '/home1',
        // name: 'Layout',
        redirect: '/statistic/list',
        component: Full,
        children: [{
                path: '/statistic',
                // name: '/statistic',
                meta: {
                    bcrumd: ['首页统计'],
                    login: true,
                    isTopNav: true
                },
                redirect: '/statistic/list'
            },
            {
                path: '/statistic/list',
                // name: '/statistic/list',
                meta: {
                    activePath: '/statistic/list',
                    bcrumd: ['统计'],
                    login: true
                },
                component: Statistic
            },
        ]
    }
]