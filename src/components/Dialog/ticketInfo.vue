<template>
  <!-- 选择电子劵 -->
  <el-dialog class="dialogTicketFa" title="选择电子劵" :visible.sync="dialogVisible" width="600px">
    <span>名称搜索</span>
    <el-input
      v-model="tiketName"
      placeholder="请输入"
      @keyup.enter="searchName"
      style="margin-right:10px;width:180px"
    ></el-input>
    <el-table
      ref="multipleTable"
      :data="tiketList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="TypeNo" label="编号" align="center"></el-table-column>
      <el-table-column prop="TypeName" label="名称" align="center"></el-table-column>
      <el-table-column prop="Price" label="售价" align="center"></el-table-column>
      <el-table-column prop="TakeMoney" label="面额" align="center"></el-table-column>
      <el-table-column prop="TakeDisc" label="折扣" align="center"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmEnd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  props: {
    showTicket: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      tiketList: [],
      multipleSelection: [],
      tiketName: "",
    };
  },
  created() {
    this.getTicket();
  },
  methods: {
    async getTicket() {
      try {
        let Data = await getLists(
          { Action: "GetTicketList", TypeName: this.tiketName },
          "MProdOpera"
        );
        this.tiketList = Data.TicketList;
        console.log(this.tiketList)
      } catch (error) {
        this.$message.error(error);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    confirmEnd() {
      this.$emit("confirmTicket");
      this.dialogVisible = false;
    },
    searchName() {
      //搜索
      this.getTicket();
    },
  },
  watch: {
    showTicket(val) {
      this.dialogVisible = val;
    },
    dialogVisible(bool) {
      this.$emit("changeDigTicket", bool);
    },
  },
};
</script>

<style lang="less">
.dialogTicketFa {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .dialogTicket {
    border: 1px solid #eee;
    width: 100%;
    height: 400px;
    .el-input-number__decrease,
    .el-input-number__increase {
      display: none;
    }
    .el-input__inner {
      padding: 0;
      width: 100px;
    }
  }
}
</style>
