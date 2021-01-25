<template>
     <div class="activeSearchBox">
          <el-row class="marginBottom">               
               <el-col :span="8">
               <span>名 称：</span>
               <el-input placeholder="请输入活动名称" v-model="search.Name" clearable @clear = "clearN" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
               </el-input>
               </el-col>
               <el-col :span="8">
                    <span>开始时间：</span>
                    <el-date-picker v-model="search.StartDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime"> </el-date-picker>
               </el-col>
               <el-col :span="8">
                    <span>结束时间：</span>
                    <el-date-picker v-model="search.EndDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime"> </el-date-picker>
               </el-col>
          </el-row>
     </div>
</template>
<script>
export default {
     name:'',
     data(){
          return{
               search:{
                    Name:'',
                    SID:''
               },
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