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
                              <el-input type="textarea" :rows="5" style="width:500px" v-model="form.ManagUsers"></el-input>
                              <!-- <span style="color:red">（多个微信号请用英文 , 分开）</span> -->
                              <el-button type="primary" style="margin-left:10px" size="medium" @click="addMemberShip">添加</el-button>
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
                                   <span>{商品名称}、{合计}、{姓名}、{提货时间}</span><br/>
                                   <span>{提货方式}、{订单金额}、{下单时间}</span><br/>
                                   <span>{订单编号}、{联系方式}、{送货地址}</span><br/>
                                   <span>{提货门店}、{备注}</span>
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
                                   <span>{商品名称}、{合计}、{姓名}、{提货时间}</span><br/>
                                   <span>{提货方式}、{订单金额}、{下单时间}</span><br/>
                                   <span>{订单编号}、{门店电话}、{送货地址}</span><br/>
                                   <span>{提货门店}</span>
                              </div>
                         </el-form-item>                         
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
                    </div>
               </el-tab-pane>
               <el-tab-pane label="电子券订单通知" name="second"></el-tab-pane>
               <el-tab-pane label="申请退款通知" name="three"></el-tab-pane>
          </el-tabs>  
          <el-dialog title="会员列表" :visible.sync="dialogTableVisible">
               <el-row class="marginBottom">
                    <el-col :span="24">
                    <span>卡 号：</span>
                    <el-input placeholder="请输入卡号" v-model="CardNo" clearable @clear = "clearN" class="input-with-select">
                         <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
                    </el-input>&nbsp;&nbsp;
                    <span>手机号：</span>
                    <el-input placeholder="请输入手机号" v-model="phoneNum" clearable @clear = "clearI" class="input-with-select">
                         <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
                    </el-input>
                    </el-col>
               </el-row>
               <el-table :row-key="getRowKey" @select="shoudong" ref="multipleTable" :data="gridData" tooltip-effect="dark" style="width: 100%;height:500px;overflow-y: scroll;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center" :reserve-selection="true"></el-table-column>
                    <!-- <el-table-column property="OpenID" label="ID" width="300" align="center"></el-table-column> -->
                    <el-table-column property="NickName" label="用户名" width="200" align="center"></el-table-column>
                    <el-table-column property="CardNo" label="卡号" align="center"></el-table-column>
                    <el-table-column property="Mobile" label="手机号" align="center"></el-table-column>                    
               </el-table>
               <div class="block" v-if="TotalList">
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="TotalList">
                    </el-pagination>
               </div>
               <div class="dialogSty">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="SureDialog">确 定</el-button>
               </div>
          </el-dialog>        
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
               },
               TotalList:0,//分页总数
               currentPage: 0,
               pageSize:0,
               gridData:[],//会员列表
               dialogTableVisible:false,
               multipleSelection:[],//用做接收选中
               CardNo:"",//卡号查询
               phoneNum:"",//手机号 查询
               newArr:[],//用来手动添加的
          }
     },
     created(){
          this.GetOrderTemplate();
     },
     methods:{
          handleClick() {
               if (this.activeName === "second") {
                    this.$router.push({path:'/weChat/manager/ticketNotify'})
               }
               if(this.activeName === "three"){
                    this.$router.push({path:'/weChat/manager/OrderRefund'})
               }
          },
          async preserveFun(){//保存               
               try {
                    let obj = _.cloneDeep(this.form); 
                    console.log(obj,'obj')     
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
          addMemberShip(){ //打开会员弹窗
               // this.dialogTableVisible = true;
               this.CardNo = "";
               this.phoneNum = "";  
               if(this.form.ManagUsers){
                    let arr = this.form.ManagUsers.split(',')
                    this.newArr = arr;
               }            
               this.GetMemberList();
          },
          shoudong(){
                
               // this.GetMemberList();
          },
          async GetMemberList() {
               let { Data } = await getLists({Action: "GetMemberList",CardNo:this.CardNo,Page: this.currentPage - 1,
               Mobile:this.phoneNum,Subscribe:'1'},"MMemberOpera");
               this.gridData = Data.UserList;
               this.dialogTableVisible = true;

               this.TotalList = Data.DataCount;
               this.pageSize = Data.PageSize;
               this.$nextTick(()=>{
                    for (const i of this.newArr) {
                         for (const y of this.gridData) {
                              if (i == y.OpenID) {
                                   this.$refs.multipleTable.toggleRowSelection(y);
                              }
                         }
                    }
               })
               // this.$nextTick(() => {
               //      if (this.form.ManagUsers) {
               //           let arr = this.form.ManagUsers.split(',')
               //           for (const i of arr) {
               //                for (const y of this.gridData) {
               //                     if (i == y.OpenID) {
               //                          this.$refs.multipleTable.toggleRowSelection(y);
               //                     }
               //                }
               //           }
               //      }
               // })
               // 如果form中和Data返回的数据有相同的就回显
               // let list = [];
               // let arr = this.form.ManagUsers.split(',')
               // for (const i of arr) {
               //      for (const y of this.gridData) {
               //           if (i == y.OpenID) {
               //                this.multipleSelection = y.OpenID;
               //           }
               //      }
               // }
          },
          handleSelectionChange(val){
              this.multipleSelection = val;
          },
          SureDialog(){
               let info = "";
               this.multipleSelection.forEach((item,index) => {
                    // console.log(item,'----')
                    if(index===0){
                         info +=item.OpenID;
                    }else{
                         info +=`,${item.OpenID}`
                    }
               });
               this.dialogTableVisible = false;
               this.form.ManagUsers = info;
          },
          getRowKey(row){
               return row.OpenID;
          }, 
          searchN(){//卡号查询
               this.GetMemberList();
               // this.gridData = this.gridData.filter(D=>D.CardNo == this.CardNo)
          },
          clearN(){
               this.CardNo = '';
               this.GetMemberList();
          },
          clearI(){
               this.phoneNum = '';
               this.GetMemberList();
          },  
          handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
               this.currentPage = val;
               this.GetMemberList(val);
          }, 
     }
}
</script>
<style lang="less" scoped>
.orderNotify{
     margin-bottom: 20px;
}
.el-input,.explain,.el-textarea{
     width: 300px;
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
.dialogSty{
     text-align: center;
     margin-top: 30px;
}
.input-with-select {
  width: 250px;
}
</style>