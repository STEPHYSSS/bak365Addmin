<template>
  <div class>
      <div style="margin-bottom:20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <span>退款编号：</span>
          <el-input placeholder="查询退款编号" v-model="search.SID" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <span>退款状态：</span>
          <el-select
            v-model="search.State"
            placeholder="请选择退款状态"
            clearable
            @change="changeState"
            class="selectSearch"
          >
            <el-option
              v-for="item in refundStateTypeLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <span>开始时间：</span>
          <el-date-picker
            v-model="search.StartRefundTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss"
            @change="changeTime">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">        
        <el-col :span="6">
          <span>结束时间：</span>
          <el-date-picker
            v-model="search.EndRefundTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd hh:mm:ss"
            @change="changeTime">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList" v-loading="loading">
      <el-table-column prop="SID" label="单号"></el-table-column>
      <el-table-column prop="UserName" label="收货人姓名"></el-table-column>
      <el-table-column prop="PayAmt" label="支付金额">
        <template slot-scope="scope">{{scope.row.PayAmt}}&nbsp;元</template>
      </el-table-column>      
      <el-table-column prop="DeliveryType" label="用户手机号码">
        <template slot-scope="scope">{{scope.row.Mobile}}</template>
      </el-table-column>
      <el-table-column prop="RefundTime" label="申请退款时间"></el-table-column>
      <el-table-column prop="RefCompleteTime" label="退款完成时间"></el-table-column>
      <el-table-column prop="AddTime" label="添加时间"></el-table-column>
      <el-table-column prop="RefundState" label="退款状态">
        <template slot-scope="scope">{{scope.row.RefundState |orderRefund}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">查看</el-button>
          <el-button type="text" @click="examine(scope.row)" v-if="scope.row.RefundState == '2'">审核</el-button>
          <el-button type="text"  @click="examine(scope.row)" v-if="scope.row.RefundState == '1'||scope.row.RefundState == '4'">退款</el-button>
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
<!-- 回复审核弹框 -->
    <el-dialog title="审核处理" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
      <el-form ref="form" :model="formObj" label-width="90px">
        <el-form-item label="退款原因：">{{formObj.Type}}</el-form-item>
        <el-form-item label="退款说明：">{{formObj.UserRemark}}</el-form-item>
        <el-form-item label="操作原因：">
          <el-input style="width:250px" v-model="Reply" type="textarea" :maxlength="128"></el-input>
          <div style="color:#999">用于给用户展示，驳回的时候填写</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitAdopt(true)" v-if="formObj.RefundState=='2'">驳回审核</el-button>
        <el-button type="primary" @click="submitAdopt(false)">通过审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import { refundStateTypeLists, payTypeLists, deliveryTypeLists } from "@/config/utils";
export default {
  name: "",
  data() {
    return {
      search: {
        searchTime: "",
        State:'2'
      },   
      dataList: [],
      formObj: {},
      loading: true,
      dialogVisible: false,
      Reply: "",
      refundStateTypeLists: refundStateTypeLists,
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
    this.getInfo();
  },
  methods: {
     changeState() {
      this.getInfo();
     },
     changeTime(){
          this.getInfo();
     },
    async getInfo() {
      try {
        let obj = { Action: "GetOrderList", RefundState: this.search.State,OrderType:'2',SID:this.search.SID };
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
    examine(val) {
      this.formObj = val;
      this.dialogVisible = true;
    },
    async submitAdopt(val) {
      if (!this.Reply && val) {
        this.$message("请填写原因");
        return;
      }
      let obj = { Action: "DisposeRefund" };
      let type = val ? 4 : 3;
      Object.assign(obj, {
        SID: this.formObj.SID,
        RefundState: type,
        Reply: this.Reply,
        OrderType:this.formObj.OrderType
      });
      try {
        await getLists(obj, "MOrderOpera");
        this.Reply = "";
        this.$message.success("操作成功");
        this.dialogVisible = false;
        setTimeout(() => {
          this.getInfo();
        }, 1000);
      } catch (e) {
        this.$message.error(e);
      }
    },
//     退款
    viewRow(val) {
      this.$router.push("/weChat/manager/orderList/info?SID=" + val.SID);
    },
    handleClose(done) {
      this.Reply = "";
      done();
    }
  }
};
</script>

<style lang="less" scoped>
  .selectSearch {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .input-with-select {
    width: 250px;
    margin-left: 10px;
  }  
</style>