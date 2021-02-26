<template>
     <div class="orderNotify">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
               <el-tab-pane label="销售订单通知" name="first">                    
               </el-tab-pane>
               <el-tab-pane label="电子券订单通知" name="second">
                    <el-form ref="form" :model="form" label-width="180px">
                         <el-form-item label="通知类型：">
                              <el-select v-model="region" placeholder="请选择通知类型">
                                   <el-option label="微信通知" value="1"></el-option>
                              </el-select>
                         </el-form-item>
                         <el-form-item label="模板ID：">
                              <el-input v-model="form.WeChatNo"></el-input>
                         </el-form-item>
                         <el-form-item label="模板内容：">
                              <el-input v-model="form.TempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                              <el-color-picker v-model="color2"></el-color-picker>
                         </el-form-item>
                         <el-form-item label="变量说明：">
                              <div class="explain">
                                   <span>{客户昵称}、{商品名称}、{订单号}</span><br/>
                                   <span>{下单金额}、{获得奖励}</span>
                              </div>
                         </el-form-item>
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
                    </div>
               </el-tab-pane>
               <el-tab-pane label="申请退款通知" name="three">
                    <el-form ref="form" :model="form" label-width="180px">
                         <el-form-item label="通知类型：">
                              <el-select v-model="region" placeholder="请选择通知类型">
                                   <el-option label="微信通知" value="1"></el-option>
                              </el-select>
                         </el-form-item>
                         <el-form-item label="模板ID：">
                              <el-input v-model="form.WeChatNo"></el-input>
                         </el-form-item>
                         <el-form-item label="模板内容：">
                              <el-input v-model="form.TempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                              <el-color-picker v-model="color2"></el-color-picker>
                         </el-form-item>
                         <el-form-item label="变量说明：">
                              <div class="explain">
                                   <span>{客户昵称}、{商品名称}、{订单号}</span><br/>
                                   <span>{下单金额}、{获得奖励}</span>
                              </div>
                         </el-form-item>
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
                    </div>
               </el-tab-pane>
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
               activeName: "second", 
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
               if (this.activeName === "first") {
                    this.$router.push({path:'/weChat/manager/orderNotification'})
               }
               if(this.activeName === "three"){
                    this.$router.push({path:'/weChat/manager/OrderRefund'})
               }
          },
          async preserveFun(){//保存               
               try {
                    let obj = _.cloneDeep(this.form);      
                    obj.Action = "SetOrderTemplate";   
                    obj.Type="4";
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
                    Type: "4",
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