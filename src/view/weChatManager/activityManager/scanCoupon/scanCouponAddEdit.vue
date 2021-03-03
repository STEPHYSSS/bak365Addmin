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
      <!-- <el-form-item label="参与条件">
        <el-input v-model="SchemesName" readonly></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="Schemes(null)"
          >设置</el-button
        >
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
    <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket>
    <!-- <el-dialog title="选择参与条件方案" :visible.sync="dialogVisible2" width="900px">
      <el-table ref="multipleTable" :data="dataTable" highlight-current-row style="width: 100%" @row-click="clickItem">
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.row.SID" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="SID" label="方案编号" align="center"></el-table-column>
        <el-table-column prop="Name" label="方案名称" align="center"></el-table-column>
        <el-table-column prop="StartDate" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="EndDate" label="结束时间" align="center"></el-table-column>
        <el-table-column label="查看" align="center">
        <template slot-scope="scoped">
          <el-tooltip placement="top">
            <div slot="content">
              <span v-show="scoped.row.SetInfo.MemberType">参与人员：{{scoped.row.SetInfo.MemberType|ConditionPerson}}</span>&nbsp;&nbsp;
              <span v-show="scoped.row.SetInfo.CardType">卡类型：{{scoped.row.SetInfo.CardType|ConditionCard}}</span><br/>
              <span v-show="scoped.row.SetInfo.OrderCnt">订单笔数：{{scoped.row.SetInfo.OrderCnt}}笔，</span>
              <span v-show="scoped.row.SetInfo.OrderAmt">订单总额{{scoped.row.SetInfo.OrderAmt}}元，</span>
              <span v-show="scoped.row.SetInfo.OrderBuyDay">最近{{scoped.row.SetInfo.OrderBuyDay}}天购买过，</span>
              <span v-show="scoped.row.SetInfo.NotOrderBuyDay">最近{{scoped.row.SetInfo.NotOrderBuyDay}}天未购买过</span><br/>
              <span v-show="scoped.row.SetInfo.CardOrderCnt">充值笔数：{{scoped.row.SetInfo.CardOrderCnt}}笔，</span>
              <span v-show="scoped.row.SetInfo.CardOrderAmt">充值金额{{scoped.row.SetInfo.CardOrderAmt}}元，</span>
              <span v-show="scoped.row.SetInfo.CardDay">最近{{scoped.row.SetInfo.CardDay}}天访问，</span><span v-show="scoped.row.SetInfo.NotCardDay">最近{{scoped.row.SetInfo.NotCardDay}}天未访问</span><br/>
              <span v-show="scoped.row.SetInfo.BirthdayTime">生日范围：{{scoped.row.SetInfo.BirthdayTime}}，</span>
              <span v-show="scoped.row.SetInfo.StartAge">年龄{{scoped.row.SetInfo.StartAge}}到{{scoped.row.SetInfo.EndAge}}，</span>
              <span v-show="scoped.row.SetInfo.LatelyBirthday">最近{{scoped.row.SetInfo.LatelyBirthday}}天生日</span><br/>
            </div>
            <img
              src="@/assets/img/chaxun_icon.png"
             
              class="codesty"
              alt
            />
          </el-tooltip>
        </template>
      </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEnd2">确 定</el-button>
      </span>
    </el-dialog> -->
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
    };
  },
  components: {
    imgLoad,
    ueditor1,
    satisfyTicket
  },
  created() {
    // this.getTicket();
    // this.getList();
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
    // Schemes() {//点击展示参与条件弹窗
    //   this.dialogVisible2 = true;
    // },
    clickItem(row, event, column) { //选中条件
      if(!this.isShow){
        this.isShow = true;
        return;
      }
      if(this.radio){
        if(this.radio == row.SID){
          this.radio = '';
          this.isShow = false;
          setTimeout(()=>{
            this.isShow = true;
          },0)
          return
        }
      }
      this.radio = row.SID;
      this.singleRow = row;
    /*
      单选表格 也是radio  表格的点击（row-click）选中 之后 判断一下 v-model 有没有值 没有就赋值  有就判断选中的值等不等于 当前的值  不等于就覆盖 等于就置空 
    */ 
    },
    // confirmEnd2() { //确定选择参与条件       
    //   this.SchemesName = this.singleRow.Name;
    //   this.dialogVisible2 = false;
    // },
    // cancelFunAn(row){//参与条件取消
    //   // this.$refs.multipleTable.setCurrentRow(row);      
    //   this.dialogVisible2 = false;
    // },
    // async getList() {  //选择参与条件方案列表
    //   this.loading = true;
    //   try {
    //     let data = await getLists(
    //       {
    //         Action: "GetSchemesList",
    //         Type: "1",
    //       },
    //       "MShopOpera"
    //     );
    //     this.dataTable = data.Data.SchemesList;
    //     for (const i of this.dataTable) {
    //       i.SetInfo = JSON.parse(i.SetInfo)
    //     }

    //     this.loading = false;
    //   } catch (e) {
    //     this.loading = false;
    //   }
    // },
    
    // 获取详情
    async getCouponInfo() {
      // if (this.$route.query.SID) {
        let SID = this.$route.query.SID;
        let data = await getLists(
          {
            SID: SID,
            Action: "GetPromotion",
            Type:'8'
          },
          "MPromotionOpera"
        );
        if (data.Data.GiveList) {
          this.form = data.Data.GiveList[0];
        }
        this.Name = data.Data.Promotion.Name;
        this.SchemesSID = data.Data.Promotion.SchemesSID;
        this.SchemesName = data.Data.Promotion.SchemesName;
        this.Start = data.Data.Promotion.Start;
        this.Audit = data.Data.Promotion.Audit;
        this.PartTime.push(
          data.Data.Promotion.StartDate,
          data.Data.Promotion.EndDate
        );
      // }
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