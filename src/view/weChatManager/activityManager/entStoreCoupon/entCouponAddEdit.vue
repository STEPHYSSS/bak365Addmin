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
      <!-- <el-form-item label="赠送类型">
        <el-select v-model="form.Type" placeholder="请选择">
          <el-option
            v-for="item in giftType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="赠送券">
        <el-input v-model="form.GiveInfo" readonly :disabled="true"></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="clickTicket"
          >添加</el-button
        >
      </el-form-item>
      <!-- <el-form-item label="赠送积分" v-if="form.Type == '2'">
        <el-input v-model="form.GiveScore"></el-input>
      </el-form-item>
      <el-form-item label="赠送金额" v-if="form.Type == '3'">
        <el-input v-model="form.GiveMoney"></el-input>
      </el-form-item> -->
      <el-form-item label="发放总量">
        <el-input-number v-model="form.GiveCnt" :min="1" controls-position="right"></el-input-number
        >，每人最多领取 <el-input-number
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
    </el-form>
    <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
    <el-dialog title="选择参与条件方案" :visible.sync="dialogVisible2" width="600px">
      <el-table ref="multipleTable" :data="dataTable" highlight-current-row style="width: 100%" @row-click="chooseData">
        <el-table-column prop="SID" label="方案编号" align="center"></el-table-column>
        <el-table-column prop="Name" label="方案名称" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEnd2">确 定</el-button>
      </span>
    </el-dialog>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
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
import satisfyTicket from "@/components/Dialog/satisfyTicket";
export default {
  name: "",
  data() {
    return {
      form: {
        // Type: "1", //赠送类型
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
      // Start: "1", //状态
      SchemesName: "", //参与条件名
      SchemesSID: "", //参与条件SID
      StartDate: "", //开始时间
      EndDate: "", //结束时间
      autosize: { minRows: 2, maxRows: 6 },
      PartTime: [], //开始时间数组
      FeaturesShow: true, //用来控制富文本显示
      giftType: giftType, //赠送类型
      showTicket: false, //控制电子劵信息弹框显示
      dialogVisible2: false, //控制选择参与条件方案弹窗显示
      dataTable: [], //选择参与条件方案列表
      number: "",
      singleRow:{},//选中参与条件一行信息
      // Audit: "",
    };
  },
  components: {
    imgLoad,
    ueditor1,
    satisfyTicket
  },
  created() {
    // this.getTicket();
    this.getList();
    if(this.$route.query.SID){
      this.getCouponInfo();
    }
  },
  methods: {
    clickTicket() {// 选择赠送电子券
      this.showTicket = true;
    },
    changeDig(bool){//用于子组件控制关闭按钮
      this.showTicket = bool;
    },
    sureGood(val){//电子券弹窗确定按钮  
      this.showTicket = false;     
      this.form.GiveInfo = val;
      // console.log(val,'子组件返回的数据')        
    },
    Schemes() {
      this.dialogVisible2 = true;
    },
    chooseData(row, event, column) { //选中条件
      // if(this.SchemesName === row.Name){
      //   this.SchemesName  ='';
      //   this.SchemesSID = '';
      // }else{
      //   this.SchemesName  = row.Name;
      //   this.SchemesSID = row.SID;
      // }
    /*
      单选表格 也是radio  表格的点击（row-click）选中 之后 判断一下 v-model 有没有值 没有就赋值  有就判断选中的值等不等于 当前的值  不等于就覆盖 等于就置空 
    */ 
      this.singleRow = row;
    },
    confirmEnd2() { //确定选择参与条件 
      this.SchemesName = this.singleRow.Name;
      this.SchemesSID = this.singleRow.SID;
      this.dialogVisible2 = false;
    },
    cancelFunAn(row){//参与条件取消
      // this.$refs.multipleTable.setCurrentRow(row);      
      this.dialogVisible2 = false;
    },
    async getList() {  //选择参与条件方案列表
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
    
    // 获取详情
    async getCouponInfo() {
      // if (this.$route.query.SID) {
        let SID = this.$route.query.SID;
        let data = await getLists(
          {
            SID: SID,
            Action: "GetPromotion",
            Type:'7'
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
        // this.Start = data.Data.Promotion.Start;
        // this.Audit = data.Data.Promotion.Audit;
        this.SchemesSID = data.Data.Promotion.SchemesSID;
        this.SchemesName = data.Data.Promotion.SchemesName;
        this.PartTime.push(
          data.Data.Promotion.StartDate,
          data.Data.Promotion.EndDate
        );
      // }
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