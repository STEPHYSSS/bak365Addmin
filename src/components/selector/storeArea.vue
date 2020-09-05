<template>
  <div class>
    <!-- 门店区域下拉列表 -->
    <el-select v-model="value" placeholder="请选择" @change="changeType">
      <el-option v-for="item in list" :key="item.SID" :label="item.Name" :value="item.SID"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      list: [],
      value: ""
    };
  },
  components: {},
  created() {
    if (this.list.length === 0) {
      this.getAreaList();
    }
  },
  methods: {
    async getAreaList() {
      // 门店区域
      try {
        let { Data } = await getLists({ Action: "GetAreaList" }, "MShopOpera");
        this.list = Data.ProdCateList;
      } catch (e) {
        this.$message.error(e);
      }
    },
    changeType(val) {
      this.$emit("changeType", val);
    }
  }
};
</script>

<style lang="less" scoped>
</style>