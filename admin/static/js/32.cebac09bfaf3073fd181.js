webpackJsonp([32],{fZGs:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),n=a.n(s),r=a("exGp"),l=a.n(r),i=a("T+sA"),c={name:"",data:function(){return{loading:!1,tablObj:{},tablObj2:{},remitObj:{},Type:"",Account:"",Remarks:"",SID:this.$route.query.SID,hideRemit:!1}},mounted:function(){this.getDetail()},methods:{getDetail:function(){var t=this;return l()(n.a.mark(function e(){var a,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,Object(i.a)({Action:"GetRebate",SID:t.SID},"MMemberOpera");case 4:a=e.sent,s=a.Data,t.tablObj=s.Rebate,t.tablObj2=s.Leader,t.loading=!1,e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),t.$message.error(e.t0),t.loading=!1;case 15:case"end":return e.stop()}},e,t,[[1,11]])}))()},searchName:function(){this.getDetail()},paymentInfo:function(t,e){var a=this;return l()(n.a.mark(function s(){var r,l;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a.Account=t,a.Type=e,a.loading=!0,s.prev=3,s.next=6,Object(i.a)({Action:"RemitMoney",SID:a.SID,Account:a.Account,Type:a.Type,Remarks:a.Remarks},"MMemberOpera");case 6:r=s.sent,l=r.Data,a.loading=!1,a.hideRemit=!0,a.remitObj=l.RemitMoney,s.next=17;break;case 13:s.prev=13,s.t0=s.catch(3),a.$message.error(s.t0),a.loading=!1;case 17:case"end":return s.stop()}},s,a,[[3,13]])}))()}},filters:{checkTip:function(t){return"1"===t?"已审核":"未审核"},servantStaus:function(t){return"0"===t?"未申请":"1"===t?"申请返佣":"2"===t?"处理成功":"3"===t?"处理失败":void 0},IsRebateTip:function(t){return"0"===t?"未返佣":"1"===t?"已返佣":void 0}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commissionDetail"},[a("fieldset",{staticClass:"Rebate"},[a("legend",{staticClass:"RebateInfo"},[t._v("基本信息")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("团长编号："+t._s(t.tablObj.LeaderSID))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("返佣金额："+t._s(t.tablObj.Money))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("返佣状态："+t._s(t._f("servantStaus")(t.tablObj.State)))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("是否返佣："+t._s(t._f("IsRebateTip")(t.tablObj.IsRebate)))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("提交时间："+t._s(t.tablObj.AddTime))])])],1)],1),t._v(" "),a("fieldset",{staticClass:"Leader"},[a("legend",{staticClass:"leaderInfo"},[t._v("团长信息")]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("名称："+t._s(t.tablObj2.Name))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("微卡卡号："+t._s(t.tablObj2.CardNo))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("支付宝账号："+t._s(t.tablObj2.AlipayAccount))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("微信账号："+t._s(t.tablObj2.WeChatAccount))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("手机号："+t._s(t.tablObj2.Mobile))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("审核状态："+t._s(t._f("checkTip")(t.tablObj2.Audit)))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("分享码："+t._s(t.tablObj2.ShareCode))])])],1)],1),t._v(" "),a("div",{staticClass:"RemitBox"},[a("fieldset",{staticClass:"Leader"},[a("legend",{staticClass:"leaderInfo"},[t._v("打款方式")]),t._v(" "),a("div",{staticStyle:{display:"flex","margin-bottom":"30px"}},[a("p",{staticStyle:{width:"55px","line-height":"54px"}},[t._v("备 注：")]),t._v(" "),a("p",{staticStyle:{width:"277px"}},[a("el-input",{attrs:{type:"textarea",maxlength:50,rows:2,placeholder:"选填，不超过50个字符"},model:{value:t.Remarks,callback:function(e){t.Remarks=e},expression:"Remarks"}})],1)]),t._v(" "),a("span",[t._v("打  款：")]),t._v(" "),a("el-button",{on:{click:function(e){return t.paymentInfo(t.tablObj2.CardNo,"1")}}},[t._v("微卡卡号")]),t._v(" "),a("el-button",{on:{click:function(e){return t.paymentInfo(t.tablObj2.WeChatAccount,"2")}}},[t._v("微信")]),t._v(" "),a("el-button",{on:{click:function(e){return t.paymentInfo(t.tablObj2.AlipayAccount,"3")}}},[t._v("支付宝")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.hideRemit,expression:"hideRemit"}],staticClass:"info"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("账 号："+t._s(t.remitObj.Account))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("会员返佣编号："+t._s(t.remitObj.RebateSID))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("汇款流水单号："+t._s(t.remitObj.RebateSID))])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("span",[t._v("汇款金额："+t._s(t.remitObj.PO))])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("\n              汇款截图：\n              "),a("img",{attrs:{src:t.remitObj.Img,alt:""}})])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("span",[t._v("备注："+t._s(t.remitObj.Remarks))])])],1)],1)],1)])])},staticRenderFns:[]};var p=a("VU/8")(c,o,!1,function(t){a("za4V")},"data-v-39a4d730",null);e.default=p.exports},za4V:function(t,e){}});
//# sourceMappingURL=32.cebac09bfaf3073fd181.js.map