<template>
  <div class>
    <!-- 门店区域列表 -->
    <el-table :data="tableData" style="width: 60%" v-loading="loadingTable">
      <el-table-column label="区域名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.Name"
            placeholder="请输入内容"
            @blur="editArea(scope.row,scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.SID"
            type="text"
            @click="deleteClick(scope.row,scope.$index)"
          >删除</el-button>
          <el-button
            v-if="!scope.row.SID"
            type="primary"
            size="small"
            @click="addClick(scope.row,scope.$index)"
          >添加</el-button>
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
      show: false,
      loadingTable: true,
      currentSID: "",
      currentIndex: ""
    };
  },
  components: { Del },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loadingTable = true;
      try {
        let { Data } = await getLists({ Action: "GetAreaList" }, "MShopOpera");
        this.tableData = Data.AreaList;
        this.tableData.push({});
        this.loadingTable = false;
      } catch (e) {
        this.loadingTable = false;
        this.$message.error(e);
        this.loading = false;
      }
    },
    deleteClick(row, i) {
      this.currentSID = row.SID;
      this.currentIndex = i;
      this.show = true;
    },
    async addClick(row, i) {
      try {
        await getLists(
          { Action: "SetArea", SID: row.SID, Name: row.Name },
          "MShopOpera"
        );
        this.getList();
        this.$message.success("操作成功");
      } catch (e) {
        this.$message.error(e);
      }
    },
    editArea() {},
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveArea", SID: this.currentSID },
          "MShopOpera"
        );
        this.tableData.splice(this.currentIndex, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    delFunction(bool) {
      this.show = bool;
    }
  }
};
</script>

<style lang="less" scoped>
</style>