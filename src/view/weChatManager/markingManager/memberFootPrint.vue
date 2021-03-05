<template>
  <div class="memberFootPrint">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
      <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="CateName" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="SalePrice" label="销售价格" align="center"></el-table-column>
      <el-table-column label="商品图片" width="80px" align="center">
        <template slot-scope="scoped">
          <img :src="scoped.row.Img | SetImage" alt="" class="imgWidth">
        </template>
      </el-table-column>
      <el-table-column prop="Count" label="浏览次数" align="center"></el-table-column>
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
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false,
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
    };
  },
  mounted() {
    this.getFootPrint();
  },
  methods: {
    // 获取列表
    async getFootPrint() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          { 
            Action: "GetFootPrint",Page: this.currentPage - 1 },
          "MMemberOpera"
        );
        this.tableData = Data.FootPrintList;
        
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getFootPrint(val);
      },
  },
  filters:{
    checkTip(val){
      if(val == '1'){
        return '已审核'
      }else return '未审核'
    }
  },
};
</script>

<style lang="less" scoped>
.memberFootPrint {
  .goodsInfo {
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
  }
  
}
.imgWidth{
  display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
  }
</style>