<template>
  <div class="orderInfo-style" v-loading="loading">
    <!-- 订单详情 -->
    <div class="orderFlex">
      <div style="width:100px;">购买的商品：</div>
      <div v-for="item in OrderItem" :key="item.SID" class>
        <el-card class="box-card">
          <el-form ref="form" label-width="50px">
            <el-form-item label="名称:">{{item.Name}}</el-form-item>
            <el-form-item label="图片:">
              <div class="box-card-img">
                <img :src="item.Img|SetImage" />
              </div>
            </el-form-item>
            <el-form-item label="编号:">{{item.ProdNo}}</el-form-item>
            <el-form-item label="口味:" v-if="item.ParamInfo">{{item.ParamInfo}}</el-form-item>
            <el-form-item label="配件:" v-if="item.PartsList">
              <div class="parts-norms-info-one" v-for="(item2,index) in item.PartsList" :key="index">
                <div>
                  <span>{{item2.Name}}</span>
                  <span>
                    ¥{{item2.SalePrice}}/份
                    <span style="margin-left:4px">x{{item2.BuyCnt}}</span>
                  </span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="价格:">¥{{item.SalePrice}}</el-form-item>
            <el-form-item label="数量:" v-if="item.BuyCnt">{{item.BuyCnt}}</el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <div class="orderFlex">
      <div style="width:100px;">基本信息：</div>      
      <el-card class="box-card">
        <el-form ref="form" label-width="120px">
          <el-form-item label="订单状态:">{{OrderInfo.State |orderState2}}</el-form-item>
          <el-form-item label="商城单号:">{{OrderInfo.ExchNo}}</el-form-item>
          <el-form-item label="微信商户订单号:">{{OrderInfo.SID}}</el-form-item>
          <el-form-item label="退款状态:" v-if="OrderInfo.RefundState!=='1'">{{OrderInfo.RefundState |refundStateList}}</el-form-item>
          <el-form-item label="退款类型:" v-if="OrderInfo.RefundState!=='1'">{{Refund.Type}}</el-form-item>
          <el-form-item label="退款原因:" v-if="OrderInfo.RefundState!=='1'">{{Refund.UserRemark}}</el-form-item>
          <el-form-item label="驳回原因:" v-if="OrderInfo.RefundState!=='1'&&Refund.Reply">{{Refund.Reply}}</el-form-item>

          <el-form-item label="订单收货地址:" v-if="OrderInfo.Address">{{OrderInfo.Address}}</el-form-item>
          <el-form-item label="订单收货电话:" v-if="OrderInfo.Mobile">{{OrderInfo.Mobile}}</el-form-item>
          <el-form-item label="订单收货用户:" v-if="OrderInfo.UserName">{{OrderInfo.UserName}}</el-form-item>
          <el-form-item label="订单类型:">{{OrderInfo.DeliveryType |deliveryType}}</el-form-item>
          <el-form-item label="订单支付类型:">{{OrderInfo.PayType |payType}}</el-form-item>
          <el-form-item label="用户备注:" v-if="OrderInfo.UserRemarks">{{OrderInfo.UserRemarks}}</el-form-item>

          <el-form-item label="订单运费:">¥{{OrderInfo.Freight}}</el-form-item>
          <el-form-item label="商品总价">¥{{OrderInfo.ProdAmt}}</el-form-item>
          <el-form-item label="电子券抵扣:" v-if="OrderInfo.TicketAmt>0">¥{{OrderInfo.TicketAmt}}</el-form-item>
          <el-form-item label="积分抵扣:" v-if="OrderInfo.ScoreAmt>0">¥{{OrderInfo.ScoreAmt}}</el-form-item>
          <el-form-item label="优惠金额:" v-if="OrderInfo.DiscAmt>0">¥{{OrderInfo.DiscAmt}}</el-form-item>
          <el-form-item label="订单支付总额:">¥{{OrderInfo.PayAmt}}</el-form-item>
          <el-form-item label="赠送金额:" v-if="OrderInfo.DonateAmt>0">¥{{OrderInfo.DonateAmt}}</el-form-item>
          <el-form-item label="赠送积分:" v-if="OrderInfo.DonateScore>0">¥{{OrderInfo.DonateScore}}</el-form-item>

          <el-form-item label="订单添加时间:">{{OrderInfo.AddTime}}</el-form-item>
          <el-form-item label="用户自取时间" v-if="OrderInfo.DeliveryType ==='1'&& OrderInfo.PickTime">{{OrderInfo.PickTime}}</el-form-item>
          <el-form-item label="配送的时间:" v-else>{{OrderInfo.PickTime}}</el-form-item>
          <el-form-item label="交易完成时间:" v-if="OrderInfo.FinishTime">{{OrderInfo.FinishTime}}</el-form-item>
        </el-form>
      </el-card>     
    </div>
    <div class="orderFlex">
      <div class="info-style" v-if="JSON.stringify(ShopInfo) !== '{}'">
      <div style="width:100px;">取货门店信息：</div>
      <el-card class="box-card">
        <el-form ref="form" label-width="60px">
          <el-form-item label="位置:">{{ShopInfo.Address}}</el-form-item>
          <el-form-item label="经纬度:">{{ShopInfo.Longitude}}；{{ShopInfo.Latitude}}</el-form-item>
          <el-form-item label="名称:">{{ShopInfo.Name}}</el-form-item>
          <el-form-item label="电话:">{{ShopInfo.Tel}}</el-form-item>
        </el-form>
      </el-card>
    </div>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      OrderItem: [],
      OrderInfo: {},
      ShopInfo: {},
      Refund:{},
      loading: true
    };
  },
  components: {},
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        let { Data } = await getLists(
          { Action: "GetOrderInfo", SID: this.$route.query.SID ,OrderType:this.$route.query.type},
          "MOrderOpera"
        );
        this.OrderItem = Data.OrderItem;
        this.OrderInfo = Data.OrderInfo;
        this.ShopInfo = Data.ShopInfo || {};
        this.Refund = Data.Refund||{}
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.orderInfo-style {
  display: flex;
  flex-direction: row;
  .orderFlex{
    flex: 1;
  }
  // .orderInfo-style-box {
  //   flex: 1;
  //   flex-wrap: wrap;
  // }
  .el-form-item {
    margin-bottom: 5px;
  }
  .box-card {
    padding: 10px;
    margin: 10px 10px 10px 0;
  }
  .info-style {
    display: inline-block;
  }
  .box-card-img {
    width: 120px;
    height: 120px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>