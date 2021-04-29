<template>
     <div class="public">
          <el-form ref="formInfo" :model="formInfo" label-width="120px">
               <el-form-item label="券名称" v-if="TypeName!=''">
                    <el-input type="textarea" v-model="TypeName" readonly :disabled="true"></el-input>
               </el-form-item>
               <el-form-item label="赠送券">
                    <el-input type="textarea" :disabled="true" v-model="formInfo.GiveInfo" :rows="2"></el-input>
                    <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket" >添加</el-button>
               </el-form-item>
               <el-form-item label="赠送积分">
                    <el-input v-model="formInfo.GiveScore" :min="1" oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"></el-input>
               </el-form-item>
               <!-- <el-form-item label="赠送充值" v-show="chooseType!='0'&&chooseType!='3'">
                    <el-input v-model="formInfo.GiveMoney"></el-input>
               </el-form-item> -->
               <el-form-item label="发放总量">
                    <el-input v-model="formInfo.GiveCnt"  oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"></el-input>
               </el-form-item>
               <el-form-item label="每人最多参与">
                    <el-input v-model="formInfo.LimitCnt"  oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"></el-input>&nbsp;次
               </el-form-item>
          </el-form>
          <satisfyTicket :info="info" :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood(arguments)"></satisfyTicket>
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
               info:[],
               TypeName:''
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
               // this.formInfo.
               let result = []
               if (this.formInfo.GiveInfo) {
               let strSplit = this.formInfo.GiveInfo.split(';')
                    for (const i of strSplit) {
                         if (i) {
                              result.push(i.split(','))
                         } 
                    }
               }else {
                    result = []
               }
               this.info = result
          },
          changeDig(bool){//用于子组件控制关闭按钮
               this.showTicket = bool;
          },
          sureGood(val){//电子券弹窗确定按钮 
               this.showTicket = false;     
               this.formInfo.GiveInfo = val[0];
               this.TypeName = val[1].substring(0,val[1].length-1);
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
.el-input,.el-input__inner,.el-select,.el-textarea{
     width: 300px;
}
</style>