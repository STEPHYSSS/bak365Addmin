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
               <el-form-item label="活动类型">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                         <el-option label="用户关注" value="0"></el-option>
                         <el-option label="申请微卡" value="1"></el-option>
                         <el-option label="绑定实体卡" value="2"></el-option>
                    </el-select>
               </el-form-item>
               <p>消息通知</p>
               <el-form-item label="模板ID">
                    <el-input v-model="form.ID"></el-input><br/>
                    <span>请先到微信公众平台添加要使用的模板消息</span>
               </el-form-item>
               <el-form-item label="模板内容">
                    <textarea name="" id="" cols="40" rows="2"></textarea>
                    <el-color-picker v-model="color1"></el-color-picker>
                    <!-- <el-input type="textarea" :autosize="{ minRows: 2}"></el-input> -->
               </el-form-item>
               <el-form-item label="变量说明">
                    <div class="explain">
                         <span>&nbsp;{商品名称}、{合计}、{姓名}、{提货时间}</span>
                    </div>
               </el-form-item>
               <p>奖项说明</p>
               <el-form-item>
                    <span>增加一条</span>
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
                    region:'0',
               },
               color1:"#409EFF",
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
               // console.log(val,'子组件返回的数据')        
          },
          preserveFun(){

          },
          cancelFun(){

          }
     }
}
</script>
<style lang="less" scoped>
.el-input,.el-input__inner,.el-select,.explain,.el-textarea{
     width: 300px;
}
.explain {
    background-color: #cccccc;
}
</style>