 <!-- 自定义页面使用的秒杀活动选择商品 使用到的弹框组件 -->
<template>
  <el-dialog title="秒杀商品" :visible.sync="dialogVisible" :before-close="beforeClose" width="900px" :modal-append-to-body="false" class="setDialogGoodsAuto" center>
     <!-- <div class="seckillDiv">
           <span>活动商品名称：</span><el-input placeholder="请输入活动商品名称" v-model="Name" clearable  class="input-with-select">
          <el-button slot="append" icon="el-icon-search" ></el-button>
     </el-input>
     </div> -->
     <el-table ref="multipleTable" :data="dataTree" tooltip-effect="dark"
     :row-key="getRowKey" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column prop="PromName" label="活动名称"></el-table-column>
          <el-table-column width="100">
               <template slot-scope="scope">
                    <div style="width:80px;height:80px;border:1px solid #eee">
                    <img :src="scope.row.Img|SetImage" alt style="width:100%;height:100%" />               
                    </div>
               </template>
          </el-table-column>
          <el-table-column prop="Name" label="商品名称"></el-table-column>
          <el-table-column prop="ProdNo" label="商品名称"></el-table-column>
          <el-table-column label="活动时间" width="280" align="center">
               <template slot-scope="scoped">
                    {{scoped.row.StartDate|timeF}} 至 {{scoped.row.EndDate|timeF}}
               </template>
          </el-table-column>
          <el-table-column label="优惠情况">
               <template slot-scope="scoped">
                    <span>秒杀价：{{scoped.row.SalePrice}}</span><br/>
                    <span>秒杀库存：{{scoped.row.SurplusQty}}</span>
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
          defaultData:[Array||String]
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
                    let { Data } = await getLists({ Action: "GetPromProdInfo",Type:'1' }, "MPromotionOpera");
                    this.dataTree = Data.PromItemList;
                    // this.dataTree.forEach(item=>{
                    //      item.Img = GetBaseImgUrl()+item.Img;
                    // })
               } catch (error) {
                    this.$message.error(e)
               }
          },
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