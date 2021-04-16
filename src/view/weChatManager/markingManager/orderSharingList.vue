<template>
<!-- 推广订单 -->
  <div class="orderSharingList">
    <!-- <el-input v-model="search.Name" placeholder="搜索" style="width: auto" @keyup.enter.native="searchName" class="marginBottom">
      <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    </el-input> -->
    订单状态：<el-select v-model="search.State" placeholder="请选择" clearable class="marginBottom">
      <el-option v-for="item in sharingStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    退款状态：<el-select v-model="search.RefundState" placeholder="请选择" clearable class="marginBottom">
      <el-option v-for="item in sharingRefund" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="OrderSID" label="订单号"></el-table-column>
      <el-table-column prop="Name" label="商品名称"></el-table-column>
      <el-table-column label="商品图片" prop="Img">
        <template slot-scope="scoped">
          <div class="goodsInfo">
            <img :src="scoped.row.Img | addPre" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="SalePrice" label="售价"></el-table-column>
      <el-table-column prop="BuyCnt" label="购买数量"></el-table-column>
      <el-table-column prop="Score" label="积分"></el-table-column>
      <!-- <el-table-column label="订单类型">
        <template slot-scope="scope">{{scope.row.OrderType | orderTip}}</template>
      </el-table-column> -->
      <el-table-column label="订单状态">
        <template slot-scope="scope">{{scope.row.State | statusTip}}</template>
      </el-table-column>
      <el-table-column label="退款状态">
        <template slot-scope="scope">{{scope.row.RefundState | RefundTip}}</template>
      </el-table-column>
      <el-table-column label="支付类型">
        <template slot-scope="scope">{{scope.row.PayType | PayTypeTip}}</template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间">
        <!-- <template slot-scope="scope">{{scope.row.AddTime | checkTip}}</template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import {sharingStatus,sharingRefund} from '@/config/utils'
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false,
      search: {
        State: "",//名称
        RefundState:""//审核状态
      },
      sharingStatus:sharingStatus,
      sharingRefund:sharingRefund,
      current_Audit: "",
      current_SID: "",      
      show: false// 控制审核弹框
    };
  },
  created(){
    this.getSharingList();
  },
  methods: {
    // 获取列表
    async getSharingList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          { 
            Action: "GetOrderSpread",
            State:this.search.State,
            RefundState:this.search.RefundState
          },
          "MOrderOpera"
        );
        this.tableData = Data.OrderList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 查询
    searchName() {
      // 名称搜索
      // this.page.current_page = 1;
      this.getSharingList();
    },
    
  },
  filters: {
    addPre(val) {
      if (val) {
        return process.env.Prefix + val;
      } else {
        return "";
      }
    }
  },
};
</script>

<style lang="less" scoped>
.orderSharingList {
  .marginBottom {
    margin-bottom: 20px;
  }
  .el-select{
    margin-right: -6px;
  }
  .goodsInfo {
  width: 50px;
  height: 50px;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
}
}
</style>