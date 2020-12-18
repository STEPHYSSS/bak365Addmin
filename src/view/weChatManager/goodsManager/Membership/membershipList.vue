<template>
  <div class="orderNotify">
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
      defaultImg:require("@/assets/img/defaule_back.png")
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
          },
          "MMemberOpera"
        );
        this.tableData = Data.UserList;
      } catch (error) {
        this.$message.error(error);
      }
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
</style>