<template>
  <div class="taste">
     <el-form :model="ruleForm" ref="ruleForm" style="margin-top: 10px" :inline="true">
          <el-form-item label="商品属性名称" :rules="[{ required: true, message: '请输入商品属性名称', trigger: 'blur' }]">
            <el-input v-model="ruleForm.Name" style="width: 220px" @blur="onBlur"></el-input>
          </el-form-item>
     </el-form>
     <p>属性值列表</p>
    <el-button type="primary" class="btnSty" @click="addTaste">新增属性值</el-button>
    <el-table :data="tableData">
          <el-table-column prop="Name" label="商品属性名称" align="center">
      </el-table-column>
    </el-table>
    <el-dialog title="商品属性信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" style="margin-top: 10px" :inline="true">
        <div>
          <el-form-item label="商品属性值名称" :rules="[{ required: true, message: '请输入商品属性名称', trigger: 'blur' }]">
            <el-input v-model="ruleForm.NameVal" style="width: 220px"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="colorBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "taste",
  data() {
    return {
     tableData: [],
     ruleForm:{
     Name:'',
     NameVal:''
     },
     dialogFormVisible:false,
     ParentNo:''
    };
  },
  created(){
     this.getInfo();
  },
  methods:{
     onBlur(){          
          this.list();
          
     },
     async list(){
          let { Data } = await getLists(
          {
            Action: "SetParamInfo",
            Name: this.ruleForm.Name,
            Type:'2'
          },
          "MBaseOpera"
        );
     },
     async getInfo(){
          let { Data } = await getLists(
          {
            Action: "GetParamList",
            Type:'2'
          },
          "MBaseOpera"
        );
        this.tableData = Data.ParamInfoList
     },
     addTaste(){
          this.dialogFormVisible = true;
     },
     colorBtn(){
          
     }
  }
};
</script>
<style lang="less" scoped>
.btnSty{
     margin-top: 10px;
}
</style>