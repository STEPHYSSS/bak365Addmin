<template>
     <div>
          <el-dialog title="设置链接" :visible.sync="dialogFormVisible" width="500px">
               <el-form :model="form">
               <el-form-item label="链接名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="链接地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.url" autocomplete="off"></el-input>
               </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureConserve">保 存</el-button>
               </div>
          </el-dialog>
     </div>
</template>
<script>
export default {
     name:"",
     data(){
          return{
               dialogFormVisible:false,
               form:{
                    name:'',
                    url:''
               },
               formLabelWidth:'120'
          }
     },
     props:{
          dialogShow:{
               type: Boolean,
               default: false
          }
     },
     methods:{
          sureConserve(){
               this.$emit('sureConserve',this.form);
          }
     },
     watch: {
          dialogShow(val) {
               this.dialogFormVisible = val;
          },
          dialogFormVisible(bool){
               this.$emit('dialogShow',bool);
          }
     }
}
</script>
<style scoped>
.el-input,
.explain,
.el-textarea {
  width: 300px;
}
</style>