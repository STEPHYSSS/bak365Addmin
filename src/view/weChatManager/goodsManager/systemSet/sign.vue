<template>
  <div class="systemSet">
    <!-- 签到设置 -->
    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="每次签到积分数：" prop="Score">
        <el-input v-model="ruleForm.Score" class="inputwith"></el-input>
      </el-form-item>
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
     <p @click="addDomain" class="addInfo">增加一条</p>
     <div v-for="(item,index) in ruleForm.SpecList" :key="index" class="addDiv">
          <el-form-item :key="index + 1"  :prop="'SpecList.' + index + '.MeetCnt'" label="连续签到：">
               <el-input v-model="item.MeetCnt" class="inputwith"></el-input>天
          </el-form-item>
          <el-form-item :key="index + 2"  :prop="'SpecList.' + index + '.GiveScore'" label="送积分：">
               <el-input v-model="item.GiveScore" class="inputwith"></el-input>个积分
          </el-form-item>
          <el-form-item :key="index + 3"  :prop="'SpecList.' + index + '.LimitType'" label="领取限制：">
               <el-radio-group v-model="item.LimitType">
                    <el-radio label="每人限领一次"></el-radio>
                    <el-radio label="每人每月限领一次"></el-radio>
               </el-radio-group>
          </el-form-item>
          <el-form-item :key="index + 4"  :prop="'SpecList.' + index + '.GiveInfo'" label="赠送券：">
               <el-input v-model="item.GiveInfo" readonly :disabled="true"></el-input>
               <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket(index)" >添加</el-button>
          </el-form-item>
     </div>


      <!-- 增加一条结束 -->
      <el-form-item label="签到说明：" prop="Explain">
          <el-input type="textarea" v-model="ruleForm.Explain" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
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
          // MeetCnt:'',
          // GiveScore:'',
          // LimitType:'',
          SpecList:[]//签到赠送
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
    };
  },
  components:{
     satisfyTicket
  },
  created() {},
  methods: {
    clickTicket(index) {
      // 选择赠送电子券
      this.showTicket = true;
      this.goodsNormsIndex = index;
    },
    changeDig(bool) {
      //用于子组件控制关闭按钮
      this.showTicket = bool;
    },
    sureGood(val) {
      //电子券弹窗确定按钮
     this.showTicket = false;
     this.ruleForm.SpecList[this.goodsNormsIndex].GiveInfo = val;
     //  this.form.GiveInfo = val;
    },
    removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
           this.$nextTick(()=>{
               this.ruleForm.SpecList.push({
                    MeetCnt:'',
                    GiveScore:'',
                    LimitType:'1',
                    GiveInfo:''
               });
           })
      }
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
}
.addDiv{
     width: 600px;
     border-bottom: 1px solid #cadcf7;
     margin-bottom: 15px;
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
