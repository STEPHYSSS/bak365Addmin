webpackJsonp([39],{Nz8u:function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=o("mvHQ"),n=o.n(r),l=o("Xxa5"),i=o.n(l),s=o("exGp"),c=o.n(s),m=o("T+sA"),f=(o("Ua8o"),o("R2SV")),u={name:"systemSetIndex",data:function(){return{activeName:"1",rules:{},form:{ShopRadio:"1",ScopeDay:"",StartTime:"",EndTime:"",AutoCancelOrder:"",IsDeduction:"2",ScoreDeduction:"",MoneyDeduction:"",ScoreRatio:"",IsRefund:"3"},btnLoading:!1,options:[15,20,30,60],optionsRetreat:f.i,DrawingsDate:[],form2:{DrawingsStartDate:"",DrawingsEndDate:"",DrawingsType:"1",RatioWay:"1",ValidDay:""}}},created:function(){this.getInfo()},methods:{handleClick:function(e,t){this.getInfo()},change:function(e){this.form2.DrawingsStartDate=e[0],this.form2.DrawingsEndDate=e[1]},getInfo:function(){var e=this;return c()(i.a.mark(function t(){var a,o,r,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"1"!=e.activeName){t.next=9;break}return t.next=4,Object(m.a)({Action:"GetBase",Type:1},"MShopOpera");case 4:a=t.sent,(o=a.Data).ShopBase.SetInfo&&(e.form=o.ShopBase.SetInfo),t.next=15;break;case 9:return t.next=11,Object(m.a)({Action:"GetBase",Type:2},"MShopOpera");case 11:r=t.sent,n=r.Data,e.form2=n.ShopBase.SetInfo,e.DrawingsDate.push(e.form2.DrawingsStartDate,e.form2.DrawingsEndDate);case 15:t.next=20;break;case 17:t.prev=17,t.t0=t.catch(0),e.$message.error(t.t0);case 20:case"end":return t.stop()}},t,e,[[0,17]])}))()},submitSystem:function(){var t=this;return c()(i.a.mark(function a(){var o;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.btnLoading=!0,void 0!=t.form.ScoreDeduction&&void 0!=t.form.MoneyDeduction&&void 0!=t.form.ScoreRatio){a.next=3;break}return a.abrupt("return",t.$message.error("请输入积分抵扣规则"));case 3:return a.prev=3,o={},"1"==t.activeName?o={Action:"SetBase",SetInfo:n()(t.form),Type:t.activeName}:"2"==t.activeName&&(o={Action:"SetBase",SetInfo:n()(t.form2),Type:t.activeName}),a.next=8,Object(m.a)(o,"MShopOpera");case 8:t.$message.success("操作成功"),t.btnLoading=!1,a.next=16;break;case 12:a.prev=12,a.t0=a.catch(3),t.$message.error("string"==typeof e?e:"请求失败，请重试"),t.btnLoading=!1;case 16:case"end":return a.stop()}},a,t,[[3,12]])}))()},handleChange:function(){}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"systemSet"},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"商城设置",name:"1"}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"送货日期(用户取货)"}},[a("el-input-number",{attrs:{min:1,max:30},on:{change:e.handleChange},model:{value:e.form.ScopeDay,callback:function(t){e.$set(e.form,"ScopeDay",t)},expression:"form.ScopeDay"}}),e._v(" "),a("span",{staticStyle:{color:"#999"}},[e._v("从当前日期开始，可预约多少天配送(自取)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"营业时间段(取货,送货)"}},[a("el-time-picker",{attrs:{"value-format":"HH:mm:ss",placeholder:"开始时间"},model:{value:e.form.StartTime,callback:function(t){e.$set(e.form,"StartTime",t)},expression:"form.StartTime"}}),e._v(" "),a("span",{staticStyle:{padding:"0 10px"}},[e._v("至")]),e._v(" "),a("el-time-picker",{attrs:{"value-format":"HH:mm:ss",placeholder:"结束时间"},model:{value:e.form.EndTime,callback:function(t){e.$set(e.form,"EndTime",t)},expression:"form.EndTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"送货时间间隔(用户取货)"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.IntervalMinute,callback:function(t){e.$set(e.form,"IntervalMinute",t)},expression:"form.IntervalMinute"}},e._l(e.options,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}),1),e._v(" 分钟\n        ")],1),e._v(" "),a("el-form-item",{attrs:{label:"待支付订单过期时限"}},[a("el-input",{attrs:{onkeyup:"this.value=this.value.replace(/\\D/g,'')"},model:{value:e.form.AutoCancelOrder,callback:function(t){e.$set(e.form,"AutoCancelOrder",t)},expression:"form.AutoCancelOrder"}}),e._v(" 分钟\n        ")],1),e._v(" "),a("el-form-item",{attrs:{label:"是否可退款"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.IsRefund,callback:function(t){e.$set(e.form,"IsRefund",t)},expression:"form.IsRefund"}},e._l(e.optionsRetreat,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商城模式"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.form.ShopRadio,callback:function(t){e.$set(e.form,"ShopRadio",t)},expression:"form.ShopRadio"}},[e._v("点餐模式")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.form.ShopRadio,callback:function(t){e.$set(e.form,"ShopRadio",t)},expression:"form.ShopRadio"}},[e._v("自定义模式")])],1),e._v(" "),a("el-form-item",{attrs:{label:"积分抵扣"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.form.IsDeduction,callback:function(t){e.$set(e.form,"IsDeduction",t)},expression:"form.IsDeduction"}},[e._v("开启")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.form.IsDeduction,callback:function(t){e.$set(e.form,"IsDeduction",t)},expression:"form.IsDeduction"}},[e._v("关闭")]),e._v(" "),"1"==e.form.IsDeduction?a("em",{staticStyle:{color:"red",display:"inline-block","margin-left":"5px"}},[e._v("(例：积分最高抵扣订单金额：100(元) * 5%(抵扣比例) = 5(元) 积分单次最高抵扣5元)")]):e._e(),e._v(" "),"1"==e.form.IsDeduction?a("p",[a("el-input",{staticClass:"inputWidth",attrs:{placeholder:"例：100"},model:{value:e.form.ScoreDeduction,callback:function(t){e.$set(e.form,"ScoreDeduction",t)},expression:"form.ScoreDeduction"}}),e._v("积分，抵扣"),a("el-input",{staticClass:"inputWidth",attrs:{placeholder:"例：1"},model:{value:e.form.MoneyDeduction,callback:function(t){e.$set(e.form,"MoneyDeduction",t)},expression:"form.MoneyDeduction"}}),e._v("元，积分最高抵扣订单金额\n            "),a("el-input",{staticClass:"inputWidth",attrs:{placeholder:"例：5"},model:{value:e.form.ScoreRatio,callback:function(t){e.$set(e.form,"ScoreRatio",t)},expression:"form.ScoreRatio"}}),e._v("%              \n          ")],1):e._e()],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary",size:"small",loading:e.btnLoading},on:{click:e.submitSystem}},[e._v("提交")])],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"分销设置",name:"2"}},[a("el-form",{ref:"form2",attrs:{model:e.form2,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"提现日期"}},[e._v("\n          每月 "),a("el-input",{staticStyle:{width:"80px"},attrs:{placeholder:"请输入开始日期"},model:{value:e.form2.DrawingsStartDate,callback:function(t){e.$set(e.form2,"DrawingsStartDate",t)},expression:"form2.DrawingsStartDate"}}),e._v(" ~\n          "),a("el-input",{staticStyle:{width:"80px"},attrs:{placeholder:"请输入结束日期"},model:{value:e.form2.DrawingsEndDate,callback:function(t){e.$set(e.form2,"DrawingsEndDate",t)},expression:"form2.DrawingsEndDate"}}),e._v(" 号\n        ")],1),e._v(" "),a("el-form-item",{attrs:{label:"提现方式",prop:"DrawingsType"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.form2.DrawingsType,callback:function(t){e.$set(e.form2,"DrawingsType",t)},expression:"form2.DrawingsType"}},[e._v("微卡")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.form2.DrawingsType,callback:function(t){e.$set(e.form2,"DrawingsType",t)},expression:"form2.DrawingsType"}},[e._v("支付宝")])],1),e._v(" "),a("el-form-item",{attrs:{label:"佣金比例"}},[a("el-input",{attrs:{placeholder:"推广订单金额 * 提现比例 =实际返佣金额"},model:{value:e.form2.Ratio,callback:function(t){e.$set(e.form2,"Ratio",t)},expression:"form2.Ratio"}}),e._v(" % \n          "),a("span",{staticStyle:{color:"#999"}},[e._v("推广订单金额 * 提现比例 =实际返佣金额")])],1),e._v(" "),a("el-form-item",{attrs:{label:"分销有效期"}},[a("el-input",{model:{value:e.form2.ValidDay,callback:function(t){e.$set(e.form2,"ValidDay",t)},expression:"form2.ValidDay"}}),e._v(" 天 \n        ")],1),e._v(" "),a("el-form-item",{attrs:{label:"返佣核算方式",prop:"RatioWay"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.form2.RatioWay,callback:function(t){e.$set(e.form2,"RatioWay",t)},expression:"form2.RatioWay"}},[e._v("订单金额")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.form2.RatioWay,callback:function(t){e.$set(e.form2,"RatioWay",t)},expression:"form2.RatioWay"}},[e._v("支付金额")])],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary",size:"small",loading:e.btnLoading},on:{click:e.submitSystem}},[e._v("提交")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var p=o("VU/8")(u,d,!1,function(e){o("SkmH")},"data-v-14df8120",null);a.default=p.exports},SkmH:function(e,t){}});
//# sourceMappingURL=39.85f5aaaad89dc080ef84.js.map