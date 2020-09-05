<template>
  <!-- 订单列表 -->
  <div class="orderList-style">
    <div style="margin-bottom:20px;">
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

      <el-select
        v-model="search.DeliveryType"
        placeholder="请选择配送方式"
        clearable
        @change="changeState"
        style="margin-left:5px"
      >
        <el-option
          v-for="item in DeliveryTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-date-picker
        style="margin-left:5px"
        v-model="search.searchTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changePicker"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>

      <el-input placeholder="查询订单编号" v-model="search.SID" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
      </el-input>
      <el-input placeholder="查询手机手机号" v-model="search.Mobile" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
      </el-input>
    </div>
    <el-table :data="dataList" style="width: 100%" v-loading="loading">
      <el-table-column prop="SID" label="单号"></el-table-column>
      <el-table-column label="收货人姓名">
        <template slot-scope="scoped">
          <span v-if="scoped.row.UserName">{{scoped.row.UserName}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="PayAmt" label="支付金额">
        <template slot-scope="scope">{{scope.row.PayAmt}}&nbsp;元</template>
      </el-table-column>
      <el-table-column prop="State" label="订单状态">
        <template slot-scope="scope">{{scope.row.State |orderState}}</template>
      </el-table-column>
      <el-table-column prop="DeliveryType" label="用户手机号码">
        <template slot-scope="scoped">
          <span v-if="scoped.row.Mobile">{{scoped.row.Mobile}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        searchTime: ""
      },
      dataList: [],
      StateList: stateLists,
      loading: true,
      PayTypeList: payTypeLists,
      DeliveryTypeList: deliveryTypeLists
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
        // 获取商品列表
        // , OrderType: 2
        let obj = { Action: "GetOrderList" };
        this.search.StartAddTime = this.search.searchTime
          ? this.search.searchTime[0]
          : "";
        this.search.EndAddTime = this.search.searchTime
          ? this.search.searchTime[1]
          : "";
        obj = Object.assign(obj, this.search);
        let { Data } = await getLists(obj, "MOrderOpera");
        this.dataList = Data.OrderList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
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
    }
  }
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