<template>
  <div class="satisfyList">
    <el-row class="showStopGood">
      <el-col :span="4" style="line-height: 50px">
        <el-button
          size="small"
          type="primary"
          style="margin-left: 10px; margin-top: 10px"
          @click="addSatisfy"
          >添加满足赠送活动</el-button
        >
      </el-col>
      <el-col :span="20">
        <div style="margin-top: 5px">
          开始时间：<el-input placeholder="请输入商品名称" class="widthW" ></el-input>
          结束时间：<el-input placeholder="请输入商品名称" class="widthW" ></el-input>
          <el-button slot="append" >查询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableDate" v-loading="loading" style="width: 100%;">
      <el-table-column label="活动名称" prop="Name" align="center"></el-table-column>
      <el-table-column label="开始时间" prop="StartDate" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="EndDate" align="center"></el-table-column>
      <el-table-column label="触发条件" prop="PromWhere" align="center"></el-table-column>
      <el-table-column label="所属城市" prop="" align="center"></el-table-column>
      <el-table-column label="活动状态" prop="TimeName" align="center"></el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scoped">         
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
        </template>
      </el-table-column>      
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
import Pagination from "@/components/pagination/index";
import { getLists } from "@/api/vipCard";
export default {
  name: "satisfyList",
  data() {
    return {
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0,
      loading:false,
      tableDate:[]
    };
  },
  created(){
    this.getList();
  },
  methods: {
     async getList() {//获取列表
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetPromotionList",
            Type: "6",
            Page: this.currentPage - 1,
          },
          "MPromotionOpera"
        );
        this.tableDate = data.Data.PromotionList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
      
     },
     addSatisfy(){//新增
        this.$router.push({path:'/weChat/manager/activity/satisfyAddEdit'})
     },
     editRowGoods(row){//编辑
      this.$router.push({ path: "/weChat/manager/activity/satisfyAddEdit",
        query: { SID: row.SID },
      });
     },
     delRow(row){//删除
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
            { Action: "RemovePromotion", SID: row.SID,Type:'6' },
            "MPromotionOpera"
          );
            this.$message.success("删除成功");
            this.getList();
          } catch (e) {
            this.$message.error(e);
        }
      },
     handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
     },
     handleCurrentChange(val) {
          this.currentPage = val;
          // this.getList(val);
     },
  },
};
</script>
<style lang="less" scoped>
.satisfyList {
     .showStopGood{
          margin-bottom: 20px;
     }
  .widthW {
    width: 170px;
  }
}
</style>