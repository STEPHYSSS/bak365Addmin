<template>
<!-- 选择电子劵 -->
  <el-dialog
    class="dialogTicketFa"
    title="选择电子劵"
    :visible.sync="dialogVisible"
    width="600px">
    <div class="dialogTicket">
      <el-header>可选电子劵</el-header>
      <el-table
        height="350"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          width="150"
          label="数量">
          <template slot-scope="scoped">
            <el-input-number v-model="scoped.row.num" controls-position="right" :min="1"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmEnd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showTicket: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      dialogVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods:{
    confirmEnd(){
      // console.log(this.tableData);
      this.$emit('confirmTicket')
      this.dialogVisible = false
    }
  },
  watch: {
    showTicket(val) {
      this.dialogVisible = val
    },
    dialogVisible(bool){
      this.$emit('changeDigTicket', bool)
    }
  }
}
</script>

<style lang="less">
  .dialogTicketFa{
    .el-dialog__header{
      border-bottom: 1px solid #eee;
    }
    .el-dialog__footer{
      text-align: center;
    }
    .dialogTicket{
      border: 1px solid #eee;
      width:100%;
      height: 400px;
      .el-input-number__decrease,.el-input-number__increase{
        display: none;
      }
      .el-input__inner{
        padding:0;
        width:100px;
      }
    }
  }

</style>
