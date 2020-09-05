<template>
  <div class="mallGoods">
    <!-- 选择线下的商品 -->
    <!-- <el-dialog
      class="mallGoodsDialog"
      title="选择商品1111"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      center
    >
      <div style="margin-bottom: 20px;text-align: center;">
        <span>名称搜索</span>
        <el-input
          v-model="search.Name"
          placeholder="请输入"
          @keyup.enter="searchName"
          style="margin-right:10px;width:180px"
        ></el-input>
        <el-button type="primary" @click="searchName">搜索</el-button>
      </div>
      <div class="rightGoods">
        <el-table
          v-loading="loadingGoods"
          highlight-current-row
          :data="goodsNameList"
          @row-click="rowClick"
          style="width: 100%"
        >
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="SpecType" label="商品类型" align="center">
            <template slot-scope="scoped">
              <span>{{setSpecType(scoped.row.SpecType)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="StoreQty" label="商品库存" align="center"></el-table-column>
          <el-table-column prop="SalePrice" label="商品售价" align="center"></el-table-column>
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

    <el-dialog
      title="选择商品规格"
      :visible.sync="dialogVisibleSpecs"
      width="900px"
      :before-close="handleCloseSpecs"
      center
    >
      <div style="margin-bottom:8px">请填写完价格后，再勾选参加活动的商品</div>
      <el-table
        ref="multipleTable"
        v-loading="loadingGoodsSpecs"
        :data="goodsSpecsList"
        tooltip-effect="dark"
        @selection-change="rowClickSpecs"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="Name" label="规格名称"></el-table-column>
        <el-table-column prop="SalePrice" label="规格价格"></el-table-column>
        <el-table-column prop="StoreQty" label="规格库存" width="80px"></el-table-column>
        <el-table-column prop="TastName" label="规格口味"></el-table-column>
        <el-table-column prop="Price" label="活动价格">
          <template slot-scope="scoped">
            <el-input style="width:80px" v-model="scoped.row.Price"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="Stock" label="活动商品数量">
          <template slot-scope="scoped">
            <el-input style="width:80px" v-model="scoped.row.Stock"></el-input>要注释
            <el-input-number style="width:80px" v-model="scoped.row.Stock" :controls="false"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="默认已售多少件" prop="SurplusQty">
          <template slot-scope="scoped">
            <el-input-number
              style="width:80px"
              v-model="scoped.row.SurplusQty"
              :controls="false"
              :max="scoped.row.Stock"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSpecs = false">取 消</el-button>
        <el-button type="primary" @click="sureGoodSpecs">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 多选商品 -->
    <el-dialog
      class="mallGoodsDialog"
      title="选择商品1111"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      center
    >
      <div style="margin-bottom: 20px;text-align: center;">
        <span>名称搜索</span>
        <el-input v-model="search.Name" placeholder="请输入" style="margin-right:10px;width:180px"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="rightGoods">
        <el-table
          ref="multipleTable"
          :data="goodsNameList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select-all="selectAll"
          :row-key="getGoodsCode"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <!-- <el-table-column prop="SpecType" label="商品类型" align="center">
            <template slot-scope="scoped">
              <span>{{setSpecType(scoped.row.SpecType)}}</span>
            </template>
          </el-table-column>-->
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center"></el-table-column>
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
    prodList: {
      type: Array,
      default: []
    },
    isEvaluate: [Boolean, String]
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
    this.getList();
  },
  methods: {
    // 单规格 sid 转换成 prodSid
    // 2,3 sid 转成 specSid
    async getList() {
      try {
        // 获取商品列表
        let { Data } = await getLists(
          { Action: "GetProdList", Name: this.search.Name, State: "1" },
          "MProdOpera"
        );
        this.goodsNameList = Data.Prod_InfoList;
        if(this.$refs.multipleTable){
          this.goodsNameList.forEach((item,index) => {
            this.prodList.forEach((item2,index2)=>{
              if(item.SID == item2.SID){
                this.$nextTick(()=>{
                  this.$refs.multipleTable.toggleRowSelection(this.goodsNameList[index],true)
                })
              }
            })
          })
        }
        // goodsNameList.forEach(item => {
        //   this.$set(item,item.SpecType === '1' ? 'ProdSID':'SpecSID',item.SID)
        // });
        // this.goodsNameList = goodsNameList;
        // console.log(this.goodsNameList,'011')
        // 去掉了 单规格商品-不同种类商品参加活动 我昨天改了一个列表的，好像就是这参数
        // this.goodsNameList = this.goodsNameList.filter((D) => {
        //   return D.State === "1" && D.SpecType !== "3";
        // });
        this.loadingGoods = false;
      } catch (e) {
        // console.log(e);
        this.$message.error(e);
      }
    },
    handleSelectionChange(val) {      
      this.multipleSelection = val;
    },
    // 多选
    selectAll(selection) {
      this.multipleSelection = selection;
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
    // async rowClick(row) {
    //   console.log(row);
    //   // 点击当前的商品
    //   // if (this.isEvaluate) {
    //   //   this.$emit("sureGood", row);
    //   //   this.dialogVisible = false;
    //   //   return;
    //   // }
    //   // this.tableData = this.multipleSelection2;
    //   // if (this.currentRow.SID === row.SID) {
    //   //   if (row.SpecType !== "1") {
    //   //     this.dialogVisibleSpecs = true;
    //   //   }
    //   //   return;
    //   // }
    //   // this.specsListCurrent = [];
    //   // this.currentRow = row;
    //   // if (row.SpecType !== "1") {
    //   //   this.dialogVisibleSpecs = true;
    //   //   //除了单规格以外
    //   //   try {
    //   //     // 获取商品规格列表
    //   //     let { Data } = await getLists(
    //   //       { Action: "GetSpecList", SID: row.SID },
    //   //       "MProdOpera"
    //   //     );
    //   //     this.loadingGoodsSpecs = false;
    //   //     this.goodsSpecsList = Data.ProdSpecList;

    //   //     let arr = JSON.parse(JSON.stringify(this.prodList));
    //   //     if (arr.length > 0) {
    //   //       //添加默认值
    //   //       arr.forEach((D, index) => {
    //   //         D.Price = D.SalePrice;
    //   //         D.Stock = D.StoreQty;
    //   //         D.SurplusQty =
    //   //           Math.round((Number(D.StoreQty) - Number(D.SurplusQty)) * 100) /
    //   //           100;
    //   //         delete arr[index].StoreQty;
    //   //       });

    //   //       this.goodsSpecsList.forEach((D, index) => {
    //   //         arr.forEach((data, i) => {
    //   //           data.Stock = Number(data.Stock);
    //   //           if (data.SpecSID === D.SID) {
    //   //             Object.assign(this.goodsSpecsList[index], arr[i]);
    //   //           }
    //   //         });
    //         // });
    //     //   }
    //     // } catch (e) {
    //     //   console.log(e, 888);
    //     //   this.$message.error(e);
    //   //   }
    //   // }
    // },
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
      this.ProdList = this.multipleSelection;
      this.$emit("sureGood", this.ProdList);
      // let ProdList = [];
      // if (this.currentRow.SpecType !== "1") {
      //   if (this.specsListCurrent.length === 0) {
      //     this.$message.info("请选择参加商品的规格");
      //   } else {
      //     this.specsListCurrent.forEach((D, index) => {
      //       ProdList[index] = {
      //         SpecType: this.currentRow.SpecType,
      //         ProdNo: D.ProdNo,
      //         ProdSID: D.ProdSID || "",
      //         SalePrice: D.Price,
      //         StoreQty: D.Stock,
      //         //总库存 - 已售多少件 = 剩余多少库存
      //         SurplusQty: Number(D.Stock) - Number(D.SurplusQty || 0),
      //         SpecSID: D.SpecSID ? D.SpecSID : D.SID,
      //         Name: D.Name,
      //         OldPrice: D.SalePrice,
      //       };
      //     });
      //     let bool = this.specsListCurrent.some((value, index) => {
      //       return !value.Price;
      //     });

      //     let bool1 = this.specsListCurrent.some((value, index) => {
      //       return !value.Stock;
      //     });

      //     if (bool) {
      //       this.$message.info("请填写活动价格");
      //     } else if (bool1) {
      //       this.$message.info("请填写活动商品数量");
      //     } else {
      //       // 出去
      //       this.$emit("sureGood", ProdList);
      //     }
      //   }
      // } else {
      // ProdList = [
      //   {
      //     SpecType: this.currentRow.SpecType,
      //     ProdNo: this.currentRow.ProdNo,
      //     ProdSID: this.currentRow.SID,
      //     OldPrice: this.currentRow.SalePrice
      //   }
      // ];
      // ProdList = [this.currentRow];
      // console.log(ProdList);
      // // 出去
      // this.$emit("sureGood", ProdList);
    }
  },
  // sureGoodSpecs() {
  //   this.dialogVisibleSpecs = false;
  // },

  // searchName() {
  //   this.getList();
  // },
  // },
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
