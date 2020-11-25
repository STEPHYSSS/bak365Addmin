<template>
  <div class="conditionsAddEdit">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="方案名称" prop="Name">
        <p class="inputWidth"><el-input v-model="Name" placeholder="方案名称最多支持25个字符"></el-input></p>
      </el-form-item>
      <el-form-item label="参与时间" prop="PartTime">
        <el-date-picker
          type="datetimerange"
          v-model="PartTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="参与人员">
        <el-select v-model="form.MemberType" placeholder="请选择">
          <el-option
            v-for="item in ConditionPerson"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡类型">
        <el-select v-model="form.CardType" placeholder="请选择">
          <el-option
            v-for="item in ConditionCard"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单笔数" prop="OrderCnt" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.OrderCnt"></el-input></p> 笔
      </el-form-item>
      <el-form-item label="订单总额" prop="OrderAmt" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.OrderAmt"></el-input></p> 元
      </el-form-item>
      <el-form-item label="最近" prop="OrderBuyDay" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.OrderBuyDay"></el-input></p> 天购买过
      </el-form-item>
      <el-form-item label="最近" prop="NotOrderBuyDay" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.NotOrderBuyDay"></el-input></p> 天未购买过
      </el-form-item>
      <div>
        <el-form-item label="充值笔数" prop="CardOrderCnt" class="disLine">
          <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.CardOrderCnt"></el-input></p> 笔
        </el-form-item>
        <el-form-item label="充值金额" prop="CardOrderAmt" class="disLine">
          <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.CardOrderAmt"></el-input></p> 元
        </el-form-item>
        <el-form-item label="最近" prop="CardDay" class="disLine">
          <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.CardDay"></el-input></p> 天访问
        </el-form-item>
        <el-form-item label="最近" prop="NotCardDay" class="disLine">
          <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.NotCardDay"></el-input></p> 天未访问
        </el-form-item>
      </div>
      <el-form-item label="生日范围" prop="BirthdayTime">
        <el-date-picker
          type="daterange"
          v-model="BirthdayTime"
          value-format="MM-dd"
          format="MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="年龄" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.StartAge"></el-input></p> 至
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.EndAge"></el-input></p>
      </el-form-item>
      <el-form-item label="最近" prop="LatelyBirthday" class="disLine">
        <p class="inputWidth2"><el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.LatelyBirthday"></el-input></p> 天生日
      </el-form-item>
    </el-form>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
import { ConditionPerson, ConditionCard } from "@/config/utils"; //参与人员和卡类型引用
export default {
  name: "",
  data() {
    return {
      form: {
        MemberType: "0",
        CardType: "0",        
        OrderCnt:"",
        OrderAmt:"",
        OrderBuyDay:"",
        NotOrderBuyDay:"",
        CardOrderCnt:"",
        CardOrderAmt:"",
        CardDay:"",
        NotCardDay:"",
        StartAge:"",
        EndAge:"",
        LatelyBirthday:""
      },
      Name:"",
      StartDate:'',
      EndDate:'',
      PartTime: [], //参与时间
      BirthdayTime: [], //生日范围
      ConditionPerson: ConditionPerson, //参与人员
      ConditionCard: ConditionCard, //卡类型
    };
  },
  created(){
       this.getconditionInfo();
  },
  methods: {
     async getconditionInfo(){
      if(this.$route.query.SID){
        let SID = this.$route.query.SID
        let data = await getLists({
            SID:SID,
            Action:"GetSchemes"
        }, "MShopOpera");
        this.Name = data.Data.ShopSchemes.Name;
        this.PartTime.push(data.Data.ShopSchemes.StartDate,data.Data.ShopSchemes.EndDate);
        
        this.form = data.Data.ShopSchemes.SetInfo;
        this.BirthdayTime.push(this.form.StartBirthday,this.form.EndBirthday) ;
      }
          
     },
     cancelFun() {
      // 取消
          this.$router.push("/weChat/manager/activity/ConditionsList");
     },
     preserveFun() {//保存
          try {
               if (this.PartTime) {
               this.StartDate = this.PartTime[0];
               this.EndDate = this.PartTime[1];
               }
               if (this.BirthdayTime) {
                    this.form.StartBirthday = this.BirthdayTime[0];
                    this.form.EndBirthday = this.BirthdayTime[1];
               }
               let SID = this.$route.query.SID;         
               let data = getLists({
                    Name:this.Name,
                    Type:'1',
                    SID:SID,
                    StartDate:this.StartDate,
                    EndDate:this.EndDate,
                    SetInfo:JSON.stringify(this.form),
                    Action:"SetSchemes"
               }, "MShopOpera");
               setTimeout(() => {
               this.$router.push("/weChat/manager/activity/ConditionsList");
               }, 300)
               } catch (error) {

          }
     },
  },
};
</script>
<style lang="less" scoped>
.conditionsAddEdit {
  .inputWidth{
    width: 217px;
    display: inline-block;
  }
  .inputWidth2{
    width: 80px;
    display: inline-block;
  }
  .disLine{
    display: inline-block;
  }
  // .el-input,
  // .el-range-editor.el-input__inner,
  // .el-select {
  //   width: 300px;
  // }
}
</style>