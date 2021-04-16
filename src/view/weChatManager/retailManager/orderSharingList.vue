<template>
  <!-- 推广订单 -->
  <div class="orderSharingList">
    <!-- <el-input v-model="search.Name" placeholder="搜索" style="width: auto" @keyup.enter.native="searchName" class="marginBottom">
      <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    </el-input> -->
    <!-- 订单状态：<el-select v-model="search.State" placeholder="请选择" clearable class="marginBottom">
      <el-option v-for="item in sharingStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <el-button
      slot="append"
      icon="el-icon-search"
      @click="searchName"
    ></el-button> -->
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <span>退款状态：</span>
        <el-select
      v-model="search.RefundState"
      placeholder="请选择"
      clearable
      class="marginBottom"
    >
      <el-option
        v-for="item in sharingRefund"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></el-option>
    </el-select>
    <el-button
      slot="append"
      icon="el-icon-search"
      @click="searchName"
    ></el-button>
      </el-col>
      <el-col :span="6">
      <span class="spanWidth">开始时间：</span>
      <el-date-picker
        v-model="search.StartAddTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeTime"
      >
      </el-date-picker>
    </el-col>
      <el-col :span="6">
      <span class="spanWidth">结束时间：</span>
      <el-date-picker
        v-model="search.EndAddTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeTime"
      >
      </el-date-picker>
    </el-col>
      <el-col :span="6">
      <span class="spanWidth">支付类型：</span>
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
    <el-row :gutter="20">
     <el-col :span="6">
      <span class="spanWidth">返佣状态：</span>
      <el-select
        v-model="search.RebateState"
        placeholder="请选择返佣状态"
        clearable
        @change="changeRebateState"
        style="margin-left:5px"
      >
        <el-option
          v-for="item in AddRebateState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    </el-row>
  </div>
  <div style="margin-bottom:20px;"></div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="OrderSID" label="单号" width="260px">
        <template slot-scope="scope">
          商城单号：{{ scope.row.ExchNo }}<br />
          商户单号：{{ scope.row.SID }}
        </template>
      </el-table-column>
      <el-table-column label="订单来源">
        <template slot-scope="scope">
          <p v-if="scope.row.PromType === '1'">
            秒杀订单/{{ scope.row.PromName }}
          </p>
          <p v-else-if="scope.row.PromType === '5'">
            拼团订单/{{ scope.row.PromName }}
          </p>
          <p v-else>普通订单</p>
        </template>
      </el-table-column>
      <el-table-column label="用户信息" prop="Img" width="200px">
        <template slot-scope="scope">
          用户名：{{ scope.row.UserName }}<br />
          手机号：{{ scope.row.Mobile }}
        </template>
      </el-table-column>
      <el-table-column label="配送方式">
        <template slot-scope="scope">
          {{ scope.row.DeliveryType | peiSongWay }}
        </template>
      </el-table-column>
      <el-table-column prop="PayAmt" label="支付金额" align="center"></el-table-column>
      <el-table-column label="支付状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.PayType | payZhuangTai }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">{{
          scope.row.State | statusTip
        }}</template>
      </el-table-column>
      <el-table-column
        prop="AddTime"
        label="下单时间"
        width="150px"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
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
        :total="TotalList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import {
  sharingStatus,
  sharingRefund,
  payTypeLists,
  AddRebateState,
  deliveryTypeLists
  // commonOrder
} from "@/config/utils";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false,
      search: {
        PayType: "", //支付类型
        RefundState: "" //审核状态
      },
      sharingStatus: sharingStatus,
      sharingRefund: sharingRefund,
      PayTypeList: payTypeLists,
      AddRebateState:AddRebateState,
      current_Audit: "",
      current_SID: "",
      show: false, // 控制审核弹框
      TotalList: 0,
      currentPage: 0,
      pageSize: 0
      // commonOrder: commonOrder
    };
  },
  created() {
    this.getSharingList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      console.log("我是你要找的val", val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSharingList();
    },
    changeTime() {
      this.getSharingList();
    },
    changeState() {
      this.getSharingList();
    },
    changeRebateState(){
      this.getSharingList();
    },
    // 获取列表
    async getSharingList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          {
            Action: "GetOrderSpread",
            State: this.search.State,
            RefundState: this.search.RefundState,
            PayType: this.search.PayType,
            StartAddTime: this.search.StartAddTime,
            EndAddTime: this.search.EndAddTime,
            RebateState: this.search.RebateState,
            Page: this.currentPage - 1,
          },
          "MOrderOpera"
        );
        this.tableData = Data.OrderList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    viewRow(val) {
      // console.log("我是你要找的val",val);
      this.$router.push(
        "/weChat/manager/orderList/info?SID=" + val.SID + "&type=2"
      );
    },
    // 查询
    searchName() {
      // 名称搜索
      // this.page.current_page = 1;
      this.getSharingList();
    }
  },
  filters: {
    addPre(val) {
      if (val) {
        return process.env.Prefix + val;
      } else {
        return "";
      }
    },
    peiSongWay(val) {
      if (val === "1") {
        return "到点取餐";
      } else if (val === "2") {
        return "外卖配送";
      }
    },
    payZhuangTai(val) {
      if (val === "1") {
        return "微卡支付";
      } else if (val === "2") {
        return "微信支付";
      }
    }
    // OrderSource(val) {
    //   if (val === "2") {
    //     return "普通订单";
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.orderSharingList {
  .marginBottom {
    margin-bottom: 20px;
  }
  .el-select {
    margin-right: -6px;
  }
  .goodsInfo {
    width: 50px;
    height: 50px;
    border: 1px solid #eee;
    text-align: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>