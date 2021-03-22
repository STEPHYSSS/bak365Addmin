<template>
  <div class="conditions">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="addCondition"
        >添加参与条件方案</el-button
      >
    </div>
    <active-search-box-2 ref="activeSearch" @searchList="searchList"></active-search-box-2>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%">
      <!-- <el-table-column label="方案编号" prop="SID" align="center"></el-table-column> -->
      <el-table-column label="方案名称" prop="Name" align="center"></el-table-column>
      <el-table-column label="开始时间" prod="StartDate" align="center">
        <template slot-scope="scoped">{{scoped.row.StartDate}}</template>
      </el-table-column>
      <el-table-column label="结束时间" prod="EndDate" align="center">
        <template slot-scope="scoped">{{scoped.row.EndDate}}</template>
      </el-table-column>
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
import activeSearchBox2 from '@/components/Dialog/activeSearchBox/activeSearchBox2.vue';
export default {
  components: { activeSearchBox2 },
  name: "",
  data() {
    return {
          dataTable: [],
          TotalList:0,//分页总数
          currentPage: 0,
          pageSize:0,
          loading: true,
          search:{}
    };
  },
  created(){
     this.getList();
  },
  methods: {
     addCondition() {
      this.$router.push({ path: "/weChat/manager/activity/ConditionsAddEdit" });
     },
     searchList(val){//搜索
       this.search = val;
       this.getList();
     },
     async getList() {//列表
      this.loading = true;
      try {
        // let data = await getLists(
        //   {
        //     Action: "GetSchemesList",
        //     Type:'1'
        //   },
        //   "MShopOpera"
        // );
        let obj = { Action: "GetSchemesList",Type:1};
        obj = Object.assign(obj, this.search);
        let data = await getLists(obj, "MShopOpera");
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