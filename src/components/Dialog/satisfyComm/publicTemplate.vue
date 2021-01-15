<template>
     <div class="public">
          <el-form ref="formInfo" :model="formInfo" label-width="120px">
               <el-form-item label="赠送电子券">
                    <el-input :disabled="true" v-model="formInfo.GiveInfo"></el-input>
                    <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket" >添加</el-button>
               </el-form-item>
               <el-form-item label="赠送积分" v-show="chooseType!='0'">
                    <el-input v-model="formInfo.GiveScore"></el-input>
               </el-form-item>
               <el-form-item label="赠送充值" v-show="chooseType!='0'">
                    <el-input v-model="formInfo.GiveMoney"></el-input>
               </el-form-item>
               <el-form-item label="方案总数">
                    <el-input v-model="formInfo.GiveCnt"></el-input>
               </el-form-item>
               <el-form-item label="每人最多参与" v-show="chooseType!='0'">
                    <el-input v-model="formInfo.LimitCnt"></el-input>
               </el-form-item>
          </el-form>
          <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
     </div>
</template>
<script>
import satisfyTicket from "@/components/Dialog/satisfyTicket";
export default {
     name:'',
     data(){
          return{
               formInfo:{
                    GiveInfo:'',
                    GiveScore:'',
                    GiveMoney:'',
                    GiveCnt:'',
                    LimitCnt:''
               },
               showTicket:false,//显示与隐藏电子券弹窗
          }
     },
     props:{
          chooseType:String,
          editInfo:Object
     },
     components:{ satisfyTicket},
     methods:{
          clickTicket(){//赠送电子券
               this.showTicket = true;
          },
          changeDig(bool){//用于子组件控制关闭按钮
               this.showTicket = bool;
          },
          sureGood(val){//电子券弹窗确定按钮  
               this.showTicket = false;     
               this.formInfo.GiveInfo = val;
               // console.log(val,'子组件返回的数据')        
          },
     },
     watch:{
          editInfo: {
               handler(newName) {
                    this.formInfo = newName;
               },              
               deep: true
          }
     }
}
</script>
<style lang="less" scoped>
.el-input,.el-input__inner,.el-select{
     width: 300px;
}
</style>