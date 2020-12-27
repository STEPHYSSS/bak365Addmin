<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Name" label="名称" width="350" align="center"></el-table-column>
      <el-table-column label="网址链接">
        <template slot-scope="scoped">{{scoped.row.codeUrl}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="copyUrl(scoped.row)">活动商品链接</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import { seckill } from "@/config/index";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      seckill: seckill //秒杀链接
    };
  },
  created() {
    this.getActiveList();
  },
  methods: {
    async getActiveList() {
      //获取秒杀 拼团活动信息+活动明细
      try {
        let data = await getLists(
          { Action: "GetPromInfoUrl" },
          "MPromotionOpera"
        );
        if (data.Data.PromList) {
          this.tableData = data.Data.PromList;
          this.tableData.forEach(D => {
            D.codeUrl = this.seckill + "?SID=" + D.SID;
          });
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    copyUrl(row) {
      row.ItemList.forEach(D => {
        D.goodsUrl = this.seckill + "?SID=" + D.SID;
      });
    }
    // 后台 MPromotionOpera  GetPromInfoUrl  获取秒杀 拼团活动信息+活动明细
  }
};
</script>
<style lang="less" scoped>
</style>
