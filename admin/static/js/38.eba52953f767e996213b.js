webpackJsonp([38],{bMCX:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("mvHQ"),a=r.n(o),l=r("Xxa5"),i=r.n(l),s=r("//Fk"),n=r.n(s),u=r("exGp"),c=r.n(u),m=(r("Ua8o"),r("R2SV")),p=r("T+sA"),d=r("2uFj"),v=r("ysSL"),h=r("7Zmj"),f=r("LxfK"),F=r("nkvz"),g=r("Cn51"),S=r("QvYb"),y=r("M4fF"),b=r.n(y),k=(r("G9QH"),r("V19L")),_=r("lbHh"),x=r.n(_),C={name:"",components:{goodType:v.a,Goods:h.a,imgLoad:F.a,ueditor1:g.a,mallGoods:f.a,QRCode:k.a},data:function(){var e=this;return{ruleForm:{Type:"5",SalePrice:0,MaxBuyCnt:0,ProdList:[],Name:"",StartTime:"",EndTime:"",MaxGroupCnt:"",GroupNum:"",ValidTime:"",Virtual:"1"},activityDate:[],activeUrlGood:d.d,AppNoMy:x.a.get("AppNo"),rules:{ProdNo:[S.d(this,"请选择活动商品")],Name:[S.b(this,"请填写活动名称")],StoreQty:[S.g(this)],ShopInfo:[S.f(this)],PayType:[{required:!0,message:"请选择支付方式",trigger:"change"}],SalePrice:[{required:!0,message:"请填写秒杀售价",trigger:"blur"}],activityDate:[{required:!0,message:"请选择活动日期",trigger:"change",validator:function(t,r,o){e.activityDate?o():o(new Error("请选择活动日期"))}}]},loading:!1,goodsShow:!1,goodsNormsIndex:0,fileListUpMain:[],fileListUpList:[],integralStateList:m.f,showCheckTicket:!1,checkClick:[],checkList:[],disabledTakeout:!1,disabledLogistics:!0,FeaturesShow:!0,ImportantNotesShow:!0,activeTypeNorms2:m.b,codeUrl:"",prodListArr:[]}},created:function(){this.codeUrl=this.$route.query.SID,this.getInfo()},methods:{getInfo:function(){var e=this;return c()(i.a.mark(function t(){var r,o,a,l,s,u;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,r=e.$route.query.SID?Object(p.a)({Action:"GetPromotion",SID:e.$route.query.SID},"MPromotionOpera"):[],t.next=5,n.a.all([r]);case 5:o=t.sent,e.loading=!1,e.$route.query.SID&&(e.ruleForm=o[0].Data.Promotion,e.ruleForm.PromWhere.split(","),e.ruleForm.MaxGroupCnt=e.ruleForm.PromWhere.split(",")[0],e.ruleForm.GroupNum=e.ruleForm.PromWhere.split(",")[1],e.ruleForm.ValidTime=e.ruleForm.PromWhere.split(",")[2],e.ruleForm.Virtual=e.ruleForm.PromWhere.split(",")[3],e.ruleForm.ProdList=o[0].Data.ItemList,e.prodListArr=o[0].Data.ItemList,e.activityDate=[e.ruleForm.StartDate,e.ruleForm.EndDate],e.ruleForm.MaxBuyCnt=e.ruleForm.MaxBuyCnt?Number(e.ruleForm.MaxBuyCnt):0,e.ruleForm.ProdNo="",e.ruleForm.ProdList.forEach(function(t){e.ruleForm.ProdNo+=t.ProdNo+(e.ruleForm.ProdList.length>1?";":"")}),"1"===e.ruleForm.SpecType&&(a=e.ruleForm.ProdList[0],e.ruleForm.SalePrice=a.SalePrice,e.ruleForm.StoreQty=a.StoreQty,l=Number(a.StoreQty)-Number(a.SurplusQty),e.ruleForm.SurplusQty=l),s=$.base64.atob(e.ruleForm.Features,"utf8"),u=$.base64.atob(e.ruleForm.ImportantNotes,"utf8"),s=s.replace(/src="Files/g,'src="../Files'),u=u.replace(/src="Files/g,'src="../Files'),setTimeout(function(){e.$refs.Features.setUEContent(s),e.$refs.ImportantNotes.setUEContent(u)},300)),t.next=12;break;case 10:t.prev=10,t.t0=t.catch(0);case 12:case"end":return t.stop()}},t,e,[[0,10]])}))()},changeNorms:function(){},selectGoods:function(e){this.prodListArr=this.prodListArr,this.goodsShow=!0,this.goodsNormsIndex=e},changeDig:function(e){this.goodsShow=e},sureGood:function(e){var t=this;this.goodsShow=!1,this.ruleForm.ProdList=e,this.ruleForm.ProdNo="",this.ruleForm.SpecType=e[0].SpecType,e.forEach(function(r){"3"===t.ruleForm.SpecType?t.ruleForm.SpecSID+=r.SpecSID+(e.length>1?";":""):t.ruleForm.ProdNo+=r.ProdNo+(e.length>1?";":"")})},upLoadImgsMain:function(e){e.length>0?this.ruleForm.Img=e[0].url:this.ruleForm.Img=""},upLoadImgsList:function(e){var t=[];e.forEach(function(e){t.push(e.url)}),this.ruleForm.ImgList=t.join(",")},CheckTicketFun:function(){var e=this,t=[];this.checkClick.forEach(function(r){t.push(b.a.find(e.checkList,{SID:r}))});var r=function(e,t,r){var o=e,a=[],l=[];o.length>0&&o.forEach(function(e){a.push(e[t]),l.push(e[r])});return{nameArr:a,idArr:l}}(t,"Name","SID"),o=r.nameArr;r.idArr;this.ruleForm.PickShopName=o.join(","),this.ruleForm.ShopInfo=this.checkClick.join(","),this.showCheckTicket=!1,this.checkClick=[]},beforeClose:function(e){e()},changeCheckbox:function(e){e.indexOf("3")>-1?this.disabledTakeout=!0:e.indexOf("2")>-1?this.disabledLogistics=!0:(this.disabledTakeout=!1,this.disabledLogistics=!1)},cancelFun:function(){this.$router.push("/weChat/manager/activity/groupGoodSetting")},preserveFun:function(){var e,t=this,r=[];this.ruleForm.ProdList.forEach(function(e){r.push({Name:e.Name,StoreQty:e.StoreQty,OldPrice:e.OldPrice,SalePrice:e.SalePrice,Stock:e.Stock,SurplusQty:e.SurplusQty,ProdSID:e.ProdSID,SpecSID:e.SpecSID,ProdNo:e.ProdNo,SpecType:e.SpecType})}),this.ruleForm.ProdList=r,this.$refs.ruleForm.validate((e=c()(i.a.mark(function e(r){var o,l,s,n,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=4;break}return e.abrupt("return",!1);case 4:return e.prev=4,o=b.a.cloneDeep(t.ruleForm),l=(l=t.$refs.Features.getUEContent()).replace(/src="\.\.\/Files/g,'src="Files'),o.Features=$.base64.btoa(l,"utf8"),s=(s=t.$refs.ImportantNotes.getUEContent()).replace(/src="\.\.\/Files/g,'src="Files'),o.ImportantNotes=$.base64.btoa(s,"utf8"),t.activityDate&&(o.StartDate=t.activityDate[0],o.EndDate=t.activityDate[1]),o.ProdList=a()(o.ProdList),o.Action="SetPromotionInfo",(n=[]).push(o.MaxGroupCnt,o.GroupNum,o.ValidTime,o.Virtual),o.PromWhere=n.toString(),e.next=20,Object(p.a)(o,"MPromotionOpera");case 20:u=e.sent,t.$message.success("操作成功,可用二维码浏览"),setTimeout(function(){t.$router.push("/weChat/manager/activity/groupGoodSetting")},300),t.codeUrl=u.Message,e.next=29;break;case 26:e.prev=26,e.t0=e.catch(4),t.$message.error(e.t0);case 29:case"end":return e.stop()}},e,t,[[4,26]])})),function(t){return e.apply(this,arguments)}))},setInputDec:function(e,t){e&&(this.ruleForm[t]=e.toString().split(".")[0])}},watch:{}};var N={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"addEditActive"},[e._v("\n  基本信息\n  "),r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"150px"}},[r("el-form-item",{key:6,attrs:{label:"活动类型"}},[r("el-select",{attrs:{placeholder:"请选择",disabled:!!this.$route.query.SID},on:{change:e.changeNorms},model:{value:e.ruleForm.Type,callback:function(t){e.$set(e.ruleForm,"Type",t)},expression:"ruleForm.Type"}},e._l(e.activeTypeNorms2,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),r("el-form-item",{key:1,attrs:{label:"商品选择",prop:"3"!==e.ruleForm.SpecType?"ProdNo":""}},[r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.selectGoods(null)}}},[e._v("选择商品")]),e._v(" "),r("el-table",{ref:"ProdNoList",staticStyle:{"margin-top":"10px",width:"700px"},attrs:{data:e.ruleForm.ProdList}},[r("el-table-column",{attrs:{prop:"Name",label:"商品名称",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"Stock",label:"商品库存",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"OldPrice",label:"商品原价¥",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"SalePrice",label:"活动价格",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[r("input",{directives:[{name:"model",rawName:"v-model",value:o.SalePrice,expression:"row.SalePrice"}],staticClass:"number",attrs:{oninput:"value=value.replace(/[^\\d]/g, '').replace(/^0{1,}/g,'')",maxlength:"10",type:"text"},domProps:{value:o.SalePrice},on:{input:function(t){t.target.composing||e.$set(o,"SalePrice",t.target.value)}}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"StoreQty",label:"活动商品数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[r("input",{directives:[{name:"model",rawName:"v-model",value:o.StoreQty,expression:"row.StoreQty"}],staticClass:"number",attrs:{oninput:"value=value.replace(/[^\\d]/g, '').replace(/^0{1,}/g,'')",maxlength:"10",type:"text"},domProps:{value:o.StoreQty},on:{input:function(t){t.target.composing||e.$set(o,"StoreQty",t.target.value)}}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"SurplusQty",label:"活动剩余商品个数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.row;return[r("input",{directives:[{name:"model",rawName:"v-model",value:o.SurplusQty,expression:"row.SurplusQty"}],staticClass:"number",attrs:{oninput:"value=value.replace(/[^\\d]/g, '').replace(/^0{1,}/g,'')",maxlength:"10",type:"text"},domProps:{value:o.SurplusQty},on:{input:function(t){t.target.composing||e.$set(o,"SurplusQty",t.target.value)}}})]}}])})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"活动名称",prop:"Name"}},[r("el-input",{attrs:{placeholder:"请填写活动名称"},model:{value:e.ruleForm.Name,callback:function(t){e.$set(e.ruleForm,"Name",t)},expression:"ruleForm.Name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"提货日期",prop:"activityDate"}},[r("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始时间","end-placeholder":"结束时间"},model:{value:e.activityDate,callback:function(t){e.activityDate=t},expression:"activityDate"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"开始时间"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择开始时间"},model:{value:e.ruleForm.StartTime,callback:function(t){e.$set(e.ruleForm,"StartTime",t)},expression:"ruleForm.StartTime"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"结束时间"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:e.ruleForm.EndTime,callback:function(t){e.$set(e.ruleForm,"EndTime",t)},expression:"ruleForm.EndTime"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"团上限",prop:"MaxGroupCnt"}},[r("em",{staticClass:"elText"},[e._v("最多可开")]),e._v(" "),r("p",{staticClass:"Inpwidth"},[r("el-input",{model:{value:e.ruleForm.MaxGroupCnt,callback:function(t){e.$set(e.ruleForm,"MaxGroupCnt",t)},expression:"ruleForm.MaxGroupCnt"}})],1),r("em",{staticClass:"elText"},[e._v("个团")])]),e._v(" "),r("el-form-item",{attrs:{label:"拼团条件",prop:"GroupNum"}},[r("em",{staticClass:"elText"},[e._v("凑齐")]),e._v(" "),r("p",{staticClass:"Inpwidth"},[r("el-input",{model:{value:e.ruleForm.GroupNum,callback:function(t){e.$set(e.ruleForm,"GroupNum",t)},expression:"ruleForm.GroupNum"}})],1),r("em",{staticClass:"elText"},[e._v("人可成团")]),e._v(" "),r("span",{staticClass:"fontColor"},[e._v("成团人数只可设置一次，请谨慎填写")])]),e._v(" "),r("el-form-item",{attrs:{label:"每人限购",prop:"MaxBuyCnt"}},[r("em",{staticClass:"elText"},[e._v("每人可购买")]),e._v(" "),r("p",{staticClass:"Inpwidth"},[r("el-input",{model:{value:e.ruleForm.MaxBuyCnt,callback:function(t){e.$set(e.ruleForm,"MaxBuyCnt",t)},expression:"ruleForm.MaxBuyCnt"}})],1),r("em",{staticClass:"elText"},[e._v("件")])]),e._v(" "),r("el-form-item",{attrs:{label:"有效期",prop:"ValidTime"}},[r("em",{staticClass:"elText"},[e._v("个人拼团有效期")]),e._v(" "),r("p",{staticClass:"Inpwidth"},[r("el-input",{model:{value:e.ruleForm.ValidTime,callback:function(t){e.$set(e.ruleForm,"ValidTime",t)},expression:"ruleForm.ValidTime"}})],1),r("em",{staticClass:"elText"},[e._v("小时")])]),e._v(" "),r("el-form-item",{attrs:{label:"虚拟成团",prop:"Virtual"}},[r("el-radio",{attrs:{label:"0"},model:{value:e.ruleForm.Virtual,callback:function(t){e.$set(e.ruleForm,"Virtual",t)},expression:"ruleForm.Virtual"}},[e._v("未开启")]),e._v(" "),r("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.Virtual,callback:function(t){e.$set(e.ruleForm,"Virtual",t)},expression:"ruleForm.Virtual"}},[e._v("开启")]),e._v(" "),r("span",{staticClass:"fontColor"},[e._v("开启虚拟成团后，活动结束以后，已开团但人数未满的团不进行退款，默认拼团成功")])],1),e._v(" "),r("el-form-item",{staticClass:"FeaturesStyle",attrs:{label:"产品特色",prop:"Features"}},[!1===e.FeaturesShow?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.FeaturesShow=!0}}},[e._v("+编辑")]):e._e(),e._v(" "),e.FeaturesShow?r("ueditor1",{ref:"Features"}):e._e(),e._v(" "),!0===e.FeaturesShow?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.FeaturesShow=!1}}},[e._v("隐藏")]):e._e()],1),e._v(" "),r("el-form-item",{staticClass:"FeaturesStyle",attrs:{label:"重要提示",prop:"ImportantNotes"}},[!1===e.ImportantNotesShow?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.ImportantNotesShow=!0}}},[e._v("+编辑")]):e._e(),e._v(" "),e.ImportantNotesShow?r("ueditor1",{ref:"ImportantNotes"}):e._e(),e._v(" "),!0===e.ImportantNotesShow?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.ImportantNotesShow=!1}}},[e._v("隐藏")]):e._e()],1)],1),e._v(" "),r("mall-goods",{attrs:{goodsShow:e.goodsShow,prodList:e.prodListArr},on:{changeDig:e.changeDig,sureGood:e.sureGood}}),e._v(" "),r("el-dialog",{staticClass:"areaTree TicketDialog",attrs:{title:"选择门店",width:"600px","before-close":e.beforeClose,visible:e.showCheckTicket},on:{"update:visible":function(t){e.showCheckTicket=t}}},[r("div",{staticClass:"addScroll"},[r("el-checkbox-group",{model:{value:e.checkClick,callback:function(t){e.checkClick=t},expression:"checkClick"}},e._l(e.checkList,function(t){return r("el-checkbox",{key:t.SID,attrs:{label:t.SID}},[e._v(e._s(t.Name))])}),1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.showCheckTicket=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.CheckTicketFun}},[e._v("确 定")])],1)]),e._v(" "),r("div",{staticClass:"preserveStyle"},[r("el-button",{on:{click:e.cancelFun}},[e._v("取消")]),e._v(" "),r("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:e.preserveFun}},[e._v("保存")])],1),e._v(" "),e.codeUrl?r("div",{staticClass:"active-code-style"},[r("div",{staticClass:"active-code-style-title"},[e._v("手机微信扫码浏览")]),e._v(" "),r("QRCode",{attrs:{newWidth:200,newText:e.activeUrlGood+e.codeUrl+"?AppNo="+e.AppNoMy+"&seckill=true&isBrowse=true"}})],1):e._e()],1)},staticRenderFns:[]};var P=r("VU/8")(C,N,!1,function(e){r("i47X")},null,null);t.default=P.exports},i47X:function(e,t){}});
//# sourceMappingURL=38.eba52953f767e996213b.js.map