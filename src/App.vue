<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
  name: "App",
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true,
      OrderInfo: {}, //销售订单信息
      RechargeInfo: {}, //充值订单信息
      Summary: {}, //
      MemberInfo: {}, //卡信息
      timer:''
    }
  },
  created() {
    if (typeof Array.prototype.forEach != "function") {
      Array.prototype.forEach = function(fn, context) {
        for (let k = 0, length = this.length; k < length; k++) {
          if (
            typeof fn === "function" &&
            Object.prototype.hasOwnProperty.call(this, k)
          ) {
            fn.call(context, this[k], k, this);
          }
        }
      };
    }
  },
  mounted(){
    this.timer = setInterval(() => {
      this.getRealTimeSummary()
    }, 600000);
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
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
      let notify ;
      if(Msg!=''){
        notify = this.$notify({
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
  }
};
</script>

<style lang="less">
@import "./assets/css/index.less";
@import "./assets/icon/iconfont.css";

.el-message {
  z-index: 5000 !important;
}
body {
  background-color: #fff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "12px Extra Small";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
}
a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  // line-height: initial;
  }
p {
  line-height: initial;
}
input {
  background: none;
  outline: none;
  border: none;
}

.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  height: 10px;
}
.block{
    background: #fff;
    text-align: right;
    padding: 10px 0;
  }
// .preserveStyle {
//   position: fixed;
//   background: #fff;
//   width: 100%;
//   text-align: center;
//   transform: translateX(-30px);
//   bottom: 0;
//   z-index: 1100;
//   padding: 15px 0;
// }
// .preserveStyle button {
//   transform: translateX(-80px);
// }

.preserveStyle {
  position: fixed;
  background: #fff;
  width: 100%;
  text-align: center;
  transform: translateX(-30px);
  bottom: 0;
  z-index: 1100;
  padding: 15px 0;
}
.preserveStyle button {
  transform: translateX(-80px);
}
.m-colorPicker .box{
  width: 214px !important;
}
.m-colorPicker .hd .colorView{
  width: 30px !important;
}
.m-colorPicker .colorBtn{
  width: 30px !important;
  height: 30px !important;
}
.el-table__body tr.current-row>td{
  background-color: #c1d7ec;
}
</style>
