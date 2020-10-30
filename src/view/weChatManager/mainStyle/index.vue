<template>
  <!-- 主题颜色列表 -->
  <div class="area_app_style">
    <div style="margin-bottom:30px">
      <el-button type="primary" @click="addColor">新增主题颜色</el-button>
      <el-table :data="tableData" style="width: 90%;margin-top:30px">
        <el-table-column prop="Name" label="配色方案" align="center">
        </el-table-column>
        <el-table-column prop="Colour" label="颜色标记" align="center">
          <template slot-scope="scope">
            <input type="color" :disabled="true" v-model="scope.row.Colour"/>
          </template>
        </el-table-column>
        <el-table-column label="是否默认" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.IsDefault | isDef}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scoped">
            <el-button
              v-if="scoped.row.SID"
              type="text"
              @click="delColor(scoped.row,scoped.$index)"
            >删除</el-button>
            <el-button
              v-if="scoped.row.SID"
              type="text"
              @click="editColor(scoped.row,scoped.$index)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          style="margin-top:10px"
          :inline="true"
        >
          <div>
            <el-form-item label="颜色标记">
              <input type="color" v-model="ruleForm.Colour" @change="handleChangeColor" />
            </el-form-item>
            <el-form-item label="配色方案">
              <el-input v-model="ruleForm.Name" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="是否默认">
              <el-switch @change="test" on-value="1" off-value="0" v-model="ruleForm.value1"></el-switch>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="colorBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      ruleForm: {
        Colour: "#CAEACC", //默认颜色
        Name: "", //配色方案
        SID:'',
        value1:'1'
      },
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getColorList();
  },
  methods: {
    //   获取颜色列表
    async getColorList() {
      try {
        let { Data } = await getLists(
          {
            Action: "GetStyleList",
          },
          "MShopOpera"
        );
        this.tableData = Data.DecorateList;
      } catch (error) {}
    },
    // 设置主题颜色
    addColor(){
      this.dialogFormVisible = true;
      this.ruleForm.Colour="#CAEACC"; //默认颜色
      this.ruleForm.Name= ""; //配色方案
      this.ruleForm.SID = "";
    },
    // 新增，编辑的提交
    async colorBtn() {
      if(this.ruleForm.Name == undefined){
        return this.$message.error('请输入主题名称')
      }
      try {
        let { Data } = await getLists(
          {
            Action: "SetStyle",
            Name: this.ruleForm.Name,
            Colour: this.ruleForm.Colour,
            IsDefault: this.ruleForm.value1 === true ? '1':'0',
            SID:this.ruleForm.SID ? this.ruleForm.SID:''
          },
          "MShopOpera"
        );
        this.getColorList();
        this.$message.success('操作成功')
        this.dialogFormVisible = false;
      } catch (error) {
           this.$message.error(error);
      }
    },
    test (val) {
      console.log(val)
      this.ruleForm.value1 = val;
    },
    // 编辑
    editColor(row){
         this.dialogFormVisible = true;
         this.ruleForm = row;
    },
    // 选择颜色
    handleChangeColor(val) {
         console.log(val)
    },
     // 删除     
    async delColor(val) {
      this.$confirm('是否删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let { Data } =  getLists(
            {
              Action: "RemoveStyle",
              SID: val.SID
            },
            "MShopOpera"
          );
          this.getColorList();
          this.$message.success("删除成功");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  filters:{
    isDef(val){
      return val == '1' ? '是':'否'
    }
  }
};
</script>

<style lang="less" scoped>
.area_app_style {
  .el-input {
    width: 280px;
  }
  .marking-color {
    width: 30px;
    height: 30px;
    border: 1px solid #6e6e6e;
  }
  .delete-icon-style {
    margin-left: 60px;
    font-size: 16px;
  }
}
</style>