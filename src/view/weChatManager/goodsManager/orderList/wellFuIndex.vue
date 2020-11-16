<template>
  <!-- 订单列表 -->
  <div class="orderList-style">    
    <div style="margin-bottom:20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>订单编号：</span>
          <el-input placeholder="查询订单编号" v-model="search.SID" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <span>订单状态：</span>
          <el-select
            v-model="search.State"
            placeholder="请选择订单状态"
            clearable
            @change="changeState"
            class="selectSearch"
          >
            <el-option
              v-for="item in StateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>支付类型：</span>
          <el-select
            v-model="search.PayType"
            placeholder="请选择支付类型"
            clearable
            @change="changeState"
            style="margin-left:5px"
          >
            <el-option
              v-for="item in PayTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList" style="width: 100%" v-loading="loading">
      <el-table-column prop="SID" label="单号"></el-table-column>
      <el-table-column prop="PayAmt" label="支付金额">
        <template slot-scope="scope">{{scope.row.PayAmt}}&nbsp;元</template>
      </el-table-column>
      <el-table-column prop="State" label="订单状态">
        <template slot-scope="scope">{{scope.row.State |orderState}}</template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">查看</el-button>
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
import { getLists } from "@/api/vipCard";
import { stateLists, payTypeLists, deliveryTypeLists } from "@/config/utils";
export default {
  name: "",
  data() {
    return {
      search: {
        searchTime: "",
      },
      dataList: [],
      StateList: stateLists,
      loading: true,
      PayTypeList: payTypeLists,
      DeliveryTypeList: deliveryTypeLists,
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
    };
  },
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        let obj = { Action: "GetOrderList",Page: this.currentPage - 1,OrderType:'1'};
        this.search.StartAddTime = this.search.searchTime
          ? this.search.searchTime[0]
          : "";
        this.search.EndAddTime = this.search.searchTime
          ? this.search.searchTime[1]
          : "";
        obj = Object.assign(obj, this.search);
        let { Data } = await getLists(obj, "MOrderOpera");
        this.dataList = Data.OrderList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
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
      this.getList(val);
    },
    changePicker() {
      // console.log(this.search.searchTime, 8888);
      this.getList();
    },
    changeState() {
      this.getList();
    },
    viewRow(val) {
      // console.log(val,'val')
      this.$router.push("/weChat/manager/orderList/info?SID=" + val.SID);
    },
  },
};
</script>

<style lang="less" scoped>
.orderList-style {
  .selectSearch {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .input-with-select {
    width: 250px;
    margin-left: 10px;
  }
}
</style>