<template>
  <div class="Act_statistics">
    <el-table :data="tableDate" style="width: 100%">
      <el-table-column width="100" label="微信头像" align="center">
        <template slot-scope="scope">
          <div style="width: 80px; height: 80px; border: 1px solid #eee">
            <img
              :src="scope.row.Headimgurl"
              alt
              style="width: 100%; height: 100%"
              v-if="scope.row.Headimgurl"
            />
            <img
              :src="defaultImg"
              alt
              style="width: 100%; height: 100%"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="NickName" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.NickName">{{ scope.row.NickName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邀请人数"
        prop="ShareCnt"
        align="center"
      ></el-table-column>
      <el-table-column
        label="开始时间"
        prop="AddTime"
        align="center"
      ></el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table :data="dataDetail">
        <el-table-column width="80" label="微信头像" align="center">
          <template slot-scope="scope">
            <div class="WxPhoto">
              <img
                :src="scope.row.Headimgurl"
                alt
                style="width: 100%; height: 100%"
                v-if="scope.row.Headimgurl"
              />
              <img
                :src="defaultImg"
                alt
                style="width: 100%; height: 100%"
                v-else
              />
            </div>
            <span v-if="scope.row.AccessSID == scope.row.SID" class="faqi"
              >发起人</span
            >
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="NickName" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.NickName">{{ scope.row.NickName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邀请人数"
          prop="ShareCnt"
          align="center"
        ></el-table-column>
        <el-table-column
          label="开始时间"
          prop="AddTime"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "Act_statistics",
  data() {
    return {
      loading: false,
      defaultImg: require("@/assets/img/defaule_back.png"),
      tableDate: [],
      dataDetail: [], //弹窗详情
      dialogTableVisible: false,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    tips(val) {
      if (val == "0") {
        return "用户关注";
      } else if (val == "3") {
        return "邀请充值";
      }
    },
  },
  methods: {
    async getList() {
      //获取列表
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetFullFansStatistics",
            PromotionSID: this.$route.query.PromotionSID,
          },
          "MPromotionOpera"
        );
        this.tableDate = data.Data.AccessInfoList || [];
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    async detail(row) {
      this.dialogTableVisible = true;
      try {
        let res = await getLists(
          { Action: "GetFullFansDetail", AccessSID: row.SID },
          "MPromotionOpera"
        );
        this.dataDetail = res.Data.AccessInfoList || [];
        console.log(this.dataDetail);
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Act_statistics {
  .WxPhoto {
    width: 50px;
    height: 50px;
    border: 1px solid #eee;
    margin: 0 auto;
  }
  .faqi {
    padding-top: 8px;
    display: inline-block;
  }
}
</style>