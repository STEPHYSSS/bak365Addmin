<template>
  <div class="orderNotify">
    <el-row class="marginBottom">
      <el-col :span="6">
        <span>卡&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
        <el-input
          placeholder="请输入卡号"
          v-model="CardNo"
          clearable
          @clear="clearN"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchN"
          ></el-button> </el-input
      ></el-col>
     <el-col :span="6">
          <span>关注门店：</span>
          <el-select
            v-model="SubscribeShopSID"
            filterable
            placeholder="请选择"
            clearable
            @change="changeState"
          >
            <el-option
              v-for="item in storeList"
              :key="item.SID"
              :label="item.Name"
              :value="item.SID"
            >
            </el-option>
          </el-select>
        </el-col>
      <el-col :span="6">
        <span>卡来源：</span>
        <el-select v-model="BindType" @change="changeCard" placeholder="请选择">
          <el-option
            v-for="item in BindTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>卡状态：</span>
        <el-select
          v-model="CardState"
          @change="changeCard"
          placeholder="请选择"
        >
          <el-option
            v-for="item in CardStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
      <el-row class="marginBottom">
         <el-col :span="6">
        <span>手机号：</span>
        <el-input
          placeholder="请输入手机号"
          v-model="Mobile"
          clearable
          @clear="clearI"
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
          <span>绑定门店：</span>
          <el-select
            v-model="BindShopSID"
            filterable
            placeholder="请选择"
            clearable
            @change="changeState"
          >
            <el-option
              v-for="item in storeList"
              :key="item.SID"
              :label="item.Name"
              :value="item.SID"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="头像" width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.Headimgurl ? scope.row.Headimgurl : defaultImg" class="imgWidth" />
        </template>
      </el-table-column>
      <el-table-column label="会员信息" align="left" >
        <template slot-scope="scoped">
          <span v-if="scoped.row.NickName"
            >用户名：{{ scoped.row.NickName }}</span
          ><br/>
          <span>性别：{{ scoped.row.Sex | Sex }}</span
          ><br />
          <span v-if="scoped.row.Mobile">手机号：{{ scoped.row.Mobile }}</span>
        </template>
      </el-table-column>     
      <el-table-column prop="Source" label="会员来源" align="center" width="90px">
        <template slot-scope="scope">{{scope.row.Source | SourceTips}}</template>
      </el-table-column>
       <el-table-column label="会员信息" align="left" width="160">
        <template slot-scope="scoped">
          <span v-if="scoped.row.CardNo">卡号：{{scoped.row.CardNo}}</span><span v-else>卡号：暂无</span><br/>
          <span>卡来源：{{scoped.row.BindType | BindTypeTips}}</span><br/>
          <span>卡状态：{{scoped.row.CardState | CardStateTips}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Subscribe" label="是否关注" align="center" width="90">
        <template slot-scope="scope">
          {{ scope.row.Subscribe | Subscribe }}
        </template>
      </el-table-column>
      <el-table-column prop="SubscribeShopSID" label="关注门店" align="left" width="250" >
        <template slot-scope="scoped">
          <span v-if="scoped.row.SubscribeShopSID">{{filterFun(scoped.row.SubscribeShopSID)}}</span><br/>
          <span v-if="scoped.row.SubscribeShopSID">{{filterFun2(scoped.row.SubscribeShopSID)}}</span><br/>
          <span v-if="scoped.row.SubscribeShopSID">{{filterFun3(scoped.row.SubscribeShopSID)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="BindShopSID" label="绑定门店" align="left" width="250">
        <template slot-scope="scoped">
          <span v-if="scoped.row.BindShopSID">{{filterFun(scoped.row.BindShopSID)}}</span><br/>
          <span v-if="scoped.row.BindShopSID">{{filterFun2(scoped.row.BindShopSID)}}</span><br/>
          <span v-if="scoped.row.BindShopSID">{{filterFun3(scoped.row.BindShopSID)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="关注时间" align="center" width="160"></el-table-column>
      <el-table-column prop="UpTime" label="更新时间" align="center" width="160"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope" v-if="scope.row.CardNo != ''">
          <el-button type="text" @click="Unbund(scope.row, scope.$index)"
            >解绑</el-button
          >
          <el-button type="text" @click="reNewCode(scope.row, scope.$index)"
            >修改卡密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改密码的弹框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        style="margin-top: 10px"
        :inline="true"
      >
        <div>
          <el-form-item label="卡号">
            <el-input v-model="ruleForm.CardNo" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="ruleForm.CardPass"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="ruleForm.VerifyCardPass"
              style="width: 150px"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="colorBtn">确 定</el-button> -->
        <el-button type="primary" @click="sureCode">确 定</el-button>
      </div>
    </el-dialog>

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
import { getLists } from "@/api/vipCard";
import _ from "lodash";
export default {
  name: "",
  data() {
    return {
      // judge:"",
      ruleForm: {
        CardNo: "", //卡号
        CardPass: "", //新密码
        VerifyCardPass: "", //确认密码
      },
      dialogFormVisible: false,

      tableData: [],
      defaultImg: require("@/assets/img/defaule_back.png"),
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0,
      CardNo: "", //卡号查询
      Mobile: "", //ID 查询
      SubscribeShopSID: "", //关注门店查询
      BindShopSID: "", //绑定门店查询
      BindTypeList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "Net",
          label: "微卡",
        },
        {
          value: "Manage",
          label: "实体卡",
        },
      ],
      BindType: "",
      CardStateList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "已领用",
        },
        {
          value: "2",
          label: "正常",
        },
        {
          value: "3",
          label: "挂失",
        },
        {
          value: "4",
          label: "作废",
        },
      ],
      CardState: "",
      storeList: [], //门店列表
    };
  },
  created() {
    this.getStoreList();
    this.GetOrderTemplate();
    // if(this.ruleForm.CardNo==""||item.CardNo==""){
    //   this.judge=false;
    // }else{
    //   this.judge=true;
    // }
  },
  methods: {
    //修改密码
    async sureCode() {
      if (this.ruleForm.CardPass == "" || this.ruleForm.VerifyCardPass == "") {
        return this.$message.error("密码不能为空");
      }

      try {
        let { Data } = await getLists(
          {
            Action: "SetCardPass",
            CardNo: this.ruleForm.CardNo, //卡号
            CardPass: this.ruleForm.CardPass, //新密码
            VerifyCardPass: this.ruleForm.VerifyCardPass, //确认密码
          },
          "MMemberOpera"
        );
        // console.log("我是你要查询的Data", Data);
        console.log("111");
        this.$message.success("操作成功");
        this.dialogFormVisible = false;
      } catch (error) {
        // console.log(error,'000')
        this.$message.error(error);
        this.dialogFormVisible = false;
      }
    },
    Unbund(row) {
      //解绑
      this.$confirm("是否解绑?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          this.UnbundFun(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解绑",
          });
        });
    },
    async UnbundFun(row) {
      try {
        let Data = await getLists(
          { Action: "UnBindCard", OpenID: row.OpenID },
          "MMemberOpera"
        );
        this.$message.success("解绑成功");
        this.GetOrderTemplate();
      } catch (e) {
        this.$message.error(e);
      }
    },

    reNewCode(row) {
      this.ruleForm.CardPass = "";
      this.ruleForm.VerifyCardPass = "";
      this.dialogFormVisible = true;
      this.ruleForm = row;
    },

    async GetOrderTemplate() {
      try {
        let { Data } = await getLists(
          {
            Action: "GetMemberList",
            Page: this.currentPage - 1,
            CardNo: this.CardNo,
            Mobile: this.Mobile,
            BindType: this.BindType,
            CardState: this.CardState,
            SubscribeShopSID:this.SubscribeShopSID,
            BindShopSID:this.BindShopSID
          },
          "MMemberOpera"
        );
        this.tableData = Data.UserList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async getStoreList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" }, "MShopOpera");
        this.storeList = Data.ShopInfoList;
      } catch (e) {
        this.$message.error(e);
      }
    },
    filterFun(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `名称：${item.Name}`;
        }
      }
      return obj;
    },
    filterFun2(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `地址：${item.Address}`;
        }
      }
      return obj;
    },filterFun3(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `电话：${item.Tel}`;
        }
      }
      return obj;
    },
    changeCard() {
      this.GetOrderTemplate();
    },
    searchN() {
      //卡号查询
      this.GetOrderTemplate();
    },
    clearN() {
      this.CardNo = "";
      this.GetOrderTemplate();
    },
    clearI() {
      this.OpenID = "";
      this.GetOrderTemplate();
    },
    changeState() {
      this.GetOrderTemplate();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetOrderTemplate(val);
    },
  },
  filters: {
    Sex(val) {
      if (val == "1") {
        return "男";
      } else if (val == "2") {
        return "女";
      } else {
        return "未知";
      }
    },
    Subscribe(val) {
      //关注
      if (val == "1") {
        return "是";
      } else {
        return "否";
      }
    },
    BindTypeTips(val) {
      //卡来源
      if (val == "0" || val == "") {
        return "无";
      } else if (val == "Net") {
        return "微卡";
      } else {
        return "实体卡";
      }
    },
    SourceTips(val) {
      //会员来源
      if (val == "0") {
        return "公众号";
      } else return "";
    },
    CardStateTips(val) {
      //会员卡状态 "0", "已领用", "2", "正常", "3", "挂失", "4", "作废"
      if (val == "0") {
        return "已领用";
      } else if (val == "2") {
        return "正常";
      } else if (val == "3") {
        return "挂失";
      } else if (val == "4") {
        return "作废";
      }else{
        return '无'
      }
    },
  },
};
</script>
<style lang="less" scope>
.imgWidth {
  width: 60px;
  height: 60px;
}
.input-with-select {
  width: 250px !important;
}
.marginBottom {
  margin-bottom: 15px;
}
</style>