<template>
     <div class="memberShipDia">
          <el-dialog title="会员列表" :visible.sync="dialogTableVisible" center width="60%">
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
               <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :row-key="getRowKeys"  max-height="450" style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                    <!-- <el-table-column property="OpenID" label="ID" width="300" align="center"></el-table-column> -->
                    <el-table-column property="NickName" label="用户名" width="200" align="center"></el-table-column>
                    <el-table-column property="CardNo" label="卡号" align="center"></el-table-column>
                    <el-table-column property="Mobile" label="手机号" align="center"></el-table-column>  
               </el-table>
               <div class="block" v-if="TotalList">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="TotalList">
                    </el-pagination>
               </div>
               <div style="text-align:center">
                    <el-button @click="dialogTableVisible = false" :disabled="disabled">取 消</el-button>
                    <el-button type="primary" @click="sureMember" :disabled="disabled">确 定</el-button>
               </div>
          </el-dialog>
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
     name:"memberShipDia",
     data(){
          return{
               TotalList:0,//分页总数
               currentPage: 0,
               pageSize:0,
               dialogTableVisible:false,
               disabled: false,
               multipleSelection:[],//用做接收选中
               CardNo:"",//卡号查询
               phoneNum:"",//手机号 查询
               tableData:[],//会员列表
               multipleSelection: [],//接收表格选中数据

          }
     },
     props: {
          showMemberDia: {
               type: Boolean,
               default: false
          },
          info:{
               type:Array
          },
     },
     mounted(){
     },
     methods:{
          async getMemberList(){
               let { Data } = await getLists(
                    {
                    Action: "GetMemberList",
                    CardNo:this.CardNo?this.CardNo:'',
                    Page: this.currentPage - 1,
                    Mobile:this.phoneNum,
                    Subscribe:'1'
                    },"MMemberOpera");
               this.tableData = Data.UserList;
                    // this.$refs.multipleTable.clearSelection();
               this.$nextTick(()=>{
                    for (const i of this.info) {
                         for (const y of this.tableData) {
                              if (i == y.OpenID) {                                   
                                   this.$refs.multipleTable.toggleRowSelection(y,true);
                              }
                         }
                    }
               })
               this.TotalList = Data.DataCount;
               this.pageSize = Data.PageSize;
          },
          handleSelectionChange(val) {
               this.multipleSelection = val;
          },
          sureMember(){
               console.log(this.multipleSelection,'0000')
               let info = "";
               this.multipleSelection.forEach((item,index) => {
                    if(index===0){      
                         info +=item.OpenID;
                    }else{
                         info +=`,${item.OpenID}`
                    }
               });
               this.$emit('sureMember',info) 
          },
          getRowKeys(row){
               return row.OpenID;
          },
          searchN(){//卡号查询
               this.getMemberList();
          },
          clearN(){
               this.CardNo = '';
               this.getMemberList();
          },
          clearI(){
               this.phoneNum = '';
               this.getMemberList();
          },  
          handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
               this.currentPage = val;
               this.getMemberList(val);
          },
     },
     watch:{
          showMemberDia(val) { 
               this.CardNo = "";
               this.phoneNum = "";  
               this.getMemberList();  
               this.dialogTableVisible = val;
               console.log(this.info)
          },
          dialogTableVisible(bool){
               this.$emit('changeDig', bool)
               if(this.loadingBtn){
                    this.loadingBtn = bool
               }
          },
          loadingBtn(val){
               if(val){
                    this.disabled = true
               }else{
                    this.disabled = false
               }
          }
     }
}
</script>
<style lang="less" scoped>
.memberShipDia{
     height: 600px;
     .input-with-select{
          width: 200px !important;
     }
}
</style>