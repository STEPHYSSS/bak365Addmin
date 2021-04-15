<template>
  <div class="markingManager">
    <el-table :data="suibian" style="width: 100%" v-loading="loading">
      <!-- <el-table-column prop="OpenID" label="微信ID"></el-table-column> -->
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.Headimgurl" alt="" class="imgWidth" />
        </template>
      </el-table-column>
      <el-table-column prop="NickName" label="名称"></el-table-column>
      <el-table-column prop="CardNo" label="微卡卡号"></el-table-column>

      <el-table-column prop="AddTime" label="申请时间"></el-table-column>
    </el-table>

    <!-- <div class="block" v-if="TotalList">
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
    </div> -->

    <!-- <audit
      :show="show"
      :showID="showID"
      @auditFunction="auditFunction"
      @confirmEnd="confirmEnd"
    ></audit> -->
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import audit from "@/components/Dialog/audit";
export default {
  name: "",
  data() {
    return {
      suibian: [],
      defaultImg: require("@/assets/img/defaule_back.png"),
      loading: false,
      search: {
        Mobile: "", //名称
        status: "" //审核状态
      },
      options: [
        {
          value: "1",
          label: "已审核"
        },
        {
          value: "0",
          label: "未审核"
        }
      ]
      //   showID: "",
      //   current_SID: "",
      //   current_Status: "",
      //   show: false, // 控制审核弹框
      //   TotalList: 0, //分页总数
      //   currentPage: 0,
      //   pageSize: 0
    };
  },
  components: { audit },
  mounted() {
    // this.getMarkingList();
    // this.checkFanslist();
    this.getList();
  },
  methods: {
    // // //获取团长粉丝数据
    // async chakan(row) {
    //   console.log("我真的是你要找的row", row);
    //   this.loading = true;
    //   try {
    //     let { Data } = await getLists(
    //       {
    //         Action: "GetFansDetail",
    //         // SID: row.SID,
    //         LeaderSID:row.SID //团长编号
    //       },
    //       "MMemberOpera"
    //     );
    //     this.suibian = Data.FansList;
    //     this.loading = false;
    //   } catch (e) {
    //     this.$message.error(e);
    //     this.loading = false;
    //   }
    //   this.$router.push({
    //     path: "/weChat/manager/marking/tuanzhangLieBiao",
    //     query: { SID: row.SID }
    //   });
    // },

    async getList() {
      try {
        this.loading = true;
        let obj = {
          Action: "GetFansDetail",
          LeaderSID: this.$route.query.SID
        };
        let data = await getLists(obj, "MMemberOpera");
        this.suibian = data.Data.FansList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    //   console.log("我是row", row);
      //   this.$router.push({
      //     path: "/weChat/manager/marking/tuanzhangLieBiao",
      //     query: { SID: row.SID }
      //   });
    }

    // chakan(row) {
    //   // console.log("我是你要找的row",row);
    //   this.$router.push({
    //     path: "/weChat/manager/marking/tuanzhangLieBiao",
    //     query: { SID: row.SID }
    //   });
    // },
    // handleSizeChange(val) {
    //   console.log(`每页${val}条`);
    //   console.log("我是你要找的val", val);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.getMarkingList();
    //   // this.checkFanslist();
    // },
    // // 获取列表
    // async getMarkingList() {
    //   this.loading = true;
    //   try {
    //     let { Data } = await getLists(
    //       {
    //         Action: "GetLeaderList",
    //         Mobile: this.search.Mobile,
    //         Audit: this.search.status,
    //         Page: this.currentPage - 1
    //         // SID:this.current_SID
    //       },
    //       "MMemberOpera"
    //     );
    //     this.suibian = Data.LeaderList;
    //     this.TotalList = Data.DataCount;
    //     this.pageSize = Data.PageSize;
    //     this.loading = false;
    //   } catch (e) {
    //     this.$message.error(e);
    //     this.loading = false;
    //   }
    // },
    // 查询
    // searchName() {
    //   // 名称搜索
    //   // this.page.current_page = 1;
    //   this.getMarkingList();
    // },
    // auditFunction(bool) {
    //   this.show = bool;
    // },
    //审核
    // audit(row) {
    //   this.show = true;
    //   this.current_OpenID = row.OpenID;
    //   this.showID = row.Audit;
    // },
    // async confirmEnd(val) {
    //   if (val === "1") {
    //     this.current_Status = "0";
    //   } else {
    //     this.current_Status = "1";
    //   }
    //   try {
    //     await getLists(
    //       {
    //         Action: "AuditLeader",
    //         OpenID: this.current_OpenID,
    //         Audit: this.current_Status
    //       },
    //       "MMemberOpera"
    //     );
    //     this.$message.success("审核成功");
    //     this.getMarkingList();
    //     this.show = false;
    //   } catch (e) {
    //     this.show = false;
    //     this.$message.error(e);
    //   }
    // }
  },
  filters: {
    checkTip(val) {
      if (val === "1") {
        return "已审核";
      } else return "未审核";
    }
  }
};
</script>

<style lang="less" scoped>
.imgWidth {
  width: 60px;
  height: 60px;
}
.markingManager {
  .marginBottom {
    margin-bottom: 20px;
  }
}
</style>