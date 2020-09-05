import { route } from "../config/index"
// 主页面
import Full from '@/containers/Full'

const Login = r => require.ensure([], () => r(require('../view/user/login')), 'login')
const Statistic = r => require.ensure([], () => r(require('../view/statistic/list')), 'statistic')
const Page404 = r => require.ensure([], () => r(require('../view/errorPages/Page404')), 'Page404')
const Page500 = r => require.ensure([], () => r(require('../view/errorPages/Page500')), 'Page500')

//商城管理
const goodsManager = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager')), 'goodsManager')
const goodsManagerAdd = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/addEdit')), 'addEdit')
const couponManagerAdd = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/addEditCoupon')), 'addEditCoupon')
const userEvaluate = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/evaluate/userEvaluate')), 'userEvaluate')
const userEvaluateInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/evaluate/evaluateInfo')), 'userEvaluateInfo')
const tasteList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/taste/index')), 'tasteList')
const areaList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/area/list')), 'areaList')
const systemSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/systemSet')), 'systemSet')
const logisticsSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/logisticsSet')), 'logisticsSet')

// 轮播图设置
const lunboManager = r => require.ensure([], () => r(require('../view/weChatManager/lunboManager/lunboList')), 'lunboList')
// 商品管理


// 门店管理
const storeSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeSet')), 'storeSet')
const storeInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeSet/addEdit')), 'storeInfo')
const storeAreaSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/storeAreaSet/index')), 'storeAreaSet')
// 订单管理
const orderList = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList')), 'orderList')
const orderInfo = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/orderInfo')), 'orderInfo')
const refundSet = r => require.ensure([], () => r(require('../view/weChatManager/goodsManager/orderList/refund')), 'refundSet')
// 积分商城管理
const integralGoods = r => require.ensure([], () => r(require('../view/weChatManager/integralManager/index')), 'integralManager')
const integralGoodsAdd = r => require.ensure([], () => r(require('../view/weChatManager/integralManager/addEdit/index')), 'integralGoodsAdd')

// 商品活动管理
// activityGoods 秒杀商品活动  groupGoods 拼团商品活动
const activityGoods = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/index')), 'activityGoods')
const activityGoodsAdd = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/addEdit')), 'activityGoodsAdd')
const groupGoods = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/groupIndex')), 'groupGoods')
const groupActivityAdd = r => require.ensure([], () => r(require('../view/weChatManager/activityManager/groupActivities')), 'groupActivityAdd')
// 自定义页面管理
const customPage = r => require.ensure([], () => r(require('../view/weChatManager/customManager/index')), 'customPage')
const customPageAdd = r => require.ensure([], () => r(require('../view/weChatManager/customManager/addEdit')), 'customPageAdd')

// 营销管理
const markingPage = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/index')), 'markingPage')
const orderSharing = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/orderSharingList')), 'orderSharingList')
const commissionWithdrawal = r => require.ensure([], () => r(require('../view/weChatManager/markingManager/commissionDetail')), 'commissionDetail')
const applicationWithdrawal= r => require.ensure([], () => r(require('../view/weChatManager/markingManager/withdrawal')), 'applicationWithdrawal')
const footPrintList= r => require.ensure([], () => r(require('../view/weChatManager/markingManager/memberFootPrint')), 'footPrintList')
//微卡设置
const vipList = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipList')), 'vipList')
const menuBar = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/menuBar')), 'menuBar')
const vipGrant = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipGrant')), 'vipGrant')
const vipPayment = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/vipPayment')), 'vipPayment')
const vipPaymentRule = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/editPaymentRule')), 'vipPaymentRule')
const newlyBuild = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/newlyBuild')), 'newlyBuild')
const newlyBuildCoupon = r => require.ensure([], () => r(require('../view/wechatCard/vipManager/newlyBuildCoupon')), 'newlyBuildCoupon')
const vaccaeParam = r => require.ensure([], () => r(require('../view/wechatCard/basicsSet/vaccaeParam')), 'vaccaeParam')

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {
    path: '/pages', redirect: '/pages/p404', name: 'Pages',
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

export const asyncRouterMap = [
  {
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
    children: [
      {//商城管理
        path: '/weChat/manager',
        meta: {
          label: '商城管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/weChat/manager/couponSetting',
        children: [
          {//券销售设置
            path: 'couponSetting',
            meta: {
              label: '券销售设置'
            },
            component: goodsManager
          },{//优惠券添加
            path: 'couponAdd',
            isHidden: true,
            meta: {
              label: '优惠券添加'
            },
            component: couponManagerAdd
          },{//优惠券编辑
            path: 'couponEdit',
            isHidden: true,
            meta: {
              label: '优惠券编辑'
            },
            component: couponManagerAdd
          },{//系统设置
            path: 'systemSet',
            meta: {
              label: '系统设置'
            },
            component: systemSet
          },{//运费设置
            path: 'logisticsSet',
            meta: {
              label: '运费设置'
            },
            component: logisticsSet
          }
        ]
      },
      {//商品管理
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
        children: [
          {
            path: 'goodSetting',
            meta: {
              label: '商品设置'
            },
            component: goodsManager
          },{
            path: 'goodAdd',
            isHidden: true,
            meta: {
              label: '商品添加'
            },
            component: goodsManagerAdd
          },{
            path: 'goodEdit',
            isHidden: true,
            meta: {
              label: '商品编辑'
            },
            component: goodsManagerAdd
          },
          {
            path:'lunboList',
            meta:{
              label:'轮播图设置'
            },
            component:lunboManager
          },
          {
            path: 'tasteList',
            meta: {
              label: '商品口味设置'
            },
            component: tasteList
          },{
            path: 'labelList',
            meta: {
              label: '商品标签设置'
            },
            component: tasteList
          },{
            path: 'partsList',
            meta: {
              label: '商品配件设置'
            },
            component: tasteList
          },{
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
      {//门店管理
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
        children:[
          {
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
      {//订单管理
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
        children:[
          {
            path: 'index',
            meta: {
              label: '订单列表',
            },
            component: orderList
          },
          {
            path: 'info',
            isHidden: true,
            meta: {
              label: '订单详情'
            },
            component: orderInfo
          }, {
            path: 'refundSet',
            meta: {
              label: '退款审核管理'
            },
            component: refundSet
          }
        ]
      },
      {//积分商城管理
        path: '/weChat/manager/integral',
        meta: {
          label: '积分商城管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/weChat/manager/integral/goodSetting',
        children: [
          {
            path: 'goodSetting',
            meta: {
              label: '积分商品设置'
            },
            component: integralGoods
          },
          {
            path: 'goodAdd',
            isHidden: true,
            meta: {
              label: '积分商品添加'
            },
            component: integralGoodsAdd
          },
        ]
      },
      {//商品活动管理
        path: '/weChat/manager/activity',
        meta: {
          label: '商品活动管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/weChat/manager/activity/goodSetting',
        children: [
          {
            path: 'goodSetting',
            meta: {
              label: '秒杀商品活动'
            },
            component: activityGoods
          },
          {
            path: 'goodAdd',
            isHidden: true,
            meta: {
              label: '添加活动商品'
            },
            component: activityGoodsAdd
          },
          {
            path: 'groupGoodSetting',
            meta: {
              label: '多人拼团活动'
            },
            component: groupGoods
          },{
            path: 'groupGoodAdd',
            isHidden: true,
            meta: {
              label: '添加活动商品'
            },
            component: groupActivityAdd
          },
          
        ]
      },
      {//自定义页面管理
        path: '/weChat/manager/custom',
        meta: {
          label: '自定义页面管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/weChat/manager/custom/customList',
        children: [
          {
            path: 'customList',
            meta: {
              label: '自定义页面列表'
            },
            component: customPage
          },
          {
            path: 'addEdit',
            isHidden: true,
            meta: {
              label: '添加自定义页面'
            },
            component: customPageAdd
          },
        ]
      },
      {//营销管理 --会员领导者
        path: '/weChat/manager/marking',
        meta: {
          label: '营销管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/weChat/manager/marking/markingList',
        children: [
          {//申请团长列表
            path: 'markingList',
            meta: {
              label: '团长管理'
            },
            component: markingPage
          },
          {//推广订单分拥列表
            path: 'orderSharingList',
            meta: {
              label: '推广订单'
            },
            component: orderSharing
          },
          {//申请提现列表
            path: 'withdrawal',
            meta: {
              label: '申请提现'
            },
            component: applicationWithdrawal
          },
          {//审核佣金提现详情
            path: 'commissionDetail',
            isHidden: true,//点击进入详情控制子菜单显示
            meta: {
              label: '佣金审核详情'
            },
            component: commissionWithdrawal
          },
          {//会员足迹
            path: 'memberFootPrint',
            meta: {
              label: '足迹管理'
            },
            component:footPrintList
          },
        ]
      },
    ]
  },
  {//微信卡券(点击导航栏，右边展示栏)
    path: '/wechatCard',
    meta: {
      label: '微信卡券'
    },
    redirect: '/wechatCard/basics',
    component: Full,
    children: [
      {
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
        children: [
          {
            path: 'set',
            meta: {
              label: '微卡参数'
            },
            component: vaccaeParam
          }
        ]
      },
      {
        path: '/wechatCard/vip',
        meta: {
          label: '会员卡管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/wechatCard/vip/list',
        children: [
          {
            path: 'list',
            meta: {
              label: '微信卡模板'
            },
            component: vipList
          },
          {
            path: 'menuBar',
            meta: {
              label: '自定义菜单栏'
            },
            component: menuBar
          },
          {
            path: 'grant',
            meta: {
              label: '发放会员卡'
            },
            component: vipGrant
          },
          {
            path: 'payment',
            meta: {
              label: '支付即会员'
            },
            component: vipPayment
          },
          {
            path: 'rule',
            meta: {
              label: '支付即会员规则'
            },
            isHidden: true,
            component: vipPaymentRule
          },
          {
            path: 'newlyBuild',
            meta: {
              label: '新建会员卡'
            },
            isHidden: true,
            component: newlyBuild
          }
        ]
      },
      {
        path: '/wechatCard/Coupon',
        meta: {
          label: '优惠劵管理'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: '/wechatCard/Coupon/list',
        children: [
          {
            path: 'list',
            meta: {
              label: '优惠劵列表'
            },
            component: vipList
          },
          {
            path: 'grant',
            meta: {
              label: '发放优惠劵'
            },
            component: vipGrant
          },
          {
            path: 'newlyBuild',
            meta: {
              label: '新建优惠劵'
            },
            isHidden: true,
            component: newlyBuildCoupon
          }
        ]
      }
    ]
  },
  {
    path: '/home1',
    // name: 'Layout',
    redirect: '/statistic/list',
    component: Full,
    children: [
      {
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