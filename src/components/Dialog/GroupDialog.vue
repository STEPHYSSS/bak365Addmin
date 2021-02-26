 <!-- 自定义页面使用的秒杀活动选择商品 使用到的弹框组件 -->
<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" :before-close="beforeClose" width="900px" :modal-append-to-body="false" class="setDialogGoodsAuto" center>
     <el-table :data="dataTree" >
      <el-table-column width="100" label="微信头像" align="center">
        <template slot-scope="scope">
            <div style="width:80px;height:80px;border:1px solid #eee">
              <img :src="scope.row.Headimgurl" alt style="width:100%;height:100%" />  <br/>
              {{scope.row.MyGroup|MyGroupTips}}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="MyGroup" label="微信昵称" align="center"></el-table-column>
      <el-table-column prop="Name" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="NUM" label="订单号" align="center"></el-table-column>
      <el-table-column prop="GroupState" label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.GroupState|GroupStateTips}}
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="参团时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" @click="detail(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button type="primary" @click="sureGood">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getLists } from "@/api/vipCard";
import { GetBaseImgUrl } from "@/config/publicFunction";
export default {
     name:"",
     props:{
          defaultData:[Array||String],
          Type:String
     },
     data(){
          return{
               Name:"",//搜索 名称
               dataTree: [],//表格 数据
               dialogVisible: false,
               itemVal: [],
               defaultItemVal: []
          }
     },
     methods:{
          async getSeckillList(){//获取活动商品列表
               // 暂用商品的接口
               try {
                    let { Data } = await getLists({ Action: "GetGroupDetail"}, "MPromotionOpera");
                    this.dataTree = Data.PromItemList;
               } catch (error) {
                    this.$message.error(e)
               }
          },
          detail(){},
          handleSelectionChange(val) {      
               this.itemVal = val;//选中的数据
          },
          getRowKey(row){
               return row.ProdNo;
          },
          beforeClose(done) { // 关闭弹窗
               this.$emit("beforeClose");
               this.$refs.multipleTable.clearSelection();
               done();
          },
          sureGood() {// 确定
               this.dialogVisible = false;
               this.$emit("sureGood", this.itemVal);
               this.$emit("beforeClose");
          }
     },
     watch:{
          dialogVisible(val) {
               if (val) {
                    console.log(val)
                    if (this.$refs.multipleTable) {
                         this.$refs.multipleTable.clearSelection();
                    }
                    if (this.dataTree.length == 0) {
                         this.getSeckillList();
                    }
               }
          },
     },
     filters:{
          timeF(val){
               let timef = val.split(' ');
               let timef2 = timef[0];
               return timef2
          }
     }
}
</script>
<style>
.seckillDiv{
     margin-bottom: 15px;
}
.input-with-select{
     width: 300px;
}
</style>