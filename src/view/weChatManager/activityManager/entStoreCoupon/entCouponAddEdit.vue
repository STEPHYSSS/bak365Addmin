<template>
  <div class="entStoreAddEdit">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动名称">
        <el-input v-model="Name"></el-input>
        <!-- <el-button type="primary" style="margin-left: 10px" size="medium"  v-if="!$route.query.SID" >导入</el-button> -->
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          type="datetimerange"
          v-model="PartTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="参与条件">
        <el-input v-model="SchemesName" readonly></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="Schemes(null)"
          >设置</el-button
        >
      </el-form-item>
      <el-form-item label="赠送类型">
        <el-select v-model="form.Type" placeholder="请选择">
          <el-option
            v-for="item in giftType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赠送券" v-if="form.Type == '1'">
        <el-input v-model="form.GiveInfo" readonly></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="clickTicket"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="赠送积分" v-if="form.Type == '2'">
        <el-input v-model="form.GiveScore"></el-input>
      </el-form-item>
      <el-form-item label="赠送金额" v-if="form.Type == '3'">
        <el-input v-model="form.GiveMoney"></el-input>
      </el-form-item>
      <el-form-item label="发放总量">
        <el-input v-model="form.GiveCnt"></el-input
        >，每人最多领取<el-input-number
          v-model="form.LimitCnt"
          controls-position="right"
          :min="1"
        ></el-input-number>
        次
      </el-form-item>

      <el-form-item label="模板ID">
        <el-input v-model="TemplateInfo.WeChatNo"></el-input>
      </el-form-item>
      <el-form-item label="模板内容">
        <el-input
          v-model="TemplateInfo.TempText"
          :autosize="autosize"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="Start">
        <el-select v-model="Start" placeholder="请选择">
          <el-option label="启动" value="1">启动</el-option>
          <el-option label="关闭" value="0">关闭</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动规则" prop="Features" class="FeaturesStyle">
        <el-button
          type="text"
          @click="FeaturesShow = true"
          v-if="FeaturesShow === false"
          >+编辑</el-button
        >
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button
          type="text"
          @click="FeaturesShow = false"
          v-if="FeaturesShow === true"
          >隐藏</el-button
        >
      </el-form-item> -->
    </el-form>
    <el-dialog
      class="dialogTicketFa"
      title="选择电子券"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div class="chaxun">
        <span>名称搜索:</span>
        <el-input
          v-model="tiketName"
          placeholder="请输入"
          @keyup.enter="searchName"
          style="margin-right: 10px; width: 180px"
        ></el-input>
        <el-button @click="chaxun">查询</el-button>
      </div>
      <!-- @row-click="handleCurrentChange" -->
      <el-table
        ref="multipleTable"
        :data="tiketList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="TypeNo"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="TypeName"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.number"
              maxlength="2"
              oninput="value=value.replace(/[^\d]/g, '')"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEnd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择参与条件方案"
      :visible.sync="dialogVisible2"
      width="600px"
    >
      <el-table
        ref="multipleTable"
        :data="dataTable"
        highlight-current-row
        style="width: 100%"
        @current-change="chooseData"
      >
        <el-table-column
          prop="SID"
          label="方案编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Name"
          label="方案名称"
          align="center"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEnd2">确 定</el-button>
      </span>
    </el-dialog>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
import { giftType } from "@/config/utils"; //赠送类型引用
import ueditor1 from "@/components/ueditor1/";
import imgLoad from "@/components/download/imgLoad";
import "@/config/jquery.base64.js";
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import * as ruleText from "@/view/wechatManager/rulesFrom";
import _ from "lodash";

export default {
  name: "",
  data() {
    return {
      form: {
        Type: "1", //赠送类型
        GiveInfo: "",
        GiveMoney: "",
        GiveScore: "",
        GiveCnt: "",
        LimitCnt: "",
      },
      TemplateInfo: {
        WeChatNo: "",
        TempText: "",
      },
      Name: "", //活动名称
      Start: "1", //状态
      SchemesName: "", //参与条件名
      SchemesSID: "", //参与条件SID
      StartDate: "", //开始时间
      EndDate: "", //结束时间
      autosize: { minRows: 2, maxRows: 6 },
      PartTime: [], //开始时间数组
      FeaturesShow: true, //用来控制富文本显示
      giftType: giftType, //赠送类型
      dialogVisible: false, //控制电子劵信息弹框显示
      dialogVisible2: false, //控制选择参与条件方案弹窗显示
      tiketList: [], //电子券列表
      tiketName: "", //电子券搜索名称
      dataTable: [], //选择参与条件方案列表
      number: "",
      Audit: "",
    };
  },
  components: {
    imgLoad,
    ueditor1,
  },
  created() {
    this.getTicket();
    this.getList();
    this.getCouponInfo();
  },
  methods: {
    // 选择电子券
    clickTicket() {
      this.dialogVisible = true;
    },
    async getTicket() {
      //获取电子券列表
      try {
        let { Data } = await getLists(
          { Action: "GetTicketList", TypeName: this.tiketName },
          "MProdOpera"
        );
        this.tiketList = Data.TicketList;
        this.$set(this.tiketList, "number");
      } catch (error) {
        this.$message.error(error);
      }
    },
    chaxun() {
      //电子券查询
      this.getTicket();
    },
    confirmEnd() {
      //电子券确定
      let info = "";
      this.tiketList.forEach((item) => {
        if (item.number) {
          info += item.TypeNo + "," + Number(item.number) + ";";
        }
      });
      this.form.GiveInfo = info;
      this.dialogVisible = false;
    },
    Schemes() {
      this.dialogVisible2 = true;
    },
    confirmEnd2() {
      this.dialogVisible2 = false;
    },
    async getList() {
      //选择参与条件方案列表
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetSchemesList",
            Type: "1",
          },
          "MShopOpera"
        );
        this.dataTable = data.Data.SchemesList;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    chooseData(val) {
      //选中条件
      this.SchemesName = val.Name;
      this.SchemesSID = val.SID;
    },
    // 获取详情
    async getCouponInfo() {
      if (this.$route.query.SID) {
        let SID = this.$route.query.SID;
        let data = await getLists(
          {
            SID: SID,
            Action: "GetPromotion",
          },
          "MPromotionOpera"
        );
        if (data.Data.GiveList) {
          this.form = data.Data.GiveList[0];
        }
        if (data.Data.TemplateList) {
          this.TemplateInfo = data.Data.TemplateList[0];
        }
        // let Features = $.base64.atob(data.Data.Promotion.Features, "utf8");
        // Features = Features.replace(/src="Files/g,`src="${process.env.Prefix}Files`);
        // setTimeout(() => {
        // this.$refs.Features.setUEContent(Features)}, 300);
        this.Name = data.Data.Promotion.Name;
        this.Start = data.Data.Promotion.Start;
        this.Audit = data.Data.Promotion.Audit;
        this.SchemesSID = data.Data.Promotion.SchemesSID;
        this.SchemesName = data.Data.Promotion.SchemesName;
        this.PartTime.push(
          data.Data.Promotion.StartDate,
          data.Data.Promotion.EndDate
        );
      }
    },
    cancelFun() {
      //取消
      this.$router.push("/weChat/manager/activity/entStoreCoupon");
    },
    async preserveFun() {
      //保存
      try {
        if (this.PartTime) {
          this.StartDate = this.PartTime[0];
          this.EndDate = this.PartTime[1];
        }
        //  let Features = this.$refs.Features.getUEContent();
        //  Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
        //  this.Features = $.base64.btoa(Features, "utf8");
        let GiveList = [];
        let TemplateList = [];
        GiveList.push(this.form);
        TemplateList.push(this.TemplateInfo);
        let data = await getLists(
          {
            Name: this.Name,
            Type: "7",
            StartDate: this.StartDate,
            EndDate: this.EndDate,
            SchemesSID: this.SchemesSID,
            SID: this.$route.query.SID ? this.$route.query.SID : "",
            GiveList: JSON.stringify(GiveList),
            TemplateList: JSON.stringify(TemplateList),
            // Features:this.Features,
            Start: this.Start,
            Audit: this.Audit,
            Action: "SetPromotionInfo",
          },
          "MPromotionOpera"
        );
        setTimeout(() => {
          this.$router.push("/weChat/manager/activity/entStoreCoupon");
        }, 300);
      } catch (error) {
         this.$message.error(error)
      }
    },
  },
};
</script>
<style lang="less" scoped>
.entStoreAddEdit {
  margin-bottom: 80px;
  min-width: 1230px;
  .el-input {
    width: 217px;
  }
  .el-textarea {
    width: 400px;
  }
  .FeaturesStyle {
    .el-form-item__content {
      line-height: 20px;
    }
  }
  .dialogTicketFa {
    .chaxun {
      margin-bottom: 10px;
    }
  }
}
</style>