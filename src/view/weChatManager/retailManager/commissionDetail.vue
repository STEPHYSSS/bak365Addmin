<template>
  <div class="commissionDetail">
    <fieldset class="Rebate">
      <legend class="RebateInfo">基本信息</legend>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>团长编号：{{ tablObj.LeaderSID }}</span>
        </el-col>
        <el-col :span="8">
          <span>返佣金额：</span>
          <span style="color:red">{{ tablObj.Money }}</span>
        </el-col>
        <el-col :span="8">
          <span>返佣状态：</span>
          <span style="color:red">{{ tablObj.State | servantStaus }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>是否返佣：</span>
          <span style="color:red">{{ tablObj.IsRebate | IsRebateTip }}</span>
        </el-col>
        <el-col :span="8">
          <span>提交时间：{{ tablObj.AddTime }}</span>
        </el-col>
      </el-row>
    </fieldset>
    <fieldset class="Leader">
      <legend class="leaderInfo">团长信息</legend>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- <span>头像</span> -->
          <img
            :src="tablObj.Headimgurl"
            alt=""
            class="imgWidth"
            style="width:60px;height:60px;"
          />
        </el-col>
        <el-col :span="8">
          <span>名称：{{ tablObj.NickName }}</span>
        </el-col>
        <el-col :span="8">
          <span>微卡卡号：{{ tablObj.CardNo }}</span>
        </el-col>
        <el-col :span="8">
          <span>支付宝账号：{{ tablObj.AlipayAccount }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>微信账号：{{ tablObj.WeChatAccount }}</span>
        </el-col>
        <el-col :span="8">
          <span>手机号：{{ tablObj.Mobile }}</span>
        </el-col>
        <el-col :span="8">
          <span>审核状态：{{ tablObj.Audit | checkTip }}</span>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <span>分享码：{{tablObj.ShareCode}}</span>
        </el-col>
      </el-row> -->
    </fieldset>
    <!-- 打款信息 -->
    <div class="RemitBox">
      <fieldset class="Leader">
        <legend class="leaderInfo">打款方式</legend>
        <!-- <span style="display:inline-block"></span><p style="width:200px">
        <el-input type="textarea" :rows="2" placeholder="选填，不超过50个字符" v-model="Remarks"></el-input>
        </p>-->

        <div>
          <span>打款方式：</span>
          <span>
            <el-radio v-model="paymentType" label='1' v-if="tablObj.CardNo!==''">微卡卡号</el-radio>
            <el-radio v-model="paymentType" label='2' v-if="tablObj.WeChatAccount !== ''">微信</el-radio>
            <el-radio v-model="paymentType" label='3' v-if="tablObj.AlipayAccount !== ''">支付宝</el-radio>
            <!-- <el-button v-if="tablObj.CardNo!=''" @click="paymentInfo(tablObj.CardNo, '1')"
              >微卡卡号</el-button
            >
            <el-button v-if="tablObj.WeChatAccount!=''" @click="paymentInfo(tablObj.WeChatAccount, '2')"
              >微信</el-button
            >
            <el-button v-if="tablObj.AlipayAccount!=''" @click="paymentInfo(tablObj.AlipayAccount, '3')"
              >支付宝</el-button
            > -->
          </span>


          <!-- <span v-if="tablObj.State == '1'">
            <el-radio v-model="Type" label="1">微卡卡号</el-radio>
            <el-radio v-model="Type" label="2">微信</el-radio>
            <el-radio v-model="Type" label="3">支付宝</el-radio> -->
            <!-- <el-button v-if="tablObj.CardNo!=''" @click="paymentInfo(tablObj.CardNo, '1')"
              >微卡卡号</el-button
            >
            <el-button v-if="tablObj.WeChatAccount!=''" @click="paymentInfo(tablObj.WeChatAccount, '2')"
              >微信</el-button
            >
            <el-button v-if="tablObj.AlipayAccount!=''" @click="paymentInfo(tablObj.AlipayAccount, '3')"
              >支付宝</el-button
            > -->
          <!-- </span> -->
        </div>
        <br />
        <div class style="display:flex;margin-bottom:30px">
          <p style="width:55px;line-height:54px">备 注：</p>
          <p style="width:277px">
            <el-input
              type="textarea"
              :maxlength="50"
              :rows="2"
              placeholder="选填，不超过50个字符"
              v-model="Remarks"
            ></el-input>
          </p>
        </div>

        <div>
          <el-button @click="cancelFun" style="margin-left: 50px"
            >返回</el-button
          >
          <el-button
            type="primary"
            style="margin-left: 50px"
            @click="preserveFun"
            v-if="tablObj.State !== '2'"
            >保存</el-button
          >
        </div>

        <div v-show="hideRemit" class="info">
          <el-row :gutter="20">
            <el-col :span="8">
              <span>账 号：{{ tablObj.Account }}</span>
            </el-col>
            <el-col :span="8">
              <span>会员返佣编号：{{ tablObj.RebateSID }}</span>
            </el-col>
            <el-col :span="8">
              <span>汇款流水单号：{{ tablObj.RebateSID }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <span>汇款金额：{{ tablObj.PO }}</span>
            </el-col>
            <el-col :span="8">
              <span>
                汇款截图：
                <img :src="tablObj.Img" alt />
              </span>
            </el-col>
            <el-col :span="8">
              <span>备注：{{ tablObj.Remarks }}</span>
            </el-col>
          </el-row>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      loading: false,
      tablObj: {}, //详情信息

      Type: "",
      Account: "",
      Remarks: "",
      SID: this.$route.query.SID,
      hideRemit: false,//打款信息
      paymentType:'',
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    cancelFun() {
      this.$router.push("/weChat/manager/retail/withdrawal");
    },
    // preserveFun() {},
    // paymentInfo 打款信息
    async preserveFun(val, typV) {
      this.Account = val;
      this.Type = typV;
      this.loading = true;
      if(!this.paymentType){
        this.$message.error("请选择打款方式")
        return
      }
      try {
        let { Data } = await getLists(
          {
            Action: "RemitMoney",
            SID: this.SID,
            Account: this.Account,
            Type: this.paymentType,
            Remarks: this.Remarks

            // SID: "5638792972858819467",
            // Account: "", //账号
            // Type: "", //打款方式（1、微卡打款  2、微信打款 3、支付宝打款）
            // Remarks: "", //备注
            // Action: "RemitMoney"
          },
          "MMemberOpera"
        );
        this.loading = false;
        this.hideRemit = true;
        this.tablObj = Data.RemitMoney;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 获取列表
    async getDetail() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          {
            Action: "GetRebate",
            SID: this.SID
          },
          "MMemberOpera"
        );
        this.tablObj = Data.Rebate;
        if(Data.RemitMoney){
          this.paymentType=Data.RemitMoney.Type;
        }
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // // 查询
    // searchName() {
    //   // this.page.current_page = 1;
    //   this.getDetail();
    // },

    // // // paymentInfo 打款信息
    // async paymentInfo(val, typV) {
    //   this.Account = val;
    //   this.Type = typV;
    //   this.loading = true;
    //   try {
    //     let { Data } = await getLists(
    //       {
    //         Action: "RemitMoney",
    //         SID: this.SID,
    //         Account: this.Account,
    //         Type: this.Type,
    //         Remarks: this.Remarks
    //       },
    //       "MMemberOpera"
    //     );
    //     this.loading = false;
    //     this.hideRemit = true;
    //     this.tablObj = Data.RemitMoney;
    //     this.dakuanWay = Data.RemitMoney.Type;
    //   } catch (e) {
    //     this.$message.error(e);
    //     this.loading = false;
    //   }
    // }
  },
  filters: {
    checkTip(val) {
      if (val === "1") {
        return "已审核";
      } else return "未审核";
    },
    servantStaus(val) {
      if (val === "0") {
        return "未申请";
      } else if (val === "1") {
        return "申请返佣";
      } else if (val === "2") {
        return "打款成功";
      } else if (val === "3") {
        return "处理失败";
      }
    },
    IsRebateTip(val) {
      if (val === "0") {
        return "未返佣";
      } else if (val === "1") {
        return "已返佣";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.commissionDetail {
  .Leader,
  .Rebate {
    border-top: 1px solid #c2c2c2;
    margin-bottom: 5px;
    .leaderInfo,
    .RebateInfo {
      text-align: center;
      margin-bottom: 10px;
      padding: 0 10px;
      font-size: 20px;
    }
    .el-col-8 {
      margin: 12px 0;
      text-align: justify;
    }
    span {
      font-size: 15px;
    }
  }
  .RemitBox > .Leader > .info {
    margin-top: 16px;
  }
}
</style>