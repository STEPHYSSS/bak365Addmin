<template>
  <div class="advertise">
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="addAddver"
        >添加广告</el-button
      >
    </div>
    <el-row class="marginBottom">
      <el-col :span="6">
        <span>名称：</span>
        <el-input
          placeholder="请输入活动名称"
          v-model="search.Name"
          clearable
          @clear="clearN"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchN"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <span>状态：</span>
        <el-select
          placeholder="请选择活动状态"
          v-model="search.State"
          clearable
          @change="changeState"
          class="selectSearch"
        >
          <el-option
            v-for="item in addverStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>类型：</span>
        <el-select
          placeholder="请选择活动状态"
          v-model="search.AdvertisingType"
          clearable
          @change="changeState"
          class="selectSearch"
        >
          <el-option
            v-for="item in addverType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>开始时间：</span>
        <el-date-picker
          v-model="search.StartDate"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeTime"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <span>结束时间：</span>
        <el-date-picker
          v-model="search.EndDate"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeTime"
        >
        </el-date-picker>
      </el-col>
    </el-row>

    <el-table :data="dataList" v-loading="loading" style="width: 100%;">
      <el-table-column label="名称" width="200px" prop="Name" align="center">
      </el-table-column>
      <el-table-column width="200px" align="center" label="广告图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.Img ? scope.row.Img : defaultImg"
            alt=""
            class="imgWidth"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="广告类型" prop="AdvertisingType" align="center"> -->
      <el-table-column label="广告类型" align="center">
        <template slot-scope="scope">{{
          scope.row.AdvertisingType | setAddverType
        }}</template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.State | setAddverState }}
        </template>
      </el-table-column>

      <el-table-column
        label="添加时间"
        prop="AddTime"
        align="center"
        width="300px"
      >
        <!-- <template slot-scope="scope">{{ scope.row.AddTime }}</template> -->
      </el-table-column>
      <el-table-column width="300px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editAddver(scope.row, scope.$index)"
            >编辑</el-button
          >
          <el-button type="text" @click="delAddver(scope.row, scope.$index)"
            >删除</el-button
          >
          <!-- 活动状态 -->
          <el-button type="text" @click="changeActiveState(scope.row, 'State')">
            {{ scope.row.State | setAddverState }}
          </el-button>
          <!-- <el-button type="text" @click="change(scope.row)" v-if="scope.row.State==='1'">
            开启
          </el-button>
          <el-button type="text" @click="change(scope.row)" v-else>关闭</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del> -->
    <!-- <ModifyCate :cateShow="cateShow" @cateFunction="cateFunction" :isIntegral="true"></ModifyCate> -->
    <div class="block" v-if="TotalList">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="TotalList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addverStatus, addverType } from "@/config/utils";
import { getLists } from "@/api/vipCard";
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      addverStatus: addverStatus,
      addverType: addverType,
      show: false,
      // current_index: "",
      // current_SID:"",
      // current_State: "", //状态
      // current_Open: "", //关闭
      search: {
        Name: "",
        State: "",
        AdvertisingType: ""
      },
      TotalList: 0,
      currentPage: 0,
      pageSize: 0,
      defaultImg: require("@/assets/img/defaule_back.png")
    };
  },
  mounted() {
    this.getAddverList();
    this.changeActiveState();
    this.getAddverList();
  },
  created() {
    this.getAddverList();
  },
  methods: {
    editAddver(row) {
      this.$router.push({
        path: "/weChat/manager/activity/addAddvertising",
        query: { SID: row.SID }
      });
      // this.ruleForm=row;
    },
    addAddver() {
      this.$router.push("/weChat/manager/activity/addAddvertising");
    },

    delAddver(row) {
      this.$confirm("是否删除此数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delFun(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除
    async delFun(row) {
      try {
        let Data = await getLists(
          {
            Action: "RemoveAdvertising",
            SID: row.SID
          },
          "MShopOpera"
        );
        this.$message.success("删除成功");
        this.getAddverList();
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      console.log("我是你要找的val", val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAddverList();
    },
    //获取列表
    async getAddverList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          {
            Action: "GetAdvertisingList",
            Name: this.search.Name,
            State: this.search.State,
            AdvertisingType: this.search.AdvertisingType,

            StartDate: this.search.StartDate,
            EndDate: this.search.EndDate,

            Page: this.currentPage - 1
          },
          "MShopOpera"
        );
        this.dataList = Data.List;
        // let setImg=this.dataList?"Img":"ImgList";
        // this.dataList.forEach(D=>{
        //   D.ImgList=D[setImg]?D[setImg].split(","):[];
        //   D.ImgList.forEach((dataList,index)=>{
        //     D.ImgList[index]=process.env.Prefix+data;
        //   });
        //   this.$set(D,"State",D.State==="1"?true:false);
        // })
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 状态
    async changeActiveState(row, val) {
      // this.row.State =row.State=== "1" ? "0" : "1";
      try {
        let data = await getLists(
          {
            Action: "SetAdvertisingState",
            SID: row.SID,
            State: row.State == "1" ? "0" : "1"
          },
          "MShopOpera"
        );
        this.$message.success("操作成功");
        this.getAddverList();
      } catch (e) {
        this.$message.error(e);
      }
    },

    clearN() {
      this.getAddverList();
    },
    searchN() {
      this.getAddverList();
    },
    changeState() {
      this.getAddverList();
    },
    changeTime() {
      this.getAddverList();
    },
    change() {}
  },

  filters: {
    setAddverType(val) {
      if (val === "0") {
        return "活动";
      } else if (val === "1") {
        return "商品";
      } else if (val === "2") {
        return "文章";
      }
    },
    setAddverState(val) {
      if (val === "0") {
        return "关闭";
      } else if (val === "1") {
        return "开启";
      }
    }
  }
};
</script>

<style lang="less">
.advertise {
  .goodsInfo {
    width: 75px;
    height: 75px;
    border: 1px solid #eee;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .goodInfoRight {
    margin: 0px 0 0 20px;
    line-height: 32px;
  }
  .marginBottom {
    margin-bottom: 15px;
    overflow: hidden;
  }
  .input-with-select {
    width: 250px;
    // margin-left: 10px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #fff !important;
    color: #409eff;
  }
  .el-col-6 {
    width: 25%;
    margin-top: 20px;
    /* margin-bottom: 15px; */
  }
  .imgWidth {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
}
</style>