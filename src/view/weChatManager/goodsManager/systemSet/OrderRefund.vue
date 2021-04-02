<template>
     <div class="orderNotify">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
               <el-tab-pane label="销售订单通知" name="first">                    
               </el-tab-pane>
               <el-tab-pane label="电子券订单通知" name="second">                    
               </el-tab-pane>
               <el-tab-pane label="申请退款通知" name="three">
                    <el-form ref="form" :model="form" label-width="180px">
                         <el-form-item label="通知类型：">
                              <el-select v-model="region" placeholder="请选择通知类型">
                                   <el-option label="微信通知" value="1"></el-option>
                              </el-select>
                         </el-form-item>
                         <el-form-item label="商户微信ID：">
                              <el-input v-model="form.ManagUsers"></el-input>
                              <el-button type="primary" style="margin-left:10px" size="medium" @click="addMemberShip">添加</el-button>
                         </el-form-item>
                         <el-form-item label="模板ID：">
                              <el-input v-model="form.ManagWeChatNo"></el-input>
                         </el-form-item>
                         <el-form-item label="模板内容：">
                              <el-input v-model="form.ManagTempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                              <el-color-picker v-model="color2"></el-color-picker>
                         </el-form-item>
                         <el-form-item label="变量说明：">
                              <div class="explain">
                                   <span>{商品名称}、{姓名}、{订单金额}、{下单时间}</span><br/>
                                   <span>{退款时间}、{订单编号}、{联系方式}</span>
                              </div>
                         </el-form-item>
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
                    </div>
               </el-tab-pane>
          </el-tabs> 
          <MemberShipDia :info="newArr" :showMemberDia="showMemberDia" @changeDig="changeDig" @sureMember="sureMember"></MemberShipDia>
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import MemberShipDia from '@/components/Dialog/memberShipDia.vue';
import _ from "lodash";
export default {
     name:'',
     data(){
          return{ 
               activeName: "three", 
               region:'微信通知', 
               color1:'#409EFF',
               color2:'#409EFF',
               form:{
                    ManagCardNo:'',
                    ManagWeChatNo:'',
                    ManagTempText:'',
                    WeChatNo:'',
                    TempText:''
               },
               showMemberDia:false,//显示与隐藏会员弹窗
               newArr:[],//用来手动添加的
          }
     },
     components:{ MemberShipDia},
     created(){
          this.GetOrderTemplate()
     },
     methods:{
          handleClick() {
               if (this.activeName === "first") {
               this.$router.push({path:'/weChat/manager/orderNotification'})
               }
               if (this.activeName === "second") {
                    this.$router.push({path:'/weChat/manager/ticketNotify'})
               }
          },
          async preserveFun(){//保存               
               try {
                    let obj = _.cloneDeep(this.form);      
                    obj.Action = "SetOrderTemplate";   
                    obj.Type="6";
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
                    Type: "6",
               },
               "MBaseOpera"
               );
               this.form = Data.TemplateBase;
               this.form.ManagTempText=this.form.ManagTempText.replace(/\|/g, '\n');
               this.form.TempText = this.form.TempText.replace(/\|/g, '\n');
          },
          addMemberShip(){ //打开会员弹窗
               if(this.form.ManagUsers){
                    let arr = this.form.ManagUsers.split(',')
                    this.newArr = arr;
               }
               this.showMemberDia = true;
          },
          changeDig(bool){//用于子组件控制关闭按钮
               this.showMemberDia = bool;
          },
          sureMember(val){//会员弹窗确定按钮 
               this.showMemberDia = false;
               this.form.ManagUsers = val  
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