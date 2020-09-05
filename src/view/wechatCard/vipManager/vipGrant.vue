<template>
    <div class="vipGrant">
      <div class="vipGrantHead">
        <h5>{{currentRoute?'发放优惠券':'发放会员卡'}}</h5>
        <span>{{`根据筛选条件给符合条件的用户发放微信${currentRoute?'优惠券':'会员卡'}`}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="会员卡名称" prop="name" v-if="!currentRoute">
          <cardNames :isAll="false" @changeValue="changeValue"></cardNames>
        </el-form-item>
        <el-form-item label="优惠券名称" prop="name" v-if="currentRoute">
          <couponNames></couponNames>
        </el-form-item>
        <el-form-item label="筛选类型" prop="type">
<!--          <ScreenType :currentRoute="currentRoute"></ScreenType>-->
          <el-select v-model="valueScreenType" placeholder="请选择">
            <el-option
              v-for="item in ScreenTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微卡卡号" prop="card" v-if="valueScreenType===2?false:true">
          <el-input v-model="form.card" placeholder="请输入"></el-input>
          <br>
          <span style="color:red">(多个微卡卡号请用','分开)</span>
        </el-form-item>
        <el-form-item label="当前发送进度" prop="type" v-if="showProgress">
          <el-progress :text-inside="true" :stroke-width="30" :percentage="percentage" :status="percentageStatus"></el-progress>
        </el-form-item>
        <el-footer style="margin-top:40px">
          <el-button type="primary" @click="grant">发放</el-button>
          <el-button type="danger">统计</el-button>
        </el-footer>
      </el-form>
    </div>
</template>

<script>
import cardNames from '@/components/selector/cardList'
// import ScreenType from '@/components/selector/ScreeningType'
import couponNames from '@/components/selector/couponList'
export default {
	name: "vipGrant",
  components:{cardNames,couponNames},
  data(){
	  return {
      form:{},
      rules:{
        name: [{
            required: true, trigger: 'change', validator: (rules, value, callback) => {
              if(!this.form.name){
                callback(new Error('请选择会员卡名称'))
              }else{
                callback()
              }
            }
          }],
        type: [{
            required: true, trigger: 'change', validator: (rules, value, callback) => {
              if(!this.valueScreenType){
                callback(new Error('请选择筛选类型'))
              }else{
                callback()
              }
            }
          }],
        card: [{
            required: true, trigger: 'blur', validator: (rules, value, callback) => {
              if(!value){
                callback(new Error('请填写微卡卡号'))
              }else{
                callback()
              }
            }
          }],
      },
      ScreenTypeList:[{name:'微卡卡号',id:1},{name:'全部微卡用户',id:2}],
      valueScreenType:'',
      // 是否显示进度条
      showProgress:false,
      percentage:25,
      percentageStatus:null,
      time:0
    }
  },
  computed:{
    currentRoute(){
      // "优惠劵 =>true  会员卡 => false"
      return this.$route.path === '/wechatCard/Coupon/grant'|| false
    }
  },
  methods:{
    changeValue(val){
      if(!this.currentRoute){
        this.form.name = val
      }
    },
    grant(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.showProgress = true
          this.percentage = 25
          this.percentageStatus = null
          this.$message.closeAll()
          this.$message({
            showClose: true,
            message: '会员卡发送中，请耐心等待...',
            duration:this.time
          });
          // 会员卡发送完毕。。。
          setTimeout(()=>{
            this.percentageStatus = 'success'
            this.percentage = 100
            this.$message.closeAll()
            this.$message({
              showClose: true,
              message: '会员卡发送完毕...',
              type: 'success'
            });
          },3000)
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="less">
  .vipGrant{
    .vipGrantHead{
      padding:20px;
      background: #fff;
      margin-bottom:20px;
    }
    .el-input,.el-select{
      width:300px;
    }
    .el-progress{
      line-height: 40px;
      width:30% !important;
      min-width:360px;
    }
    .el-progress-bar__outer{
      background-color: #fff;
    }
  }

</style>
