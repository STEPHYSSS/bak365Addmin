<template>
  <el-dialog class="dialogTicketFa" title="选择电子券" :visible.sync="dialogVisible" width="800px">
    <div class="chaxun">
      <span>名称搜索:</span>
      <el-input v-model="tiketName" placeholder="请输入" @keyup.enter="searchName" class="inputSty"></el-input>
      <el-button @click="searchName">查询</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tiketList"
      highlight-current-row
      style="width: 100%;height:500px;overflow-y: scroll;"
    >
      <el-table-column
        prop="TypeNo"
        label="编号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="TypeName"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.number"
            maxlength="2"
            oninput="value=value.replace(/[^\d]/g, '')"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" :disabled="disabled">取 消</el-button>
      <el-button type="primary" @click="sureGood" :disabled="disabled">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
     props: {
          showTicket: {
               type: Boolean,
               default: false
          },
     },
     data(){
          return{
               dialogVisible:false,
               loadingBtn: false,
               disabled: false,
               tiketList:[],//电子券列表
               tiketName:"",//查询电子券名称
               giveInfo:"",//返回给父组件的数据
          }
     },
     created(){
          this.getSatisfy();
     },
     methods:{
          // 获取电子券列表
          async getSatisfy(){
               try {
                    let { Data } = await getLists(
                         { Action: "GetTicketList", TypeName: this.tiketName },
                         "MProdOpera"
                    );
                    this.tiketList = Data.TicketList;
                    this.$set(this.tiketList, "number");
               } catch (error) {
                    this.$message.error(error);
               }
          },
          searchName(){//按名称搜索
               this.getSatisfy();
          },
          sureGood() {
               this.loadingBtn = true
               let info = "";
               this.tiketList.forEach((item) => {
                    if (item.number) {
                         info += item.TypeNo + "," + Number(item.number) + ";";
                    }
               });
               this.giveInfo = info;
               this.$emit('sureGood',this.giveInfo)               
          }
     },
     watch: {
          showTicket(val) {
               this.dialogVisible = val
          },
          dialogVisible(bool){
               this.$emit('changeDig', bool)
               if(this.loadingBtn){
                    this.loadingBtn = bool
               }
          },
          loadingBtn(val){
               if(val){
                    this.disabled = true
               }else{
                    this.disabled = false
               }
          }
     }
}
</script>
<style lang="less" scoped>
.chaxun{
     margin-bottom: 20px;
}
.inputSty{
     margin-right: 10px;
     width: 180px
}
</style>