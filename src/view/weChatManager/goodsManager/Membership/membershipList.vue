<template>
  <div class="orderNotify">
    <el-row class="marginBottom">
      <el-col :span="6">
        <span>卡 号：</span>
        <el-input placeholder="请输入卡号" v-model="CardNo" clearable @clear = "clearN" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="头像" width="80px" align="center">
           <template slot-scope="scoped">
               <img :src="scoped.row.Headimgurl?scoped.row.Headimgurl:defaultImg" alt="" class="imgWidth">
           </template>
      </el-table-column>
      <el-table-column prop="NickName" label="用户名" align="center"></el-table-column>
      <el-table-column label="性别"  width="80px" align="center">
          <template slot-scope="scoped">{{scoped.row.Sex|Sex}}</template>
      </el-table-column>
      <el-table-column prop="OpenID" label="ID" width="250px" align="center"></el-table-column>
      <el-table-column prop="CardNo" label="卡号" align="center"></el-table-column>
      <el-table-column prop="Mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="Subscribe" label="是否关注" align="center">
          <template slot-scope="scoped">
               {{scoped.row.Subscribe|Subscribe}}
          </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间" align="center"></el-table-column>
      <!-- <el-table-column prop="Source" label="来源"></el-table-column> -->
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
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import _ from "lodash";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      defaultImg:require("@/assets/img/defaule_back.png"),
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      CardNo:"",//卡号查询
    };
  },
  created() {
    this.GetOrderTemplate();
  },
  methods: {
    async GetOrderTemplate() {
      try {
        let { Data } = await getLists(
          {
            Action: "GetMemberList",
            Page: this.currentPage - 1,
            CardNo:this.CardNo
          },
          "MMemberOpera"
        );
        this.tableData = Data.UserList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
      } catch (error) {
        this.$message.error(error);
      }
    },
    searchN(){//卡号查询
      this.GetOrderTemplate();
    },
    clearN(){
      this.CardNo = '';
      this.GetOrderTemplate();
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetOrderTemplate(val);
    },
  },
  filters:{
     Sex(val){
          if(val=='1'){
               return '男'
          }else if(val=='2'){
               return '女'
          }else{
               return '未知'
          }
     },
     Subscribe(val){
          if(val=='1'){
               return '关注'
          }else{
               return '未关注'
          }
     }
  }
};
</script>
<style lang="less" scoped>
.imgWidth{
  width: 60px;
  height: 60px;
}
.input-with-select {
  width: 250px;
}
.marginBottom{
  margin-bottom: 15px;
}
</style>