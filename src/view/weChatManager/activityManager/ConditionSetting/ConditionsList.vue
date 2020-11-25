<template>
  <div class="conditions">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="addCondition"
        >添加参与条件方案</el-button
      >
    </div>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%">
      <el-table-column label="方案编号" prop="SID" align="center"></el-table-column>
      <el-table-column label="方案名称" prop="Name" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="editCondition(scoped.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="delCondition(scoped.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
  name: "",
  data() {
    return {
          dataTable: [],
          TotalList:0,//分页总数
          currentPage: 0,
          pageSize:0,
          loading: true,
    };
  },
  created(){
     this.getList();
  },
  methods: {
     addCondition() {
      this.$router.push({ path: "/weChat/manager/activity/ConditionsAddEdit" });
     },
     async getList() {//列表
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetSchemesList",
            Type:'1'
          },
          "MShopOpera"
        );
        this.dataTable = data.Data.SchemesList;
        this.loading = false;
      } catch (e) {
     //    this.$message.error(e);
        this.loading = false;
      }
     },
     editCondition(row){
          this.$router.push({ path: "/weChat/manager/activity/ConditionsAddEdit",query:{SID:row.SID} });
     },
     delCondition(row){      
        this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
        }).then(() => {
              this.delFun(row);
        }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
              });          
        });
     },
     async delFun(row){
        try {
            let Data = await getLists(
              { Action: "RemoveSchemes", SID: row.SID },
              "MShopOpera"
            );
              this.$message.success("删除成功");
              this.getList();
            } catch (e) {
              this.$message.error(e);
            }
        }
  },
};
</script>
<style lang="less" scoped>
</style>