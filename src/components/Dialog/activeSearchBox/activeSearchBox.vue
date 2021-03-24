<template>
     <div class="activeSearchBox">
          <el-row class="marginBottom">
               <el-col :span="6">
               <span>活动名称：</span>
               <el-input placeholder="请输入活动名称" v-model="search.Name" clearable @clear = "clearN" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
               </el-input>
               </el-col>
               <el-col :span="6">
               <span>活动状态：</span>
               <el-select v-model="search.Start" placeholder="请选择活动状态" clearable @change="changeState" class="selectSearch">
                    <el-option v-for="item in activeStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
               </el-select>
               </el-col>
               <el-col :span="6">
                    <span>开始时间：</span>
                    <el-date-picker v-model="search.StartDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime"> </el-date-picker>
               </el-col>
               <el-col :span="6">
                    <span>结束时间：</span>
                    <el-date-picker v-model="search.EndDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime"> </el-date-picker>
               </el-col>
          </el-row>
          <el-row class="marginBottom">
               <el-col :span="6">
               <span>活动周期：</span>
               <el-select v-model="search.TimeType" placeholder="请选择活动周期" clearable @change="changeState" class="selectSearch">
                    <el-option v-for="item in seckillType" :key="item.value" :label="item.label" :value="item.value"></el-option>
               </el-select>
               </el-col>
          </el-row>
     </div>
</template>
<script>
import { seckillType,activeStatus  } from "@/config/utils";
export default {
     name:'',
     data(){
          return{
               search:{
                    Name:'',
                    TimeType:'',
                    Start:''
               },
          seckillType:seckillType,//类型
          activeStatus:activeStatus
          }
          
     },
     methods:{
          searchN(){
               this.$emit('searchList',this.search)
          },
          clearN(){
               this.search.Name = '';
               this.$emit('searchList',this.search)
          },
          changeTime(){
              this.$emit('searchList',this.search)
          },
          changeState() {
               this.$emit('searchList',this.search)
          },
     }
}
</script>
<style lang="less" scoped>
.el-input{
     width: 270px;
}
</style>