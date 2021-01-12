<template>
     <div class="satisfyAddEdit">
          <el-form ref="form" :model="form" label-width="120px">
               <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
               </el-form-item>
               <el-form-item label="时间">
                    <el-date-picker v-model="form.value4" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
               </el-form-item>
               <el-form-item label="触发类型">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                         <el-option label="请选择触发类型" value=""></el-option>
                         <el-option label="用户关注" value="0"></el-option>
                         <el-option label="用户申请卡" value="1"></el-option>
                         <el-option label="用户绑定卡" value="2"></el-option>
                    </el-select>
               </el-form-item>
               <el-form-item label="赠送电子券">
                    <el-input :disabled="true" v-model="form.Ticket"></el-input>
                    <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket" >添加</el-button>
               </el-form-item>
               <el-form-item label="赠送积分" v-show="form.region!='0'">
                    <el-input v-model="scorc"></el-input>
               </el-form-item>
               <el-form-item label="赠送充值" v-show="form.region!='0'">
                    <el-input v-model="scorc"></el-input>
               </el-form-item>
               <el-form-item label="方案总数">
                    <el-input v-model="scorc"></el-input>
               </el-form-item>
               <el-form-item label="每人最多参与" v-show="form.region!='0'">
                    <el-input v-model="scorc"></el-input>
               </el-form-item>
          </el-form>
          <div class="preserveStyle">
               <el-button @click="cancelFun">取消</el-button>
               <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
          </div>
          <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
     </div>
     
     <!-- 当触发类型是用户关注时，不展示赠送积分、赠送充值 和 参与次数-->
</template>
<script>
import satisfyTicket from "@/components/Dialog/satisfyTicket";
export default {
     name:"satisfyAddEdit",
     data(){
          return{
               form:{
                    name:'',
                    region:'',
               },
               scorc:'',
               showTicket:false,//显示与隐藏电子券弹窗
          }
     },
     components:{ satisfyTicket },
     created(){},
     methods:{
          clickTicket(){//赠送电子券
               this.showTicket = true;
          },
          changeDig(bool){//用于子组件控制关闭按钮
               this.showTicket = bool;
          },
          sureGood(val){//电子券弹窗确定按钮  
               this.showTicket = false;     
               this.form.Ticket = val;
               console.log(val,'子组件返回的数据')        
          },
          preserveFun(){

          },
          cancelFun(){

          }
     }
}
</script>
<style lang="less" scoped>
.el-input,.el-input__inner,.el-select{
     width: 300px;
}
</style>