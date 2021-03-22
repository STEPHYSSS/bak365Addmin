<template>
  <div class="userEva">
    <!-- 用户评价列表 -->
    <el-button
      type="primary"
      size="small"
      @click="addEvaluate"
      class="marginBottom"
      :disabled="loading"
      >添加评价
    </el-button>
    <br />
    <span>商品名称：</span>
    <el-input
      style="width: 188px"
      v-model="search.Name"
      placeholder="请输入内容" 
      clearable
      @clear = "clearN"
    ></el-input>
    <span style="margin-left: 20px">开始时间：</span>
    <el-date-picker
      v-model="search.valueTime"
      type="daterange"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="['00:00:00', '23:59:59']"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:250px"
    >
    </el-date-picker>
    <span style="margin-left: 20px">评价类型：</span>
    <el-select
      v-model="search.Type"
      placeholder="请选择"
      style="margin-bottom: 15px"
    >
      <el-option
        v-for="item in optionsType"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        clearable
      >
      </el-option>
    </el-select>
    <span style="margin-left: 20px">评价显示：</span>
    <el-select v-model="search.IsShow" placeholder="请选择">
      <el-option label="全部" value=""></el-option>
      <el-option label="显示" value="1"></el-option>
      <el-option label="不显示" value="0"></el-option>
    </el-select>
    <div style="margin-top: 15px">
      <el-button
        type="primary"
        size="small"
        @click="searchReply"
        class="marginBottom"
        :disabled="loading"
        >搜索
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Name" label="商品" align="center">
        <template slot-scope="scoped">
          <div>{{ scoped.row.Name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="UserName" label="操作人" align="center">
      </el-table-column>
      <!-- <el-table-column prop="OrderSID" label="订单ID" align="center">
        <template slot-scope="scoped">
          <div v-if="scoped.row.OrderSID">{{ scoped.row.OrderSID }}</div>
          <div v-else>--</div>
        </template>
      </el-table-column> -->
      <el-table-column width="180" label="星级" align="center">
        <template slot-scope="scoped">
          <el-rate v-model="scoped.row.StarClass" disabled text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="显示" align="center">
        <template slot-scope="scoped">
          <el-checkbox
            v-model="scoped.row.IsShow"
            @change="changeShow($event, scoped.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间" align="center">
      </el-table-column>
      <el-table-column width="250" label="操作" align="center">
        <template slot-scope="scoped">
          <el-button
            type="text"
            @click="editRowGoods(scoped.row, scoped.$index)"
            >删除</el-button
          >
          <el-button type="text" @click="view(scoped.row)"
            >查看(回复)</el-button
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
import { optionsType } from "@/config/utils";
export default {
  name: "userEvaluate",
  components: { Del },
  data() {
    return {
      search: {},
      tableData: [],
      loading: true,
      show: false,
      current_index: "",
      current_SID: "",
      optionsType: optionsType,
    };
  },
  created() {
    // console.log(this.$route.query.SID, 8989)
    this.getList();
  },
  methods: {
    async getList() {
      if (this.search.valueTime && this.search.valueTime.length > 0) {
          this.search.StartTime = this.search.valueTime[0];
          this.search.EndTime = this.search.valueTime[1];
        } else {
          this.search.StartTime = "";
          this.search.EndTime = "";
        }
      try {
        this.loading = true;
        let obj = {
          Action: "GetAppraisementList",
          Name: this.search.Name,
          StartTime:this.search.StartTime,
          EndTime:this.search.EndTime,
          IsShow:this.search.IsShow
        };
        Object.assign(obj, this.search);

        let data = await getLists(obj, "MAppraisementOpera");
        // console.log(data)
        this.tableData = data.Data.AppraisementList;
        this.tableData.forEach((D) => {
          D.StarClass = Number(D.StarClass);
          D.IsShow = D.IsShow === "0" ? false : true;
        });
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    async changeShow(bool, row) {
      // 是否启用 0，不现实 1，显示
      let IsShow = bool === true ? 1 : 0;
      try {
        await getLists(
          { Action: "SetShow", SID: row.SID, IsShow: IsShow },
          "MAppraisementOpera"
        );
        this.$message.success("修改成功");
      } catch (e) {
        setTimeout(() => {
          row.IsShow = !row.IsShow;
        }, 500);
        this.$message.error(e);
      }
    },
    addEvaluate() {
      this.$router.push({ path: "/weChat/manager/userEvaluate/info" });
    },
    view(row) {
      this.$router.push({
        path: "/weChat/manager/userEvaluate/info",
        query: { SID: row.SID },
      });
    },
    editRowGoods(row, index) {
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
          { Action: "RemoveAppraisement", SID: this.current_SID },
          "MAppraisementOpera"
        );
        this.show = false;
        this.$message.success("删除成功");
        this.tableData.splice(this.current_index, 1);
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    searchReply() {
      this.getList();
    },
    clearN(){
      this.search.Name = '';
      this.getList();
    }
  },
};
</script>

<style lang="less" scoped>

</style>
