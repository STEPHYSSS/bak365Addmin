<template>
  <div class="systemSet">
    <!-- 系统设置 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商城设置" name="1">
        <el-form ref="form" :model="form" :rules="rules" label-width="200px">
          <el-form-item label="最大可自取/提货时间">
            <el-input-number
              v-model="form.ScopeDay"
              @change="handleChange"
              :min="1"
              :max="30"
            ></el-input-number>
            <span style="color: #999"
              >天</span
            >
          </el-form-item>
          <el-form-item label="营业时间段(取货,送货)">
            <el-time-picker
              :editable="false"
              v-model="form.StartTime"
              value-format="HH:mm:ss"
              placeholder="开始时间"
            ></el-time-picker>
            <span style="padding: 0 10px">至</span>
            <el-time-picker
              :editable="false"
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
          <el-form-item label="待支付订单过期时限">
            <el-input onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="form.AutoCancelOrder"></el-input>&nbsp;分钟
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
          <el-form-item label="自定义充值">
            <el-radio v-model="form.IsOpenRecharge" label="0">关闭</el-radio>
            <el-radio v-model="form.IsOpenRecharge" label="1">开启</el-radio>
          </el-form-item>
          <el-form-item label="会员支付密码">
            <el-radio v-model="form.IsCardPass" label="0">关闭</el-radio>
            <el-radio v-model="form.IsCardPass" label="1">开启</el-radio>
          </el-form-item>
          <!-- <el-form-item label="支付方式">
            <el-checkbox-group v-model="form.BenePayMode">
              <el-checkbox label="1">微卡支付</el-checkbox>
              <el-checkbox label="2">微信支付</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          <!-- <el-form-item label="权益支付方式">
            <el-radio v-model="form.BenePayMode" label="1">微卡支付</el-radio>
            <el-radio v-model="form.BenePayMode" label="2">微信支付</el-radio>
          </el-form-item> -->
          <!-- <el-form-item label="积分抵扣">
            <el-radio v-model="form.IsDeduction" label="1">开启</el-radio>
            <el-radio v-model="form.IsDeduction" label="2">关闭</el-radio>
            <em style="color:red;display:inline-block;margin-left:5px" v-if="form.IsDeduction=='1'">(例：积分最高抵扣订单金额：100(元) * 5%(抵扣比例) = 5(元) 积分单次最高抵扣5元)</em>
            <p v-if="form.IsDeduction=='1'">
              <el-input v-model="form.ScoreDeduction" placeholder="例：100" class="inputWidth"></el-input>积分，抵扣<el-input v-model="form.MoneyDeduction" placeholder="例：1" class="inputWidth"></el-input>元，积分最高抵扣订单金额
              <el-input v-model="form.ScoreRatio" class="inputWidth" placeholder="例：5"></el-input>%              
            </p>
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
          <el-form-item label="提现日期">
            每月 <el-input v-model="form2.DrawingsStartDate" placeholder="请输入开始日期" style="width:80px"></el-input> ~
            <el-input v-model="form2.DrawingsEndDate" placeholder="请输入结束日期" style="width:80px"></el-input> 号
          </el-form-item>
          <el-form-item label="提现方式" prop="DrawingsType">
            <el-radio v-model="form2.DrawingsType" label="1">微卡</el-radio>
            <el-radio v-model="form2.DrawingsType" label="2">支付宝</el-radio>
          </el-form-item>
          <el-form-item label="佣金比例">
            <el-input
              v-model="form2.Ratio"
              placeholder="推广订单金额 * 提现比例 =实际返佣金额"
            ></el-input> % 
            <span style="color: #999"
              >推广订单金额 * 提现比例 =实际返佣金额</span
            >
          </el-form-item>
          <el-form-item label="分销有效期">
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
      rules: {       
      },
      
      form: {
        ShopRadio:"1",
        IsOpenRecharge:'1',//自定义充值
        IsCardPass:'0',
        // BenePayMode: ["1", "2"],//权益
        ScopeDay:'7',
        StartTime:'',
        EndTime:'',
        AutoCancelOrder:'',
        IsDeduction:'2',
        ScoreDeduction:'',
        MoneyDeduction:'',
        ScoreRatio:'',
        IsRefund:'3',
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
          if(Data.ShopBase.SetInfo){            
            this.form = Data.ShopBase.SetInfo;
            this.form.BenePayMode = this.form.BenePayMode
          ? this.form.BenePayMode.split(",")
          : [];
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
      if(this.form.ScoreDeduction==undefined||this.form.MoneyDeduction==undefined||this.form.ScoreRatio==undefined){
        return this.$message.error("请输入积分抵扣规则")
      }     
      try {
        let obj = {};
        this.form.BenePayMode =
              typeof this.form.BenePayMode !== "string" && this.form.BenePayMode
                ? this.form.BenePayMode.join(",")
                : this.form.BenePayMode;
        if (this.activeName == "1") {          
          obj = {
            Action: "SetBase",
            SetInfo: JSON.stringify(this.form),
            Type: this.activeName,
          };
          
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
  width: 85px;
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
