<template>
  <!-- 自定义页面使用的选择商品，商品分组 使用到的弹框组件 -->
  <el-dialog
    title="选择商品"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    width="800px"
    :modal-append-to-body="false"
    class="setDialogGoodsAuto"
    center
    append-to-body
  >
  <el-row style="margin-bottom:10px" v-if="!isGroup">
    <el-col :span="10">
        名称：<el-input v-model="Name" clearable @clear="clearName" placeholder="请输入商品名称" class="widthW"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button  @click="searchName">查询</el-button>
      </el-col>
  </el-row>
    <el-table
      ref="multipleTable"
      :data="dataTree"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      :highlight-current-row="isGroup"
      max-height="450"
    >
      <el-table-column v-if="!isGroup" type="selection" width="55"></el-table-column>
      <el-table-column label="图片" width="120" v-if="!isGroup">
        <template slot-scope="scope">
          <div style="width:100px;height:100px;border:1px solid #eee">
            <img :src="scope.row.Img|filterImg" alt style="width:100%;height:100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <a>{{scope.row.Name}}</a>
        </template>
      </el-table-column>
      <el-table-column v-if="!isGroup" prop="AddTime" label="创建时间" width="170"></el-table-column>
      <el-table-column v-else prop="UpTime" label="创建时间" width="170"></el-table-column>
    </el-table>
    <div class="block" v-if="TotalList">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="changePage"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="TotalList">
      </el-pagination>  
    </div>    
    <span slot="footer">
      <el-button type="primary" @click="sureGood">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  props: {
    defaultData: [Array||String],
    isGroup: [Boolean]
  },
  data() {
    return {
      dataTree: [],
      dialogVisible: false,
      itemVal: [],
      defaultItemVal: [],
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      Name:'',
      ProdNo:''
    };
  },
  components: {},
  created() {
  },
  methods: {
    async getList() {
      try {
        // 获取商品列表
        let action = this.isGroup ? "GetCateList" : "GetProdInfoList";
        let { Data } = await getLists({ Action: action ,Page: this.currentPage - 1,
          Name:this.Name,
          ProdNo:this.ProdNo,}, "MProdOpera");
        this.dataTree = this.isGroup ? Data.ProdCateList : Data.Prod_InfoList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        if (!this.isGroup) {
          // if (this.defaultData) {
          //   this.defaultItemVal = this.dataTree.filter(
          //     (D, index) => D.SID == this.defaultData[index]
          //   );
          // }

          // setTimeout(() => {
          //   this.defaultItemVal.forEach(row => {
          //     if (this.$refs.multipleTable) {
          //       this.$refs.multipleTable.toggleRowSelection(row);
          //     }
          //   });
          // });
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    clearName(){
      this.getList();
    },
    searchName(){
      this.getList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    changePage(val) {
      this.currentPage = val;
      this.getList(val);
    },
    handleSelectionChange(arr) {
      this.itemVal = arr;
    },
    handleCurrentChange(val) {
      // 单选
      this.itemVal = val;
    },
    beforeClose(done) {
      this.$emit("beforeClose");
      this.$refs.multipleTable.clearSelection();
      done();
    },
    sureGood() {
      this.dialogVisible = false;
      this.$emit("sureGood", this.itemVal);
      this.$emit("beforeClose");
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.$refs.multipleTable) {
          this.$refs.multipleTable.clearSelection();
        }
        if (this.dataTree.length == 0) {
          this.getList();
        }
      }
    },
    isGroup() {
      this.itemVal = [];
      this.getList();
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.widthW{
    width: 170px;
  }
</style>