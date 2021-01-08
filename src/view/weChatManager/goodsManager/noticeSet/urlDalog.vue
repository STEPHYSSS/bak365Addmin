<template>
     <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
          <el-form-item label="链接名称" :label-width="formLabelWidth">
               <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth">
               <el-input v-model="form.name"></el-input>
          </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="sureUrl">确 定</el-button>
          </div>
     </el-dialog>
</template>
<script>
export default {
     name:'',
     data(){
          return{
               dialogFormVisible: false,
               form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
               },
               formLabelWidth: '120px'
          }
     },
     methods:{
          sureUrl(){//点击保存

          }
     }
}
</script>
<style lang="less" scoped>

</style>