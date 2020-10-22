<template>
  <div class="systemSet">
    <!-- 系统设置 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商城设置" name="1">
        <el-form ref="form" :model="form" :rules="rules" label-width="200px">
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
              v-model="form.StartTime"
              value-format="HH:mm:ss"
              placeholder="开始时间"
            ></el-time-picker>
            <span style="padding: 0 10px">至</span>
            <el-time-picker
              v-model="form.EndTime"
              value-format="HH:mm:ss"
              placeholder="结束时间"
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
          <el-form-item label="商城模式">
            <el-radio v-model="form.ShopRadio" label="1">点餐模式</el-radio>
            <el-radio v-model="form.ShopRadio" label="2">自定义模式</el-radio>
          </el-form-item>
          <el-form-item label="积分抵扣">
            <el-input v-model="form.ScoreDeduction" class="inputWidth"></el-input>积分，抵扣<el-input v-model="form.MoneyDeduction" class="inputWidth"></el-input>元，每单抵扣比例
            <el-input v-model="form.ScoreRatio" class="inputWidth" placeholder="请输入折扣比例"></el-input>%
          </el-form-item>
          <!-- <el-form-item label="商城模式">
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="submitSystem"
              style="margin-bottom: 20px"
              :loading="btnLoading"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 推广基础设置开始  提现比例（推广订单金额 * 提现比例 =实际返佣金额） 有效期  提现备注-->
      <el-tab-pane label="分销设置" name="2">
        <el-form ref="form2" :model="form2" :rules="rules" label-width="200px">
          <el-form-item label="提现日期" prop="DrawingsDate">
            <el-date-picker
              is-range
              @change="change"
              :clearable="false"
              v-model="DrawingsDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="提现方式" prop="DrawingsType">
            <el-radio v-model="form2.DrawingsType" label="1">微卡</el-radio>
            <el-radio v-model="form2.DrawingsType" label="2">支付宝</el-radio>
          </el-form-item>
          <el-form-item label="佣金比例">
            <el-input
              v-model="form2.Ratio"
              placeholder="推广订单金额 * 提现比例 =实际返佣金额"
            ></el-input>
            <span style="color: #999"
              >推广订单金额 * 提现比例 =实际返佣金额</span
            >
          </el-form-item>
          <el-form-item label="返佣核算有效期">
            <!-- 有效期（0表示永久粉丝） -->
            <el-input v-model="form2.ValidDay"></el-input>&nbsp;天
          </el-form-item>
          <el-form-item label="返佣核算方式" prop="RatioWay">
            <!-- RatioWay 返佣核算方式  1订单金额核算  2支付金额核算  -->
            <el-radio v-model="form2.RatioWay" label="1">订单金额</el-radio>
            <el-radio v-model="form2.RatioWay" label="2">支付金额</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="submitSystem"
              style="margin-bottom: 20px"
              :loading="btnLoading"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
      activeName: "1",
      rules: {},
      form: {
        ShopRadio:"1",
        ScopeDay:'',
        StartTime:'',
        EndTime:'',
      }, //商城设置
      btnLoading: false,
      options: [15, 20, 30, 60],
      optionsRetreat: optionsRetreat,
      DrawingsDate:[],
      form2: {
        DrawingsStartDate:'',
        DrawingsEndDate:'',
        DrawingsType: "1", //提现方式
        RatioWay: "1", //返佣核算方式
        ValidDay: "", //有效期
      }, //分销设置
      
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName)
     this.getInfo();
    },
    change(val) {
      this.form2.DrawingsStartDate = val[0];
      this.form2.DrawingsEndDate = val[1];
    },
    async getInfo() {
      try {
        if(this.activeName == '1'){
          let { Data } = await getLists(
          { Action: "GetBase", Type: 1 },
          "MShopOpera"
          ); 
          if(Data.ShopBase){
            this.form = Data.ShopBase.SetInfo;
          }
        }else{
        let { Data } = await getLists(
          { Action: "GetBase", Type: 2 },
          "MShopOpera"
          );
          this.form2 = Data.ShopBase.SetInfo;
          this.DrawingsDate.push(this.form2.DrawingsStartDate,this.form2.DrawingsEndDate)
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async submitSystem() {
      this.btnLoading = true;
      try {
        let obj = {};
        if (this.activeName == "1") {
          obj = {
            Action: "SetBase",
            SetInfo: JSON.stringify(this.form),
            Type: this.activeName,
          };
          console.log(obj);
        } else if (this.activeName == "2") {
          obj = {
            Action: "SetBase",
            SetInfo: JSON.stringify(this.form2),
            Type: this.activeName,
          };
        }
        await getLists(obj, "MShopOpera");
        this.$message.success("操作成功");
        this.btnLoading = false;
      } catch (error) {
        this.$message.error(typeof e == "string" ? e : "请求失败，请重试");
        this.btnLoading = false;
      }
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
.inputWidth{
  width: 80px;
  margin: 0 5px;
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
