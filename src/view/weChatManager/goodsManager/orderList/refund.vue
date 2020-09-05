<template>
  <div class>
    <!-- 回复审核弹框 -->
    <el-table :data="dataList" v-loading="loading">
      <el-table-column prop="SID" label="单号"></el-table-column>
      <el-table-column prop="UserName" label="收货人姓名"></el-table-column>
      <el-table-column prop="PayAmt" label="支付金额">
        <template slot-scope="scope">{{scope.row.PayAmt}}&nbsp;元</template>
      </el-table-column>
      <el-table-column prop="State" label="订单状态">
        <template slot-scope="scope">{{scope.row.State |orderState}}</template>
      </el-table-column>
      <el-table-column prop="DeliveryType" label="用户手机号码">
        <template slot-scope="scope">{{scope.row.Mobile}}</template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">查看</el-button>
          <el-button type="text" @click="examine(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

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
        <el-button @click="submitAdopt(true)">驳回审核</el-button>
        <el-button type="primary" @click="submitAdopt(false)">通过审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      dataList: [],
      formObj: {},
      loading: true,
      dialogVisible: false,
      Reply: ""
    };
  },
  components: {},
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        // 获取商品列表
        // , OrderType: 2
        let obj = { Action: "GetOrderList", RefundState: 2 };
        let { Data } = await getLists(obj, "MOrderOpera");
        this.dataList = Data.OrderList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
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
        Reply: this.Reply
      });
      try {
        await getLists(obj, "MOrderOpera");
        this.Reply = "";
        this.$message.success("操作成功，可在订单列表查询该订单");
        this.dialogVisible = false;
        setTimeout(() => {
          this.getInfo();
        }, 1000);
      } catch (e) {
        this.$message.error(e);
      }
    },
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
</style>