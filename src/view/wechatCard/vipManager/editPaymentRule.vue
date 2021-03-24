<template>
  <div class="paymentRule">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
      <el-form-item label="会员卡名称" prop="WeChatNo">
        <cardNames @changeValue="changeValue" :isAll="false"></cardNames>
      </el-form-item>
      <!--      <el-form-item label="支付商户号" prop="Mchid">-->
      <!--        <el-input v-model="ruleForm.Mchid" placeholder="请填写支付商户号"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="时间" prop="allTime">
        <el-date-picker
          v-model="ruleForm.allTime"
          type="daterange"
          :editable="false"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生效支付金额下限" prop="LeastCost">
        <el-input-number v-model="ruleForm.LeastCost" controls-position="right" :min="1"
                         :max="ruleForm.MaxCost"></el-input-number>&nbsp;元
      </el-form-item>
      <el-form-item label="生效支付金额上限" prop="MaxCost">
        <el-input-number v-model="ruleForm.MaxCost" controls-position="right"
                         :min="ruleForm.LeastCost"></el-input-number>&nbsp;元
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveFun" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cardNames from '@/components/selector/cardList'
import {getLists} from '@/api/vipCard'

export default {
  name: "editPaymentRule",
  components: {cardNames},
  data() {
    return {
      ruleForm: {
        WeChatNo: '',
        allTime: ''
      },
      rules: {
        WeChatNo: [
          {
            required: true, message: '请选择会员卡名称', trigger: 'blur', validator: (rules, value, callback) => {
              if (!this.ruleForm.WeChatNo) {
                callback(new Error('请选择会员卡名称'))
              } else {
                callback()
              }
            }
          }
        ],
        // Mchid: [{required: true, message: '请填写支付商户号', trigger: 'blur'}],
        allTime: [{required: true, message: '请选择时间', trigger: 'change'}],
        LeastCost: [{required: true, message: '请填写生效支付金额下限', trigger: 'blur'}],
        MaxCost: [{required: true, message: '请填写生效支付金额上限', trigger: 'blur'}]
      },
      loading:false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      }
    }
  },
  methods: {
    changeValue(val) {
      this.ruleForm.WeChatNo = val
    },
    saveFun() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (!valid) {
          return false
        } else {
          try {
            this.loading = true
            this.ruleForm.BeginTime = this.ruleForm.allTime[0]
            this.ruleForm.EndTime = this.ruleForm.allTime[1]
            // delete this.ruleForm.allTime
            Object.assign(this.ruleForm, {Action: 'SetPayMember'})
            await getLists(this.ruleForm, 'MBaseOpera')
            this.loading = false
            this.$message.error('新增成功')
            this.$router.push('/wechatCard/vip/payment')
          } catch (e) {
            this.$message.error(e)
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/numberInput.less';

  .paymentRule {

    .el-input, .el-select {
      width: 300px
    }

    .el-date-editor .el-range-separator {
      width: 14%;
    }
    .el-input-number{
      width:auto;
    }
  }

</style>
