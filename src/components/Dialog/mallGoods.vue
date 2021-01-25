<template>
  <div class="mallGoods">
    <!-- 多选商品 -->
    <el-dialog class="mallGoodsDialog" title="选择商品" v-if="dialogVisible" :visible.sync="dialogVisible" width="850px" :before-close="handleClose" center>
      <div style="margin-bottom: 20px;text-align: center;">
        <span>名称搜索</span>
        <el-input v-model="search.Name" placeholder="请输入" style="margin-right:10px;width:180px"></el-input>
        <el-button type="primary" @click="searchGood">搜索</el-button>
        <el-button type="primary" @click="cancerGood">重置</el-button>
      </div>
      <div class="rightGoods">
        <el-table :row-key="getRowKey" ref="multipleTable" :data="goodsNameList" tooltip-effect="dark" style="width: 100%" 
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange"
        highlight-current-row>
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center">
            <template slot-scope="scoped">
            <span v-if="scoped.row.StockType==='1'">{{scoped.row.Stock }}</span>
            <span v-else-if="scoped.row.StockType==='2'">门店库存</span>
            <span v-else>不限</span>
          </template>
          </el-table-column>
          <el-table-column prop="OldPrice" label="商品售价" align="center"></el-table-column>
          <el-table-column prop="Img" label="图片" align="center">
            <template slot-scope="scoped">
              <div class="goodsInfo">
                <img :src="scoped.row.Img | setImgPrex" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!isEvaluate">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureGood">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "mallGoods",
  props: {
    goodsShow: {
      type: Boolean,
      default: false
    },
    prodList: Array,
    isEvaluate: [Boolean, String],
    isGroup:{
      type: String,
      default:''
    }
  },
  data() {
    return {
      dialogVisible: false,
      loadingGoods: true,
      goodsNameList: [],
      currentRow: {},
      search: { Name: "" },
      multipleSelection: []
    };
  },
  components: {},
  mounted() {
    // this.getList();
  },
  methods: {
    // 单规格 sid 转换成 prodSid
    // 2,3 sid 转成 specSid
    async getList() {
      try {
        // 获取商品列表
        let { Data } = await getLists({ 
          Action: "GetProdList",
          Name: this.search.Name,
          State: "1" 
        },"MProdOpera");
        this.goodsNameList = Data.Prod_InfoList;
        this.$nextTick(() => {
          if(this.$refs.multipleTable){
            this.goodsNameList.forEach((item,index) => {
              this.prodList.forEach((item2,index2)=>{
                if(item.ProdNo == item2.ProdNo){
                  this.$set(item, 'SalePrice', item2.SalePrice || '')
                  this.$set(item, 'StoreQty', item2.StoreQty || '')
                  this.$set(item, 'SurplusQty', item2.SurplusQty || '')
                  this.$set(item, 'MaxBuyCnt', item2.MaxBuyCnt || '')
                  this.$refs.multipleTable.toggleRowSelection(item, true)
                }
              })
            })
          }
        })
        this.loadingGoods = false;
      } catch (e) {
        this.$message.error(e);
      }
    },
    searchGood(){
      this.getList();
    },
    cancerGood(){
      this.search.Name = "";
      this.getList();
    },
    handleSelectionChange(val) {    
      console.log(val)  
      this.multipleSelection = val;
    },
    getRowKey(row){
      return row.ProdNo;
    },
    // 多选
    selectAll(selection) {//秒杀多选
      this.multipleSelection = selection;
    },
    // 单选
    handleCurrentChange(val){
      this.currentRow = val
    },
    getGoodsCode(row,enent,column) {
      return row.SID;
    },
    handleClose(done) {
      done();
    },
    handleCloseSpecs(done) {
      done();
    },
    rowClickSpecs(list) {
      if (list.length === 0) return;
      this.specsListCurrent = list;
    },
    setSpecType(val) {
      switch (val) {
        case "1":
          return "单规格商品";
        case "2":
          return "多规格商品";
        case "3":
          // return "单规格商品-不同种类";
          return "多尺寸";
      }
    },
    sureGood() {
      // if(this.isGroup == 'group'){
      //   let current=[];
      //   current.push(this.currentRow)
      //   this.$emit("sureGood", current);
      // }else{

        this.ProdList = this.multipleSelection;
        if(this.ProdList.length>15){
          return this.$message.error('商品不能超过15个')
        }else {
          this.$emit("sureGood", this.ProdList);
        }
      // }
    }
  },
  watch: {
    dialogVisible(bool) {
      this.$emit("changeDig", bool);
    },
    goodsShow(bool) {
      console.log(bool)
      if(bool===true){
        this.getList()
      }
      this.dialogVisible = bool;
    }
  }
};
</script>

<style lang="less">
.mallGoods {
  .goodsInfo {
    width: 75px;
    height: 75px;
    border: 1px solid #eee;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .mallGoodsDialog .el-dialog__body {
    padding: 10px 25px 30px !important;
  }
  .leftGoods,
  .rightGoods {
    overflow-y: scroll;
    max-height: 400px;
    border: 1px solid #e5e5e5;
    padding: 0 !important;
  }
  .leftGoodsHead {
    height: 40px !important;
    line-height: 40px;
    background: #eeeeee;
  }
  .GoodsScroll {
    /*padding-top:4px;*/
    height: 358px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .rightGoods {
    li {
      list-style: none;
      text-align: left;
      line-height: 30px;
      margin-left: 20px;
    }
    .GoodsScrollName {
      height: 358px;
      padding: 20px 0 20px 0;
    }
    .scroll {
      overflow-y: scroll;
    }
    .el-table th {
      color: #606266;
      font-weight: 400;
      background: #eee;
      text-align: center;
      padding: 0;
      line-height: 40px;
    }
    .el-table td {
      padding: 10px;
    }
  }
}
</style>
