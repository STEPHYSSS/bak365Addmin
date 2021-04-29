<template>
  <div>
    卡号：<el-input
      v-model="search.CardNo"
      placeholder="请输入卡号"
      style="width: auto"
      @keyup.enter.native="searchName"
      class="marginBottom"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchName"
      ></el-button>
    </el-input>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="Headimgurl"
        label="用户头像"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.Headimgurl ? scope.row.Headimgurl : defaultImg"
            class="imgWidth"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="NickName"
        label="用户名称"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="CardNo" label="卡号" align="center">
      </el-table-column>

      <el-table-column prop="Score" label="积分" align="center">
      </el-table-column>
      <el-table-column
        prop="GiveName"
        label="赠送信息"
        align="center"
      >
        <template slot-scope="scoped">
          <div style="white-space:pre-wrap">{{ scoped.row.GiveName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="签到时间" align="center">
      </el-table-column>
    </el-table>
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
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
  data() {
    return {
      tableData: [],
      defaultImg: require("@/assets/img/defaule_back.png"),
      search:{
          CardNo:"",//卡号
      },
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0
    };
  },
  created() {
      this.GetSignInListCensus();
  },
  methods: {
    async GetSignInListCensus() {
      this.loading = true;
      try {
        let obj = {
          Action: "GetSignInList",
          Page: this.currentPage - 1,
          CardNo: this.search.CardNo
        };
        let data = await getLists(obj, "MMemberOpera");
        this.TotalList=data.Data.DataCount;
        this.pageSize = data.Data.PageSize;

        data.Data.List.forEach(item=>{
            item.GiveName=item.GiveName.replace(/;/g,"\n");
        });
        this.tableData=data.Data.List||[];

        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    searchName(){
        this.GetSignInListCensus();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val);
    }
  }
};
</script>

<style lang="less" scoped>
.imgWidth {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}
</style>