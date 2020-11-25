<template>
  <div class="entStore">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="addCondition">添加进店送礼</el-button>
    </div>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%">
      <el-table-column prop="Name" label="活动名称" align="center"></el-table-column>
      <el-table-column label="有效时间" align="center" width="290">
        <template slot-scope="scope">{{scope.row.StartDate}}-{{scope.row.EndDate}}</template>
      </el-table-column>
      <el-table-column prop="TimeName" label="活动状态" align="center"></el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scoped">{{scoped.row.Audit | setActiveStatus}}</template>
      </el-table-column>
      <el-table-column label="是否关闭" align="center">
        <template slot-scope="scoped">{{scoped.row.Start | setActiveOpen}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="editCondition(scoped.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="delCondition(scoped.row)"
            >删除</el-button
          >
          <el-button type="text" @click="changeEnable(scoped.row,'Audit')">审核</el-button>
          <el-button type="text" @click="changeEnable(scoped.row,'Start')">关闭</el-button>
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
      loading: true,
      current_Status: "", //审核
      current_Open: "", //关闭
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
            Action: "GetPromotionList",
            Type: "7",
          },
          "MPromotionOpera"
        );
        this.dataTable = data.Data.PromotionList;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
     },
     addCondition() {
        this.$router.push({ path: "/weChat/manager/activity/entCouponAddEdit" });
     },
     editCondition(row) {
      this.$router.push({
      path: "/weChat/manager/activity/entCouponAddEdit",
      query: { SID: row.SID },
      });
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
              { Action: "RemovePromotion", SID: row.SID },
              "MPromotionOpera"
            );
              this.$message.success("删除成功");
              this.getList();
            } catch (e) {
              this.$message.error(e);
            }
        },
     // 是否启用 bool = true 为下架
    async changeEnable(row, val) {
      this.current_Status = row.Audit === "1" ? "0" : "1";
      this.current_Open = row.Start === "1" ? "0" : "1";
      try {
        if (val === "Audit") {
          let data = await getLists(
            {
              Action: "SetPromAudit",
              SID: row.SID,
              Type:'7',
              [val]: this.current_Status,
            },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        } else {
          let data = await getLists(
            { Action: "SetPromStart", SID: row.SID, [val]: this.current_Open,Type:'7' },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        }
      } catch (e) {
        setTimeout(() => {
          row.Start = !row.Start;
        }, 500);
        this.$message.error(e);
      }
    },
  },
  filters: {
    setActiveStatus(val) {
      if (val === "1") {
        return "已审核";
      } else return "未审核";
    },
    //是否启用
    setActiveOpen(val) {
      if (val === "1") {
        return "已启用";
      } else {
        return "已停用";
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>