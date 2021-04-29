<template>
  <div class>
    <!-- <el-button  type="text"> -->
      <a href="https://lbs.qq.com/getPoint/" target="_blank" class="btn"
        >获取当前经纬度</a
      >
    <!-- </el-button> -->

    <el-table :data="tableData" style="width: 60%" v-loading="loadingTable">
      <el-table-column label="区域名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.Name"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <!-- 经纬度 -->
      <el-table-column label="经纬度">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.Geography"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.SID"
            type="primary"
            size="small"
            @click="addClick(scope.row, scope.$index)"
            >添加</el-button
          >
          <el-button
            v-if="scope.row.SID"
            type="primary"
            size="small"
            @click="addClick(scope.row, scope.$index)"
          >
            更新
          </el-button>

          <el-button
            v-if="scope.row.SID"
            type="text"
            @click="deleteClick(scope.row, scope.$index)"
            >删除</el-button
          >
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
    // this.GeographyAct();
  },
  methods: {
    async getList() {
      this.loadingTable = true;
      try {
        let { Data } = await getLists({ Action: "GetAreaList" }, "MShopOpera");
        this.tableData = Data.AreaList;
        localStorage.setItem('AllAreaList',JSON.stringify(Data.AreaList));
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
          {
            Action: "SetArea",
            SID: row.SID,
            Name: row.Name,
            Geography: row.Geography
          },
          "MShopOpera"
        );
        this.getList();
        this.$message.success("操作成功");
      } catch (e) {
        this.$message.error(e);
      }
    },
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveArea", SID: this.currentSID },
          "MShopOpera"
        );
        this.tableData.splice(this.currentIndex, 1);
        this.$message.success("删除成功");
        this.getList();
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    delFunction(bool) {
      this.show = bool;
    }
    // getCurrentLntLat() {
    //   window.location.href = "https://lbs.qq.com/getPoint/";
    // }
  }
};
</script>

<style lang="less" scoped>
.btn{
  color: #FFF;
  background-color: #409EFF;
  border-color: #409EFF;
  width: 120px;
  text-align:center;
  margin-bottom:20px;
  display: block;
  padding: 7px;
  border-radius: 5px;
}
</style>