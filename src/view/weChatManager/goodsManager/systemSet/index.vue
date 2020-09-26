<template>
  <div class="systemSet">
    <!-- 系统设置 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="商城设置" name="first">
          <el-form-item label="送货日期(用户取货)">
            <el-input-number
              v-model="form.ScopeDay"
              @change="handleChange"
              :min="1"
              :max="30"
            ></el-input-number>
            <span style="color: #999"
              >从当前日期开始，可预约多少天配送(自取)</span
            >
          </el-form-item>
          <el-form-item label="营业时间段(取货,送货)">
            <el-time-picker
              is-range
              v-model="form.businessTime"
              :clearable="false"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="送货时间间隔(用户取货)">
            <el-select v-model="form.IntervalMinute" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              ></el-option> </el-select
            >&nbsp;分钟
          </el-form-item>
          <el-form-item label="是否可退款">
            <el-select v-model="form.IsRefund" placeholder="请选择">
              <el-option
                v-for="item in optionsRetreat"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="分销设置" name="second">
          <!-- 推广基础设置开始  提现比例（推广订单金额 * 提现比例 =实际返佣金额） 有效期  提现备注-->
          <el-form-item label="提现日期" prop="DrawingsDate">
            <el-date-picker
              is-range
              @change="change"
              :clearable="false"
              v-model="form.DrawingsDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="提现方式" prop="DrawingsType">
            <el-radio v-model="DrawingsType" label="1">微卡</el-radio>
            <el-radio v-model="DrawingsType" label="2">支付宝</el-radio>
          </el-form-item>
          <el-form-item label="佣金比例">
            <el-input
              v-model="form.Ratio"
              placeholder="推广订单金额 * 提现比例 =实际返佣金额"
            ></el-input>
            <span style="color: #999"
              >推广订单金额 * 提现比例 =实际返佣金额</span
            >
          </el-form-item>
          <el-form-item label="返佣核算有效期">
            <!-- 有效期（0表示永久粉丝） -->
            <el-input v-model="form.ValidDay"></el-input>&nbsp;天
          </el-form-item>
          <el-form-item label="返佣核算方式" prop="RatioWay">
            <!-- RatioWay 返佣核算方式  1订单金额核算  2支付金额核算  -->
            <el-radio v-model="RatioWay" label="1">订单金额</el-radio>
            <el-radio v-model="RatioWay" label="2">支付金额</el-radio>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="submitSystem"
          style="margin-bottom:20px"
          :loading="btnLoading"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import { getTimeMy } from "@/config/publicFunction";
import { optionsRetreat } from "@/config/utils";

export default {
  name: "systemSetIndex",
  data() {
    return {
      activeName2: "first",
      form: {
        businessTime: [],
      },
      DrawingsType: "1", //提现方式
      RatioWay: "1", //返佣核算方式
      ValidDay: "", //有效期
      rules: {},
      options: [15, 20, 30, 60],
      btnLoading: false,
      optionsRetreat: optionsRetreat,
      // validity:[15, 20, 30, 60],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    change(val) {
      let abc = val.toString();
      this.form.DrawingsDate = abc;
    },
    async getInfo() {
      try {
        let { Data } = await getLists({ Action: "GetBase" }, "MShopOpera");
        this.form = Data.ShopBase;
        if (this.form.StartTime !== "" && this.form.EndTime !== "") {
          this.form.businessTime = [this.form.StartTime, this.form.EndTime];
        }
        if (this.form.DrawingsDate) {
          this.form.DrawingsDate = this.form.DrawingsDate
            ? this.form.DrawingsDate.split(",")
            : [];
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async submitSystem() {
      this.form.StartTime = this.form.businessTime[0];
      this.form.EndTime = this.form.businessTime[1];
      console.log(JSON.stringify(this.form))
      // this.btnLoading = true;
      // try {
      //   let obj = { Action: "SetBase" };
      //   Object.assign(obj, this.form);
      //   await getLists(obj, "MShopOpera");
      //   this.$message.success("操作成功");
      //   this.btnLoading = false;
      // } catch (e) {
      //   this.$message.error(typeof e == "string" ? e : "请求失败，请重试");
      //   this.btnLoading = false;
      // }
    },
    handleChange() {},
  },
};
</script>

<style scoped>
.el-range-editor.el-input__inner,
.el-select,
.el-input {
  width: 300px;
}
fieldset {
  border: 2px solid #cadcf7;
  margin-bottom: 10px;
}
legend {
  margin: 0 44px;
  padding: 0 10px;
  font-size: 18px;
}
</style>
