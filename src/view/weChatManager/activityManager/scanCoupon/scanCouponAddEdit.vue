<template>
  <div class="entStoreAddEdit">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动名称">
        <el-input v-model="Name"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          type="datetimerange"
          :editable="false"
          v-model="PartTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
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
      <el-form-item label="发放总量">
        <el-input-number v-model="form.GiveCnt" :min="1" controls-position="right"></el-input-number
        >，每人最多参与 <el-input-number
          v-model="form.LimitCnt"
          controls-position="right"
          :min="1"
        ></el-input-number>
        次
      </el-form-item>
    </el-form>
    <satisfyTicket :info="info" :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
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
      radio:'',//单选参与条件
      Name: "", //活动名称
      Start: "0", //状态
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
      isShow:true,
      Audit: "",
      info:[]
    };
  },
  components: {
    imgLoad,
    ueditor1,
    satisfyTicket
  },
  created() {
    if(this.$route.query.SID){
      this.getCouponInfo();
    }
  },
  methods: {
    clickTicket() {// 选择赠送电子券
      this.showTicket = true;
      let result = []
      if(this.form.GiveInfo){
        let strSplit = this.form.GiveInfo.split(';')
        for (const i of strSplit) {
          if (i) {
            result.push(i.split(','))
          } 
        }
      }else{
        result = []
      }
      this.info = result
      console.log(this.info,'9999')
    },
    changeDig(bool){//用于子组件控制关闭按钮
      this.showTicket = bool;
    },
    sureGood(val){//电子券弹窗确定按钮  
      this.showTicket = false;     
      this.form.GiveInfo = val;
      // console.log(val,'子组件返回的数据')        
    },
    // 获取详情
    async getCouponInfo() {
        let SID = this.$route.query.SID;
        let data = await getLists(
          {
            SID: SID,
            Action: "GetPromotion",
            Type:'8'
          },
          "MPromotionOpera"
        );
        console.log(data.Data.Promotion.Name,'9999')
        this.Name = data.Data.Promotion.Name;
        this.Start = data.Data.Promotion.Start;
        this.Audit = data.Data.Promotion.Audit;
        this.PartTime.push(
          data.Data.Promotion.StartDate,
          data.Data.Promotion.EndDate
        );
        if(data.Data.GiveList.length>0){
          this.form = data.Data.GiveList[0]
        }
    },
    cancelFun() {
      //取消
      this.$router.push("/weChat/manager/activity/scanCouponList");
    },
    async preserveFun() {
      //保存
      try {
        if (this.PartTime) {
          this.StartDate = this.PartTime[0];
          this.EndDate = this.PartTime[1];
        }
        let GiveList = [];
        // let TemplateList = [];
        GiveList.push(this.form);
        // TemplateList.push(this.TemplateInfo);
        let data = await getLists(
          {
            Name: this.Name,
            Type: "8",
            StartDate: this.StartDate,
            EndDate: this.EndDate,
            SchemesSID: this.SchemesSID,
            SID: this.$route.query.SID ? this.$route.query.SID : "",
            GiveList: JSON.stringify(GiveList),
            Start:this.$route.query.SID?this.Start:'',
            Audit:this.$route.query.SID?this.Audit:'',
            Action: "SetPromotionInfo",
          },
          "MPromotionOpera"
        );
        setTimeout(() => {
          this.$router.push("/weChat/manager/activity/scanCouponList");
        }, 300);
      } catch (error) {
         this.$message.error(error)
      }
    },
  },
  filters:{
    ConditionPerson(val){
      if(val){
        if(val==='0'){
          return '全部粉丝'
        }else if(val==='1'){
          return '新粉丝'
        }else{
          return '会员'
        }
      }else return ''
    },
    ConditionCard(val){
      if(val){
        if(val==='0'){
          return '全部粉丝'
        }else if(val==='1'){
          return '绑定卡'
        }else{
          return '申请卡'
        }
      }else return ''
    }
  }
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
  .el-tooltip__popper.is-dark{
    font-size: 15px !important;
  }
  .el-tooltip__popper{
    max-width: 70%;
    line-height: 15px !important;
    font-size: 15px !important;
    letter-spacing: 2px;
  }
  .tooltipFontSize{
    font-size: 15px !important;
  }
}
</style>