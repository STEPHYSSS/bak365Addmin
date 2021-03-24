<template>
  <div class="entStore">
    <div style="margin-bottom: 20px">
      <el-row>
      <el-col :span="3" style="padding-top:5px">
        <el-button type="primary" size="small" @click="addCondition">添加直接送券</el-button>
      </el-col>
      <el-col :span="21">
        <span>名 称：</span>
        <el-input placeholder="请输入活动名称" v-model="Name" clearable @clear = "clearN" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
        </el-input>&nbsp;&nbsp;
          <span>赠送时间：</span>
          <el-date-picker
            v-model="StartTime"
            :editable="false"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeTime">
          </el-date-picker>
        </el-col>
    </el-row>
    </div>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%">
      <el-table-column prop="TicketNo" label="编号" align="center"></el-table-column>  
      <el-table-column prop="TicketName" label="名称" align="center"></el-table-column>      
      <el-table-column prop="TicketCnt" label="赠送数量" align="center"></el-table-column>      
      <el-table-column prop="AddTime" label="赠送时间" align="center"></el-table-column>       
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
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
  name: "",
  data() {
    return {
      dataTable: [],
      loading: true,
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      StartTime:'',
      EndTime:'',
      Name:""
    };
  },
  created() {
    this.getList();
  },
  methods: {     
     async getList() {
      //列表
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetTicketList",
            Page: this.currentPage - 1,
            TicketName:this.Name,
            StartAddTime:this.StartTime
          },
          "MLogOpera"
        );
        this.dataTable = data.Data.SendTicketList;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
     },
     addCondition() {
        this.$router.push({ path: "/weChat/manager/activity/directCouponAddEdit" });
     },
     searchN(){
       this.getList();
     },
     clearN(){
       this.Name = "";
       this.getList();
     },
     changeTime(){
      this.getList();
    },
  },
};
</script>
<style lang="less" scoped>
.el-input{
  width: 200px;
}
</style>