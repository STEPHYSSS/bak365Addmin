<template>
  <div class="memberFootPrint">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="ProdNo" label="商品编号"></el-table-column>
      <el-table-column prop="Name" label="商品名称"></el-table-column>
      <el-table-column prop="CateSID" label="分类编号"></el-table-column>
      <el-table-column prop="SalePrice" label="销售价格"></el-table-column>
      <el-table-column prop="Img" label="商品图片">
        <template slot-scope="scoped">
          <el-row>
            <el-col :span="12" class="goodsInfo">
              <img :src="scoped.row.Img" alt />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="Count" label="浏览次数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false
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
            Action: "GetFootPrint"},
          "MMemberOpera"
        );
        this.tableData = Data.FootPrintList;
        //  console.log(this.data)
        // let setImg = this.currentGoods ? "Img" : "ImgList";
        // this.data.forEach(D => {
        //   D.ImgList = D[setImg] ? D[setImg].split(",") : [];
        //   D.ImgList.forEach((data, index) => {
        //     D.ImgList[index] = process.env.Prefix + data;
        //   });
        //   this.$set(D, "State", D.State === "0" ? true : false);
        // });
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
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
</style>