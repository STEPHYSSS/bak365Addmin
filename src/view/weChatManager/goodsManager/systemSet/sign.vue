<template>
  <div class="systemSet">
    <!-- 签到设置 -->
    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="每次签到积分数：" prop="Score">
        <el-input v-model="ruleForm.Score" class="inputwith"></el-input>
      </el-form-item>
      <div class="addDiv"></div>
      <!-- <el-form-item label="连续签到：">
        <el-input v-model="ruleForm.MeetCnt" class="inputwith"></el-input>天，送
        <el-input v-model="ruleForm.GiveScore" class="inputwith"></el-input>个积分
      </el-form-item>
      <el-form-item label="领取限制：" prop="LimitType">
        <el-radio-group v-model="ruleForm.LimitType">
          <el-radio label="每人限领一次"></el-radio>
          <el-radio label="每人每月限领一次"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="赠送券：">
        <el-input v-model="form.GiveInfo" readonly :disabled="true"></el-input>
        <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket" >添加</el-button>
      </el-form-item> -->
      <!-- 增加一条开始 -->
     
     <div v-for="(item,index) in ruleForm.GiveList" :key="index" class="addDiv">
          <el-form-item :key="index + 1"  :prop="'GiveList.' + index + '.MeetCnt'" label="连续签到：">
               <el-input v-model="item.MeetCnt" class="inputwith" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>天
          </el-form-item>
          <el-form-item :key="index + 2"  :prop="'GiveList.' + index + '.GiveScore'" label="送积分：">
               <el-input v-model="item.GiveScore" class="inputwith" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>个积分
          </el-form-item>
          <el-form-item :key="index + 3"  :prop="'GiveList.' + index + '.LimitType'" label="领取限制：">
               <el-radio-group v-model="item.LimitType">
                  <el-radio label="1">每人限领一次</el-radio>
                  <el-radio label="2">每人每月限领一次</el-radio>
               </el-radio-group>
          </el-form-item>
          <el-form-item :key="index + 4"  :prop="'GiveList.' + index + '.GiveInfo'" label="赠送券：">
               <el-input v-model="item.GiveInfo" readonly :disabled="true"></el-input>
               <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket(index)" >添加</el-button>
          </el-form-item>
          <p class="addInfo"><el-button @click.prevent="removeDomain(index)">删除</el-button></p>
          
     </div>
     <p @click="addDomain" class="addInfo">增加一条</p>
      <!-- 增加一条结束 -->
      <el-form-item label="签到说明：" prop="Explain">
          <el-input type="textarea" v-model="ruleForm.Explain" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    <satisfyTicket :info="info" :info2 = "info2" :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood(arguments)"></satisfyTicket>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import satisfyTicket from "@/components/Dialog/satisfyTicket";
import { giftType } from "@/config/utils"; //赠送类型引用
export default {
  name: "systemSetIndex",
  data() {
    return {
     ruleForm: {
      Score:'',//每次签到积分数
      Explain:'',
      // MeetCnt:'',
      // GiveScore:'',
      // LimitType:'',
      GiveList:[]//签到赠送
     },
     form: {
        GiveInfo: "",
        GiveMoney: "",
        GiveScore: "",
        GiveCnt: "",
        LimitCnt: "",
     },
     giftType: giftType, //赠送类型
     showTicket: false, //控制电子劵信息弹框显示
     goodsNormsIndex: null,
     info:[],
     info2:'sign'
    };
  },
  components:{
     satisfyTicket
  },
  created() {
    this.GetSignIn();
  },
  methods: {
    clickTicket(index) {
      // 选择赠送电子券
      this.showTicket = true;
      this.goodsNormsIndex = index;
      if(!this.ruleForm.GiveList[this.goodsNormsIndex].GiveInfo){
        this.info = []
      }      
    },
    changeDig(bool) {
      //用于子组件控制关闭按钮
      this.showTicket = bool;
    },
    sureGood(val) {
      //电子券弹窗确定按钮
      console.log(val)
     this.showTicket = false;
     this.info = val[0];
     this.ruleForm.GiveList[this.goodsNormsIndex].GiveInfo = val[1];
     //  this.form.GiveInfo = val;
    },
    removeDomain(index) {
      this.ruleForm.GiveList.splice(index, 1);
    },
    addDomain() {  
      this.$nextTick(()=>{
          this.ruleForm.GiveList.push({
            MeetCnt:'',
            GiveScore:'',
            LimitType:'1',
            LimitCnt:'1',
            GiveInfo:'',
            Sort:''
          });  
          this.ruleForm.GiveList.forEach((item,index) => {
            item.Sort = index
          }); 
          console.log(this.ruleForm.GiveList)    
      })
    },
    async GetSignIn(){
      try {
        let { Data } = await getLists({ Action: "GetSignIn"},"MMemberOpera");
        this.ruleForm = Data;
        if(Data.GiveList){
          this.ruleForm.GiveList = this.ruleForm.GiveList;
        }else {
          this.$set(this.ruleForm, 'GiveList', [])
        }
        this.ruleForm.Score = this.ruleForm.SignIn.Score;
        this.ruleForm.Explain = this.ruleForm.SignIn.Explain;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async submitForm() {
      //保存
      let giveList = this.ruleForm.GiveList;
      try {
        let obj = _.cloneDeep(this.ruleForm);
        this.ruleForm.GiveList = JSON.stringify(giveList)
        Object.assign(obj, { Action: "SetSignIn" });
        console.log(obj)
        await getLists(obj, "MMemberOpera");
        // this.$message.success("操作成功")
        // this.$router.push("/weChat/manager/activity/directCouponList");
      } catch (error) {
        this.$message.error(error)
      }
      
      // try {
      //   let data = await getLists(
      //     {
      //       Score: this.ruleForm.Score,
      //       Explain:this.ruleForm.Explain,
      //       GiveList:JSON.stringify(giveList)?JSON.stringify(giveList):'',
      //       Action: "SetSignIn",
      //     },
      //     "MMemberOpera"
      //   );
      //   console.log(data,'000')
      // } catch (error) {
      //    this.$message.error(error)
      // }
    },
  },
};
</script>

<style scoped>
.el-range-editor.el-input__inner,
.el-select,
.el-input,.el-textarea {
  width: 300px;
}
.inputwith {
  width: 85px;
  margin: 0 5px;
}
.addInfo{
     width: 110px;
     color: rgb(34, 153, 255);
     text-align: center;
     margin-bottom: 20px;
}
.addDiv{
     width: 600px;
     border-bottom: 1px solid #cadcf7;
     margin-bottom: 15px;
}


</style>
