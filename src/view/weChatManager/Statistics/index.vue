<template>
  <div class="statistics">    
    <div class="summary">
      <p>当天交易情况</p>
      <el-row :gutter="20">
        <el-col :span="6"><div class="">
          <span>近24小时总支付金额</span>
          <span>{{ Summary.SummaryPayAmt }}</span></div></el-col>
        <el-col :span="6"><div class="">
          <span>近24小时总申请退款金额</span>
          <span>{{ Summary.SummaryApplyRefAmt }}</span></div></el-col>
        <el-col :span="6"><div class="">
          <span>近24小时总退款金额</span>
          <span>{{ Summary.SummaryRefAmt }}</span></div></el-col>
        <el-col :span="6"><div class="">
          <span>近24小时总下单数量</span>
          <span>{{ Summary.SummaryCnt }}</span></div></el-col>
      </el-row> 
    </div>
    <div class="orderInfo">
      <p>当天销售情况</p>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <span>近24小时销售订单支付金额</span>
            <span>{{ OrderInfo.SumPayAmt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时销售订单申请退款金额</span>
            <span>{{ OrderInfo.SumApplyRefAmt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时销售订单退款金额</span>
            <span>{{ OrderInfo.SumRefAmt }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <span>近24小时待支付订单数量</span>
            <span>{{ OrderInfo.UnpaidCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时已取消订单</span>
            <span>{{ OrderInfo.CancelCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时申请退款数量</span>
            <span>{{ OrderInfo.ApplyRefCnt }}</span>
          </div>
        </el-col>
      </el-row>      
    </div>
    <div class="RechargeInfo">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <span>近24小时充值订单支付金额</span>
            <span>{{ RechargeInfo.SumPayAmt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时充值订单申请退款金额</span>
            <span>{{ RechargeInfo.SumApplyRefAmt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时充值订单退款金额</span>
            <span>{{ RechargeInfo.SumRefAmt }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <span>近24小时充值待支付订单数量</span>
            <span>{{ RechargeInfo.UnpaidCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时充值已取消订单</span>
            <span>{{ RechargeInfo.CancelCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>近24小时充值申请退款数量</span>
            <span>{{ RechargeInfo.ApplyRefCnt }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 充值订单 -->
    </div>
    <div class="memberInfo">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="">
            <span>当日申请微卡</span>
            <span>{{ MemberInfo.NetCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>当日绑定实体卡</span>
            <span>{{ MemberInfo.ManageCnt }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="">
            <span>当日关注</span>
            <span>{{ MemberInfo.SubscribeCnt }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
  name: "",
  data() {
    return {
      OrderInfo: {}, //销售订单信息
      RechargeInfo: {}, //充值订单信息
      Summary: {}, //
      MemberInfo: {}, //卡信息
    };
  },
  created() {
    this.getRealTimeSummary();
  },
  methods: {
    async getRealTimeSummary() {
      let data = await getLists(
        {
          Action: "RealTimeSummary",
        },
        "MOrderOpera"
      );
      this.OrderInfo = data.Data.OrderInfo ? data.Data.OrderInfo : {};
      this.RechargeInfo = data.Data.RechargeInfo ? data.Data.RechargeInfo : {};
      this.Summary = data.Data.Summary ? data.Data.Summary : {};
      this.MemberInfo = data.Data.MemberInfo ? data.Data.MemberInfo : {};
      let msg = "",
        msg1 = "",
        msg2 = "",
        msg3 = "";
      if (Number(this.OrderInfo.UnpaidCnt) > 0) {
        msg = `<p>销售订单待支付数量：${this.OrderInfo.UnpaidCnt}，请前往<span class="one" style="color:#0066ff;cursor:pointer">查看</span></p>`;
      }
      if (Number(this.RechargeInfo.UnpaidCnt) > 0) {
        msg1 = `<p>充值订单待支付数量：${this.RechargeInfo.UnpaidCnt}，请前往<span class="two" style="color:#0066ff;cursor:pointer">查看</span></p>`;
      }
      if (Number(this.MemberInfo.NetCnt) > 0) {
        msg2 = `<p>申请微卡数量：${this.MemberInfo.NetCnt}，请前往<span class="three" style="color:#0066ff;cursor:pointer">查看</span></p>`;
      }
      if (Number(this.Summary.SummaryApplyRefCnt) > 0) {
        msg3 = `<p>销售订单申请退款数量：${this.Summary.SummaryApplyRefCnt}，请前往<span class="four" style="color:#0066ff;cursor:pointer">查看</span></p>`;
      }
      let Msg = msg + msg1 + msg2 + msg3;
      if(Msg!=''){
        const notify = this.$notify({
          title: "通知消息",
          dangerouslyUseHTMLString: true,
          message: Msg,
          position: "bottom-right",
          duration: 60000,
        });
      }
      
      if (msg != "") {
        notify.$el.querySelector(".one").onclick = () => {
          //销售订单待支付
          this.$router.push({ path: "/weChat/manager/orderList/index" });
        };
      }
      if (msg1 != "") {
        notify.$el.querySelector(".two").onclick = () => {
          //充值订单待支付
          this.$router.push({ path: "/weChat/manager/orderList/wellFuIndex" });
        };
      }
      if (msg2 != "") {
        notify.$el.querySelector(".four").onclick = () => {
          //退款
          this.$router.push({
            path: "/weChat/manager/RefundManage/orderRefund",
          });
        };
      }
      if (msg3 != "") {
        notify.$el.querySelector(".three").onclick = () => {
          //会员卡
          this.$router.push({ path: "/weChat/manager/menmberShipList" });
        };
      }
    },
  },
};
</script>
<style lang="less" scoped>
  .statistics{
    width: 100%;
    background: #fff;
    padding: 20px;
    height: 77vh;
    .summary,.orderInfo,.RechargeInfo,.memberInfo {
    
    }
  }
</style>