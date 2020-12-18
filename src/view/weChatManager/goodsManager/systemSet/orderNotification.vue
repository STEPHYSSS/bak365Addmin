<template>
     <div class="orderNotify">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
               <el-tab-pane label="销售订单通知" name="first">
                    <el-form ref="form" :model="form" label-width="180px">
                         <el-form-item label="通知类型：">
                              <el-select v-model="region" placeholder="请选择通知类型">
                                   <el-option label="微信通知" value="1"></el-option>
                              </el-select>
                         </el-form-item>
                         <el-form-item label="商户微信ID：">
                              <el-input v-model="form.ManagUsers"></el-input>
                              <span style="color:red">（多个微信号请用英文 , 分开）</span>
                         </el-form-item>
                         <el-form-item label="商户通知模板ID：">
                              <el-input v-model="form.ManagWeChatNo"></el-input>
                         </el-form-item>
                         <el-form-item label="商户通知模板内容：" prop="ManagTempText">
                              <el-input v-model="form.ManagTempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                              <el-color-picker v-model="color1"></el-color-picker>
                         </el-form-item>
                         <el-form-item label="变量说明：">
                              <div class="explain">
                                   <span>{产品}、{合计}、{姓名}、{提货时间}</span><br/>
                                   <span>{提货方式}、{实付金额}、{下单时间}</span><br/>
                                   <span>{订单编号}、{电话号码}、{送货地址}</span><br/>
                                   <span>{提货门店}、{来源}、{备注}</span>
                              </div>
                         </el-form-item>
                         <el-form-item label="商户范例：">
                              <div class="explain">
                                   <span>first=恭喜您成功购买！</span><br/>
                                   <span>keyword1={订单编号}=#F70A0A</span><br/>
                                   <span>keyword2={产品}{合计}</span><br/>
                                   <span>keyword3={提货门店}{送货地址}</span><br/>
                                   <span>keyword4={提货时间}</span><br/>
                                   <span>keyword5={姓名}、{电话号码}</span><br/>
                                   <span>remark={备注}</span>
                              </div>
                         </el-form-item>
                         <el-form-item label="客户通知模板ID：">
                              <el-input v-model="form.WeChatNo"></el-input>
                         </el-form-item>
                         <el-form-item label="客户通知模板内容：">
                              <el-input v-model="form.TempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                              <el-color-picker v-model="color2"></el-color-picker>
                         </el-form-item>
                         <el-form-item label="变量说明：">
                              <div class="explain">
                                   <span>{产品}、{合计}、{姓名}、{提货时间}</span><br/>
                                   <span>{提货方式}、{实付金额}、{下单时间}</span><br/>
                                   <span>{订单编号}、{门店电话}、{送货地址}</span><br/>
                                   <span>{提货门店}、{来源}、{备注}</span>
                              </div>
                         </el-form-item>
                         <el-form-item label="客户范例：">
                              <div class="explain">
                                   <span>first=恭喜您成功购买！</span><br/>
                                   <span>keyword1={订单编号}=#F70A0A</span><br/>
                                   <span>keyword2={产品}{合计}</span><br/>
                                   <span>keyword3={提货门店}{送货地址}</span><br/>
                                   <span>keyword4={提货时间}</span><br/>
                                   <span>keyword5={姓名}、{门店电话}</span><br/>
                                   <span>remark={备注}</span>
                              </div>
                         </el-form-item>
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
                    </div>
               </el-tab-pane>
               <el-tab-pane label="电子券订单通知" name="second"></el-tab-pane>
          </el-tabs>          
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import _ from "lodash";
export default {
     name:'',
     data(){
          return{ 
               activeName: "first", 
               region:'微信通知', 
               color1:'#409EFF',
               color2:'#409EFF',
               form:{
                    ManagCardNo:'',
                    ManagWeChatNo:'',
                    ManagTempText:'',
                    WeChatNo:'',
                    TempText:''
               }
          }
     },
     created(){
          this.GetOrderTemplate()
     },
     methods:{
          handleClick() {
               if (this.activeName === "second") {
               // this.$router.push({
               //      name: "piechart"
               // });
               this.$router.push({path:'/weChat/manager/ticketNotify'})
               }
          },
          async preserveFun(){//保存               
               try {
                    let obj = _.cloneDeep(this.form);      
                    obj.Action = "SetOrderTemplate";   
                    obj.Type="2";
                    let data = await getLists(obj, "MBaseOpera");
                    this.$message.success('操作成功')
               } catch (error) {
                    this.$message.error(error);
               }
          },
          async GetOrderTemplate() {
               let { Data } = await getLists(
               {
                    Action: "GetOrderTemplate",
                    Type: "2",
               },
               "MBaseOpera"
               );
               this.form = Data.TemplateBase;
               this.form.ManagTempText=this.form.ManagTempText.replace(/\|/g, '\n');
               this.form.TempText = this.form.TempText.replace(/\|/g, '\n');
          },
     }
}
</script>
<style lang="less" scoped>
.el-input,.explain,.el-textarea{
     width: 300px;
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
</style>