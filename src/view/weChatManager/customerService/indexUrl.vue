<template>
     <div class="customerService">
          <el-form ref="form" :model="form" label-width="150px">
               <el-form-item label="客服登录设置：" prop="Url">
                    <el-input v-model="form.Url"></el-input>
               </el-form-item>
               <el-form-item style="">
                    <el-button type="primary" style="margin-left:20px" @click="Login" :loading="btnLoading">登录</el-button>
                    <el-button type="primary" style="margin-left:20px" @click="preserveFun" :loading="btnLoading">保存</el-button>
               </el-form-item>
          </el-form>
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
     name:"customerService",
     data(){
          return{
               form:{},
               btnLoading: false,
               
          }
     },
     created(){
          this.getInfo();
     },
     methods:{
          async getInfo() {
               try {
               let { Data } = await getLists(
                    { Action: "GetBase",Type: '4'},
                    "MShopOpera"
               );
               if(Data.ShopBase.SetInfo){
                    this.form = Data.ShopBase.SetInfo;
               }
               } catch (e) {
                    this.$message.error(e);
               }
          },
          Login(){
               window.location.href = this.form.Url;
               // http://cs365.bak365.net/admin/login/index/business_id/4.html
          },
          async preserveFun(){
               let obj = {Action: "SetBase",Type: '4',SetInfo:JSON.stringify(this.form)};
               this.btnLoading = true;
               try {
                    await getLists(obj, "MShopOpera");
                    this.$message.success("提交成功");
                    this.btnLoading = false;
               } catch (e) {
                    this.btnLoading = false;
                    this.$message.error(e);
               }
          }
     },
}
</script>
<style lang="less" scoped>
     .el-input{
          width: 500px;
     }
</style>