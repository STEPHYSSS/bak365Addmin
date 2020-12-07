<template>
<!-- 选择自己添加的列表内的商品 -->
  <el-dialog
    title="选择商品"
    class="goodsSelect"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    width="800px"
  > 
    <span>名称搜索</span>
    <el-input
      v-model="search.name"
      placeholder="请输入"
      @keyup.enter="searchName"
      style="margin-right:10px;width:180px"
    ></el-input>
    <span>编号搜索</span>
    <el-input
      v-model="search.ProdNo"
      placeholder="请输入"
      @keyup.enter="searchName"
      style="margin-right:10px;;width:180px"
    ></el-input>
    <el-button type="primary" @click="searchName">搜索</el-button>

    <el-row :gutter="40" class="goodsSelectRow">
      <el-col :span="12" class="leftGoods">
        <el-header class="leftGoodsHead">商品种类</el-header>
        <div class="GoodsScroll">
          <treeGoods @handleNodeClick="handleNodeClick" v-if="dialogVisible" :dataTree="dataTree"></treeGoods>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="rightGoods">
          <el-table
            v-loading="loadingGoods"
            highlight-current-row
            :data="goodsNameList"
            @row-click="rowClick"
            style="width: 100%"
          >
            <el-table-column prop="ProdName" label="商品"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureGood">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import treeGoods from "@/components/tree";
import { getLists } from "@/api/vipCard";
export default {
  components: { treeGoods },
  props: {
    goodsShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: {
        name: ""
      },
      // 当前点击行 商品
      currentRow: "",
      loadingGoods: false,
      dialogVisible: false,
      treeList: [],
      goodsNameList: [],
      dataTree: [],
      // 当前选中的商品
      currentCateNo: ""
      // 传过去的树data
      // data: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        // 获取商品列表
        let { Data } = await getLists(
          { Action: "GetProdCateBaseList" },
          "MProdOpera"
        );
        this.dataTree = Data.CateBaseList;
        // console.log( this.dataTree, 222);
        // this.treeList
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleNodeClick(obj, node, def) {
      this.currentCateNo = obj.CateNo;
      this.CateNo = obj.CateNo;
      this.search.name = "";
      this.getInfoBaseList();
    },
    // 点击选择商品种类，展示商品
    async getInfoBaseList() {
      this.loadingGoods = true;
      let { Data } = await getLists(
        {
          Action: "GetProdInfoBaseList",
          CateNo: this.currentCateNo,
          ProdName: this.search.name,
          ProdNo: this.search.ProdNo
        },
        "MProdOpera"
      );
      this.goodsNameList = Data.ProdInfoBaseList;
      this.loadingGoods = false;
    },
    // 选择商品
    rowClick(row) {
      // 点击当前的商品
      // console.log(row, 4444)
      this.currentRow = row;
    },
    sureGood() {
      this.$emit("sureGood", this.currentRow);
    },
    beforeClose(done) {
      // this.goodsNameList = [];
      done();
    },
    searchName() {
      // if (this.search.name === "") {
      //   this.currentCateNo = this.CateNo;
      // } else {
      //   this.currentCateNo = "";
      // }
      // console.log(this.search.name, "search.name");
      this.getInfoBaseList();
    }
  },
  watch: {
    dialogVisible(bool) {
      this.$emit("changeDig", bool);
    },
    goodsShow(bool) {
      this.dialogVisible = bool;
    }
  }
};
</script>

<style lang="less">
.goodsSelect {
  .el-dialog__body {
    text-align: center;
    padding: 10px 60px;
  }
  .el-table__row {
    cursor: pointer;
  }

  .el-input {
    width: 300px;
  }

  .goodsSelectRow {
    margin: 30px 0 !important;
    .leftGoods,
    .rightGoods {
      height: 400px;
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

  .el-table__body-wrapper {
    height: 358px;
    overflow-y: scroll;
  }
}
</style>
