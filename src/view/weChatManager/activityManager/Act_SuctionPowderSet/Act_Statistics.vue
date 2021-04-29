<template>
  <div class="Act_statistics">
    <el-table
      :data="tableDate"
      style="width: 100%"
      v-if="this.$route.query.PromType != '4'"
    >
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
    <div v-else>
      <el-row :gutter="20" style="margin-bottom:20px">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>卡号：</span>
            <el-input v-model="CardNo" clearable @clear="clearName" placeholder="请输入" class="widthW"></el-input>
          </div
        ></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>审核状态：</span>
            <el-select v-model="Audit" placeholder="请选择" class="widthW" clearable @clear="clearName">
              <el-option label="未审核" value="0"></el-option>
              <el-option label="已审核" value="1"></el-option>
            </el-select>
            <!-- <el-input v-model="Audit" clearable @clear="clearName" placeholder="请输入商品名称" class="widthW"></el-input> -->
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>手机号：</span>
            <el-input v-model="Mobile" clearable @clear="clearName" placeholder="请输入" class="widthW"></el-input>
          </div
        ></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button  @click="searchName">查询</el-button>
          </div
        ></el-col>
      </el-row>
      <el-table :data="GetSpreadDate" style="width: 100%">
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
        <el-table-column prop="NickName" label="名称" align="center"></el-table-column>
        <el-table-column prop="CardNo" label="卡号" align="center"></el-table-column>
        
        <el-table-column prop="Audit" label="审核状态" align="center">
          <template slot-scope="scope">
            {{scope.row.Audit|AuditTips}}
        </template>
        </el-table-column>
        <el-table-column prop="QrCode" label="图片模板" align="center">
          <template slot-scope="scope">
          <div style="width:100px;height:100px;border:1px solid #eee;margin:0 auto">
            <img :src="scope.row.QrCode|filterImg" alt style="width:100%;height:100%" />
          </div>
        </template>
        </el-table-column>
        <el-table-column prop="WeChatAccount" label="微信账号" align="center"></el-table-column>
        <el-table-column prop="AlipayAccount" label="支付宝账号" align="center"></el-table-column>
        <el-table-column prop="AddTime" label="添加时间" align="center"></el-table-column>
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
    </div>
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
      GetSpreadDate: [], //营销推广
      dataDetail: [], //弹窗详情
      dialogTableVisible: false,
      CardNo:'',
      Audit:'',
      Mobile:'',
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
    };
  },
  created() {
    if (this.$route.query.PromType == "4") {
      this.GetSpreadListStatistics();
    } else {
      this.getList();
    }
  },
  filters: {
    tips(val) {
      if (val == "0") {
        return "用户关注";
      } else if (val == "3") {
        return "邀请充值";
      }
    },
    AuditTips(val){
      if (val == "0") {
        return "待审核";
      } else if (val == "1") {
        return "已审核";
      }
    }
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
    async GetSpreadListStatistics() {
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetSpreadListStatistics",
            CardNo:this.CardNo,
            Audit:this.Audit,
            Mobile:this.Mobile
          },
          "MPromotionOpera"
        );
        this.GetSpreadDate = data.Data.List || [];
        this.TotalList = data.Data.DataCount;
        this.pageSize = data.Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    searchName(){
      this.GetSpreadListStatistics();
    },
    clearName(){
      this.GetSpreadListStatistics();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    changePage(val) {
      this.currentPage = val;
      this.GetSpreadListStatistics(val);
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
  .widthW{
    width: 170px;
  }
}
</style>