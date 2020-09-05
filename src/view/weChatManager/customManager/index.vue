<template>
  <div class="customManager">
    <!-- 自定义列表 -->
    <el-button
      type="primary"
      size="small"
      @click="addGood"
      class="marginBottom"
      :disabled="loading"
    >新建自定义模块</el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="Name" label="名称"></el-table-column>
      <el-table-column prop="Name" label="最近应用在"></el-table-column>
      <el-table-column prop="Name" label="共应用次数"></el-table-column>
      <el-table-column prop="Name" label="操作" width="200">
        <template slot-scope="scoped">
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <!-- <el-button type="text" @click="setName(scoped.row)">改名</el-button> -->
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import Del from "@/components/Dialog/del";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false,
      current_index: "",
      current_SID: "",
      // 控制删除弹框
      show: false
    };
  },
  components: { Del },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          { Action: "GetDecorateList" },
          "MShopOpera"
        );
        // console.log(Data,8888)
        this.tableData = Data.DecorateList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    addGood() {
      this.$router.push({ path: "/weChat/manager/custom/addEdit" });
    },
    async editRowGoods(val) {
      try {
        this.$router.push({
          path: "/weChat/manager/custom/addEdit",
          query: { SID: val.SID }
        });
      } catch (e) {
        this.$message.error(e);
      }
    },
    setName() {},
    delRow(row, index) {
      this.show = true;
      this.current_index = index;
      this.current_SID = row.SID;
    },
    delFunction(bool) {
      this.show = bool;
    },
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveDecorate", SID: this.current_SID },
          "MShopOpera"
        );
        this.tableData.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.customManager {
  .marginBottom {
    margin-bottom: 20px;
  }
}
</style>