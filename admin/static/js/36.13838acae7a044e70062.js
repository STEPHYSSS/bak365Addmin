webpackJsonp([36],{"2G/O":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("Xxa5"),a=r.n(o),l=r("exGp"),n=r.n(l),i=r("T+sA"),s={name:"",data:function(){return{tableData:[],ruleForm:{Colour:"#CAEACC",Name:"",SID:"",value1:"1"},dialogFormVisible:!1}},mounted:function(){this.getColorList()},methods:{getColorList:function(){var e=this;return n()(a.a.mark(function t(){var r,o;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(i.a)({Action:"GetStyleList"},"MShopOpera");case 3:r=t.sent,o=r.Data,e.tableData=o.DecorateList,t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}},t,e,[[0,8]])}))()},addColor:function(){this.dialogFormVisible=!0,this.ruleForm.Colour="#CAEACC",this.ruleForm.Name="",this.ruleForm.SID=""},colorBtn:function(){var e=this;return n()(a.a.mark(function t(){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!=e.ruleForm.Name){t.next=2;break}return t.abrupt("return",e.$message.error("请输入主题名称"));case 2:return t.prev=2,t.next=5,Object(i.a)({Action:"SetStyle",Name:e.ruleForm.Name,Colour:e.ruleForm.Colour,IsDefault:!0===e.ruleForm.value1?"1":"0",SID:e.ruleForm.SID?e.ruleForm.SID:""},"MShopOpera");case 5:r=t.sent,r.Data,e.getColorList(),e.$message.success("操作成功"),e.dialogFormVisible=!1,t.next=15;break;case 12:t.prev=12,t.t0=t.catch(2),e.$message.error(t.t0);case 15:case"end":return t.stop()}},t,e,[[2,12]])}))()},test:function(e){console.log(e),this.ruleForm.value1=e},editColor:function(e){this.dialogFormVisible=!0,this.ruleForm=e},handleChangeColor:function(e){console.log(e)},delColor:function(e){var t=this;return n()(a.a.mark(function r(){return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:t.$confirm("是否删除此条数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.a)({Action:"RemoveStyle",SID:e.SID},"MShopOpera").Data;t.getColorList(),t.$message.success("删除成功")}).catch(function(){t.$message({type:"info",message:"已取消删除"})});case 1:case"end":return r.stop()}},r,t)}))()}},filters:{isDef:function(e){return"1"==e?"是":"否"}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"area_app_style"},[r("div",{staticStyle:{"margin-bottom":"30px"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.addColor}},[e._v("新增主题颜色")]),e._v(" "),r("el-table",{staticStyle:{width:"90%","margin-top":"30px"},attrs:{data:e.tableData}},[r("el-table-column",{attrs:{prop:"Name",label:"配色方案",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"Colour",label:"颜色标记",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.row.Colour,expression:"scope.row.Colour"}],attrs:{type:"color",disabled:!0},domProps:{value:t.row.Colour},on:{input:function(r){r.target.composing||e.$set(t.row,"Colour",r.target.value)}}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"是否默认",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("isDef")(t.row.IsDefault)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.SID?r("el-button",{attrs:{type:"text"},on:{click:function(r){return e.delColor(t.row,t.$index)}}},[e._v("删除")]):e._e(),e._v(" "),t.row.SID?r("el-button",{attrs:{type:"text"},on:{click:function(r){return e.editColor(t.row,t.$index)}}},[e._v("编辑")]):e._e()]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"收货地址",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",staticStyle:{"margin-top":"10px"},attrs:{model:e.ruleForm,inline:!0}},[r("div",[r("el-form-item",{attrs:{label:"颜色标记"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm.Colour,expression:"ruleForm.Colour"}],attrs:{type:"color"},domProps:{value:e.ruleForm.Colour},on:{change:e.handleChangeColor,input:function(t){t.target.composing||e.$set(e.ruleForm,"Colour",t.target.value)}}})]),e._v(" "),r("el-form-item",{attrs:{label:"配色方案"}},[r("el-input",{staticStyle:{width:"150px"},model:{value:e.ruleForm.Name,callback:function(t){e.$set(e.ruleForm,"Name",t)},expression:"ruleForm.Name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否默认"}},[r("el-switch",{attrs:{"on-value":"1","off-value":"0"},on:{change:e.test},model:{value:e.ruleForm.value1,callback:function(t){e.$set(e.ruleForm,"value1",t)},expression:"ruleForm.value1"}})],1)],1)]),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.colorBtn}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var c=r("VU/8")(s,u,!1,function(e){r("KJja")},"data-v-263d7a1f",null);t.default=c.exports},KJja:function(e,t){}});
//# sourceMappingURL=36.13838acae7a044e70062.js.map