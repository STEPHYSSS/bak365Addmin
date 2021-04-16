<template>
  <div class="markingManager">
    <!-- 营销管理--会员领导者列表 -->
    <!-- <el-button
      type="primary"
      size="small"
      @click="addGood"
      class="marginBottom"
      :disabled="loading"
    >新建会员领导者模块</el-button> -->
    手机号：<el-input
      v-model="search.Mobile"
      placeholder="搜索"
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
    状态：<el-select
      v-model="search.status"
      clearable
      placeholder="请选择"
      @keyup.enter.native="searchName"
      class="marginBottom"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button
      slot="append"
      icon="el-icon-search"
      @click="searchName"
    ></el-button>

    
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <!-- <el-table-column prop="OpenID" label="微信ID"></el-table-column> -->
      <el-table-column width="80px" align="center" label="头像">
        <template slot-scope="scope">
          <img
            :src="scope.row.Headimgurl ? scope.row.Headimgurl : defaultImg"
            alt=""
            class="imgWidth"
          />
        </template>
      </el-table-column>
      <el-table-column prop="NickName" label="名称"></el-table-column>
      <el-table-column prop="CardNo" label="微卡卡号"></el-table-column>
      <el-table-column
        prop="AlipayAccount"
        label="支付宝账号"
      ></el-table-column>
      <el-table-column prop="WeChatAccount" label="微信账号"></el-table-column>
      <el-table-column prop="Mobile" label="手机号"></el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">{{ scope.row.Audit | checkTip }}</template>
      </el-table-column>
      <!-- <el-table-column prop="ShareCode" label="分享码"></el-table-column> -->

      <el-table-column prop="AddTime" label="申请时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            type="text"
            v-if="scoped.row.Audit === '1'"
            @click="audit(scoped.row)"
            >取消审核</el-button
          >
          <el-button type="text" @click="audit(scoped.row)" v-else
            >审核</el-button
          >
        </template>
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

    <audit
      :show="show"
      :showID="showID"
      @auditFunction="auditFunction"
      @confirmEnd="confirmEnd"
    ></audit>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import audit from "@/components/Dialog/audit";
export default {
  name: "",
  data() {
    return {
      tableData: [],
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
      ],
      showID: "",
      current_SID: "",
      current_Status: "",
      show: false, // 控制审核弹框
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0
    };
  },
  components: { audit },
  mounted() {
    this.getMarkingList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      console.log("我是你要找的val", val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMarkingList();
    },
    // 获取列表
    async getMarkingList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          {
            Action: "LeaderList",
            Mobile: this.search.Mobile,
            Audit: this.search.status,
            // pageSize:-1
            // Page:this.currentPage-1,
          },
          "MMemberOpera"
        );
        this.tableData = Data.LeaderList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 查询
    searchName() {
      // 名称搜索
      // this.page.current_page = 1;
      this.getMarkingList();
    },
    auditFunction(bool) {
      this.show = bool;
    },
    //审核
    audit(row) {
      this.show = true;
      this.current_OpenID = row.OpenID;
      this.showID = row.Audit;
    },
    async confirmEnd(val) {
      if (val === "1") {
        this.current_Status = "0";
      } else {
        this.current_Status = "1";
      }
      try {
        await getLists(
          {
            Action: "AuditLeader",
            OpenID: this.current_OpenID,
            Audit: this.current_Status
          },
          "MMemberOpera"
        );
        this.$message.success("审核成功");
        this.getMarkingList();
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    }
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