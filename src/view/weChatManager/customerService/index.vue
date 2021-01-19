<template>
     <div class="customerService">
          <el-form ref="form" :model="form" label-width="150px">
               <el-form-item label="客服图片：">
               <imgLoad
                    style="margin-top:10px"
                    @upLoadImgs="upLoadImg"
                    :fileListUp="fileListUp"
                    folder="ShopImg"
                    ref="imgLoad"
               ></imgLoad>
               </el-form-item>
               <el-form-item label="客服类型：">
                    <el-select v-model="form.Type" placeholder="请选择">
                    <el-option
                         v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                    </el-option>
                    </el-select>
               </el-form-item>
               <el-form-item label="平台编号：" prop="BusinessID">
               <el-input v-model="form.BusinessID"></el-input>
               </el-form-item>
               <el-form-item label="分组编号：" prop="GroupID">
               <el-input v-model="form.GroupID"></el-input>
               </el-form-item>
               <el-form-item label="专业编号：" prop="SpecialID">
               <el-input v-model="form.SpecialID"></el-input>
               </el-form-item>
          </el-form>
          <div class="preserveStyle">
               <el-button type="primary" style="margin-left:20px" @click="preserveFun" :loading="btnLoading">提交</el-button>
          </div>
     </div>
</template>
<script>
import imgLoad from "@/components/download/imgLoad";
import { getLists } from "@/api/vipCard";
export default {
     name:"customerService",
     data(){
          return{
               form:{
                    Type: '2'
               },
               fileListUp: [],
               btnLoading: false,
               options: [{
                    value: '2',
                    label: '网页客服'
               }],
               
          }
     },
     components: { imgLoad },  
     created(){
          // if (this.$route.query.sid) {
          //      this.getInfo();
          // }
          this.getInfo();
     },
     methods:{
          async getInfo() {
               try {
               let { Data } = await getLists(
                    { Action: "GetCSRInfo"},
                    "MShopOpera"
               );
               this.form = Data.CSRInfo;
               console.log(Data)
               this.fileListUp = this.form.Img? [{ url: this.form.Img }]: [];
               } catch (e) {
                    this.$message.error(e);
               }
          },
          upLoadImg(imgs) {
               let arr = [];
               let ti = imgs;
               for (let i = 0; i < ti.length; i++) {
               arr.push(ti[i].url);
               }
               this.form.Img = arr.join(",");
          },
          async preserveFun(){
               let obj = {Action: "SetCSRInfo"};
               Object.assign(obj, this.form);
               if(obj.Img){
               obj.Img = obj.Img.indexOf(process.env.Prefix) !== -1
                         ? obj.Img.replace(process.env.Prefix, "")
                         : obj.Img;
               }
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
     // filters:{
     //      TypeTips(val){
     //           if(val==='1'){
     //                return 'QQ客服'
     //           }else if(val==='2'){
     //                return '网页客服'
     //           }
     //      }
     // }
}
</script>
<style lang="less" scoped>
     .el-input{
          width: 300px;
     }
</style>