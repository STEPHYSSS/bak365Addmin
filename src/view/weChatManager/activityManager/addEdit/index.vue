<template>
  <div class="addEditActive">
    <!-- 活动详情 -->
    基本信息
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" v-loading="loading">
      <el-form-item label="活动类型" :key="6">
        <el-select v-model="ruleForm.Type" placeholder="请选择" @change="changeNorms" :disabled="this.$route.query.SID ? true : false"> 
          <el-option v-for="item in activeTypeNorms" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品选择" :key="1">
        <el-button type="primary" style="margin-left: 10px" size="medium" @click="selectGoods(null)">选择商品</el-button>        
        <!-- 选择商品之后展示的表格 -->
        <el-table style="margin-top: 10px; width: 850px" ref="ProdNoList" :data="ruleForm.ProdList">
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center">
          <template slot-scope="scoped">
            <span v-if="scoped.row.StockType==='1'">{{scoped.row.Stock }}</span>
            <span v-else-if="scoped.row.StockType==='2'">门店库存</span>
            <span v-else>不限</span>
          </template>
          </el-table-column>
          <el-table-column label="商品原价" align="center">
            <template slot-scope="scope">¥{{scope.row.OldPrice}}</template>
          </el-table-column>
          <el-table-column prop="SalePrice" label="活动价格" align="center">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1" maxlength="10"
                class="number" type="text"
                oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                v-model="row.SalePrice"
              />
            </template>
          </el-table-column>
          <el-table-column prop="StoreQty" label="活动数量" align="center">
            <template slot-scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number" style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                type="text"
                v-model="row.StoreQty"
              />
            </template>
          </el-table-column>
          <el-table-column  prop="SurplusQty" label="剩余数量" align="center" v-if="this.$route.query.SID">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;color:red;border: 1px solid #c1c1c1"
                v-model="row.SurplusQty"/>
            </template>
          </el-table-column>
          <el-table-column prop="MaxBuyCnt" label="限购数量" align="center">
            <template slot-scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number" style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                type="text"
                v-model="row.MaxBuyCnt"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <!-- <el-popover placement="left" v-model="scoped.row.visibleUrl">
                <el-input v-model="scoped.row.codeUrlShop" readonly placeholder="商品链接">
                  <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
                </el-input>
                <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
              </el-popover> -->
              <el-button type="text" @click="delGoodsNorms(scoped.$index)">删除</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="SurplusQty" label="剩余数量" align="center">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number"
                type="text"
                v-model="row.SurplusQty"/>
            </template>
          </el-table-column> -->
        </el-table>
      </el-form-item>
      <el-form-item label="每日限购" prop="IsOpenProm">
        <el-radio v-model="ruleForm.IsOpenProm" label="0">关闭</el-radio>
        <el-radio v-model="ruleForm.IsOpenProm" label="1">开启</el-radio>
        <span class="Spancolor">（开启每日限购，表示用户在活动时间内每天可参与）</span>
        <!-- 开启每日限购，表示用户在活动时间内每天可参与 -->
      </el-form-item>
      <el-form-item label="每日更新" prop="IsOpenStock">
        <el-radio v-model="ruleForm.IsOpenStock" label="0">关闭</el-radio>
        <el-radio v-model="ruleForm.IsOpenStock" label="1">开启</el-radio>
        <span class="Spancolor">（开启每日更新，表示在活动时间内每天更新活动数量）</span>
        <!-- 开启每日更新，表示在活动时间内每天更新活动数量 -->
      </el-form-item>
      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" maxlength="25" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" prop="activityDate">
        <el-date-picker v-model="ruleForm.StartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="开始日期" style="width: 200px;">
        </el-date-picker> - 
        <el-date-picker v-model="ruleForm.EndDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束日期" style="width: 200px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动时间段" prop="activeTime">
        <el-time-picker type="fixed-time" placeholder="起始时间" @change = "changeStartTime" value-format="HH:mm:ss" v-model="ruleForm.StartTime" style="width: 150px;"></el-time-picker> -
        <el-time-picker type="fixed-time" placeholder="结束时间" @change = "changeStartTime" value-format="HH:mm:ss" v-model="ruleForm.EndTime" style="width: 150px;"></el-time-picker>
      </el-form-item>
      <el-form-item label="选择星期">
         <el-checkbox :indeterminate="isIndeterminateWeeks" v-model="checkAllWeeks"
            @change="handleCheckAllChangeWeeks">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in optionsWeek" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-checkbox :indeterminate="isIndeterminateDay" v-model="checkAllDay"
        @change="handleCheckAllChangeDay"
      >全选</el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group style="width: 50%;" v-model="Dates" @change="handleCheckedCitiesChangeDay">
        <el-checkbox v-for="(item, index) in datesList" :label="item" :key="index">{{ item }}</el-checkbox>
      </el-checkbox-group>
      </el-form-item>  
      <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType" style="display:inline-block">
          <el-checkbox label="1">微卡支付</el-checkbox>
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="4">券支付</el-checkbox>
        </el-checkbox-group>
        <span class="Spancolor">（勾选券支付，表示在秒杀活动可以使用电子券）</span>
        <!-- 勾选券支付，表示在秒杀活动可以使用电子券 -->
        
      </el-form-item>
      <el-form-item label="订单取消" prop="AutoCancelOrder">
        买家 
        <el-input type="number" v-model="ruleForm.AutoCancelOrder" min="5"
        onkeyup="value=value.replace(/\D/g, '').replace(/^0{1,}/g, '')" class="inputSty"></el-input>
        &nbsp;&nbsp;分钟未支付订单，订单取消
      </el-form-item>
      <el-form-item label="重要提示" prop="ImportantNotes" class="FeaturesStyle">
        <el-button
          type="text"
          @click="ImportantNotesShow = true"
          v-if="ImportantNotesShow === false"
        >+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button
          type="text"
          @click="ImportantNotesShow = false"
          v-if="ImportantNotesShow === true"
        >隐藏</el-button>
      </el-form-item>
    </el-form>

    <mall-goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood" :prodList="prodListArr" ></mall-goods>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
    </div>

    <!-- <div class="active-code-style" v-if="codeUrl">
      <div class="active-code-style-title">手机微信扫码浏览</div>
      <QRCode :newWidth="200" :newText="   activeUrlGood +   codeUrl +   '?AppNo=' +   AppNoMy +   '&seckill=true&isBrowse=true'"></QRCode>
    </div> -->
  </div>
</template>

<script>
import { addScroll, ImgList, replacePre,GetBaseImgUrl } from "@/config/publicFunction";
import { integralStateList, activeTypeNorms } from "@/config/utils";
import { getLists } from "@/api/vipCard";
import { activeUrlGood } from "@/config/index";
import goodType from "@/components/selector/goodType";
import Goods from "@/components/Dialog/goods";
import mallGoods from "@/components/Dialog/mallGoods";
import imgLoad from "@/components/download/imgLoad";
import ueditor1 from "@/components/ueditor1/";
import * as ruleText from "@/view/wechatManager/rulesFrom";
import _ from "lodash";
import "@/config/jquery.base64.js";
import QRCode from "@/components/qrcodejs/qrcodejs";
import Cookies from "js-cookie";
export default {
  name: "",
  components: { goodType, Goods, imgLoad, ueditor1, mallGoods, QRCode },
  data() {
    return {
      isGroup:'noGroup',
      ruleForm: {
        Type: "1",
        ProdList: [],
        SalePrice: 0,
        IsOpenProm:"0",
        IsOpenStock:'0',
        PayType: ["1", "2"],
        AutoCancelOrder:'5',
        StartTime:"",
        EndTime:""
        // DeliveryType: ["2", "1"],
        // Start: "1",
        // MaxBuyCnt: 0,
      },
      checkedCities:[],
      optionsWeek: [
        { value: "1", label: "星期一" },
        { value: "2", label: "星期二" },
        { value: "3", label: "星期三" },
        { value: "4", label: "星期四" },
        { value: "5", label: "星期五" },
        { value: "6", label: "星期六" },
        { value: "0", label: "星期天" }
      ],
      isIndeterminateDay: false,
      isIndeterminateWeeks:false,
      checkAllDay: false,
      checkAllWeeks:false,
      datesList:[],//天
      Dates: [],
      multipleL: "",
      activityDate: [],
      activeUrlGood: activeUrlGood,
      AppNoMy: Cookies.get("AppNo"),
      rules: {
        ProdNo: [ruleText.ProdNo(this, "请选择活动商品")],
        Name: [ruleText.Name(this, "请填写活动名称")],
        StoreQty: [ruleText.StoreQty(this)],
        ShopInfo: [ruleText.ShopInfo(this)],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        SalePrice: [
          { required: true, message: "请填写秒杀售价", trigger: "blur" },
        ],
        activityDate: [
          {
            required: true,
            message: "请选择活动日期",
            trigger: "change",
            validator: (rules, value, callback) => {
              if (!this.activityDate) {
                callback(new Error("请选择活动日期"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      loading: false,
      goodsShow: false,
      goodsNormsIndex: 0,
      fileListUpMain: [],
      fileListUpList: [],
      integralStateList: integralStateList,
      showCheckTicket: false,
      // 门店前选中的数据
      checkClick: [],
      checkList: [],
      disabledTakeout: false,
      disabledLogistics: true,
      FeaturesShow: true,
      ImportantNotesShow: true,
      activeTypeNorms: activeTypeNorms,//活动类型

      codeUrl: "",
      prodListArr: [],//弹框数组
      ImportantNotesShow: true, // 显示隐藏 重要提示
    };
  },
  created() {
    this.codeUrl = this.$route.query.SID;
    // if(this.$route.query.SID){
      this.getInfo();
    // }
    let arr = []; //1-31天
    for (let i = 1; i < 32; i++) {
      arr.push(i.toString());
    }
    this.datesList = arr;
  },
  methods: {

    async getInfo() {//获取详情
      try {
        this.loading = true;
        let info = this.$route.query.SID ? getLists(
              {
                Action: "GetPromotion",
                SID: this.$route.query.SID,
              },
              "MPromotionOpera"
            )
          : [];
        let res = await Promise.all([info]);
        this.loading = false;
        this.ruleForm = res[0].Data.Promotion;
        this.ruleForm.ProdList = res[0].Data.ItemList;
        this.prodListArr = res[0].Data.ItemList;       
        this.ruleForm.PayType = this.ruleForm.PayType
        ? this.ruleForm.PayType.split(",")
        : []; 
        if (this.ruleForm.Weeks) {
          this.checkedCities = this.ruleForm.Weeks.split(",");
          this.handleCheckedCitiesChange(this.checkedCities)
        }
        if (this.ruleForm.Dates) {
          this.Dates = this.ruleForm.Dates.split(",");
          this.handleCheckedCitiesChangeDay(this.Dates);
        }
        if (this.ruleForm.SpecType === "1") {
          // 单规格
          let ProdArr = this.ruleForm.ProdList[0];
          this.ruleForm.SalePrice = ProdArr.SalePrice;
          this.ruleForm.StoreQty = ProdArr.StoreQty;
          let SurplusQty =
            Number(ProdArr.StoreQty) - Number(ProdArr.SurplusQty);
          this.ruleForm.SurplusQty = SurplusQty;
        }
        let abc = GetBaseImgUrl(); 
        let ImportantNotes = $.base64.atob( this.ruleForm.ImportantNotes, "utf8");
        ImportantNotes = ImportantNotes.replace( /src="Files/g, `src="${abc}${process.env.Prefix}Files`);
        // this.ruleForm.ImportantNotes = ImportantNotes
        this.$refs.ImportantNotes.setUEContent(ImportantNotes);
        // console.log(this.ruleForm.ImportantNotes)
      } catch (e) {
        this.$message.error(e)
      }
    },
    handleCheckAllChangeWeeks(val){
      if(val){
        this.checkedCities = [];//先清空数组
        this.optionsWeek.forEach(item=>{
          this.checkedCities.push(item.value)
        })
      }else{
        this.checkedCities = []
      }
      this.ruleForm.Weeks = this.checkedCities.join(",");
      this.isIndeterminateWeeks = false;
    },
    handleCheckedCitiesChange(value){
      let checkedCount = value.length;
      this.checkAllWeeks = checkedCount === this.optionsWeek.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionsWeek.length;
      this.ruleForm.Weeks = this.checkedCities.join(",");
    },
    // 选择天数
    handleCheckAllChangeDay(val) {
      this.Dates = val ? this.datesList : [];
      this.isIndeterminateDay = false;
      this.ruleForm.Dates = this.Dates.join(",");
    },
    handleCheckedCitiesChangeDay(value) {
      let checkedCount = value.length;
      this.checkAllDay = checkedCount === this.datesList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.datesList.length;
      this.ruleForm.Dates = this.Dates.join(",");
    },
    changeNorms() {},
    selectGoods(index) {
      // 商品编号弹框
      this.prodListArr = this.ruleForm.ProdList;
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    // 获取的商品的名字和编号
    sureGood(val) {
      let arr = [];
      this.goodsShow = false;
      // this.ruleForm.ProdList = val;
      if(this.$route.query.SID){
        this.ruleForm.ProdList.forEach((item2,index)=>{
          arr = val.filter(item => item2.ProdNo != item.ProdNo);
        })
        this.ruleForm.ProdList = this.ruleForm.ProdList.concat(arr)
      }
      if(this.$route.query.SID){
        arr = val.map((item,index)=>{
          return {
            Name: item.Name,
            SID:item.SID,
            OldPrice: item.OldPrice,
            SalePrice: item.SalePrice,
            Stock: item.Stock,
            StockType:item.StockType,
            StoreQty: item.StoreQty,
            // SurplusQty:item.SurplusQty,
            SurplusQty:item.SurplusQty,
            MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
            ProdSID: item.ProdSID,
            SpecSID: item.SpecSID,
            ProdNo: item.ProdNo,
            SpecType: item.SpecType,
          }
        })
      }else{
        arr = val.map((item,index)=>{
          return {
            Name: item.Name,
            SID:item.SID,
            OldPrice: item.OldPrice,
            SalePrice: item.SalePrice,
            Stock: item.Stock,
            StockType:item.StockType,
            StoreQty: item.StoreQty,
            // SurplusQty:item.SurplusQty,
            SurplusQty:item.StoreQty,
            MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
            ProdSID: item.ProdSID,
            SpecSID: item.SpecSID,
            ProdNo: item.ProdNo,
            SpecType: item.SpecType,
          }
        })
      }
      this.ruleForm.ProdList = arr;      
      // 编辑时点击确定需要遍历数据，否则会覆盖已填写好的数据
      // this.ruleForm.ProdList.forEach((item2,index)=>{
      //   arr = val.filter(item => item2.ProdNo != item.ProdNo);
      // })
      // this.ruleForm.ProdList = this.ruleForm.ProdList.concat(arr)
    },
    cancelFun() {
      // 取消
      this.$router.push("/weChat/manager/activity/goodSetting");
    },
    clearable(){
      this.activeTime = []
    },
    dateFormat(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
        * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
        * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return hours+":"+minutes+":"+seconds;
    },
    changeStartTime(){
      if(this.ruleForm.StartTime==null){
        this.ruleForm.StartTime = ''
      }
      if(this.ruleForm.EndTime==null){
        this.ruleForm.EndTime = ''
      }
    },
    async preserveFun(formName) {
      for(let i = 0;i<this.ruleForm.ProdList.length;i++){
          if(this.ruleForm.ProdList[i].SalePrice===undefined){
            this.$message.error("请填写活动价格")
            return false;
          }
          if(this.ruleForm.ProdList[i].StockType==='1'){
            if(Number(this.ruleForm.ProdList[i].StoreQty) > Number(this.ruleForm.ProdList[i].Stock)){
              this.$message.error("活动数量不能大于商品库存")
              return false;
            }
            
          }
          if(Number(this.ruleForm.ProdList[i].SurplusQty) > Number(this.ruleForm.ProdList[i].StoreQty)){
            this.$message.error("剩余数量不能大于活动数量")
            return false;
          }
          if(Number(this.ruleForm.ProdList[i].MaxBuyCnt) > Number(this.ruleForm.ProdList[i].StoreQty)){
            this.$message.error("限购数量不能大于活动数量")
            return false;
          }
      }
      if(this.ruleForm.PayType.indexOf("4")>-1&&this.ruleForm.PayType.length==1){
       return this.$message.error('支付方式必须包含微信或微卡支付')
      }
      this.$refs["ruleForm"].validate(async(valid) => {
        if (valid) {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            if(obj.StartTime&&obj.EndTime==""){
              return this.$message.error('请填写完整的活动时间段')
            }else if(obj.StartTime==""&&obj.EndTime){
              return this.$message.error('请填写完整的活动时间段')
            }
            obj.PayType =
              typeof obj.PayType !== "string" && obj.PayType
                ? obj.PayType.join(",")
                : obj.PayType;
             let ImportantNotes = this.$refs.ImportantNotes.getUEContent();               
             ImportantNotes = ImportantNotes.replace(
              /src="\.\.\/Files/g, `src="${process.env.Prefix}Files` );
            obj.ImportantNotes = $.base64.btoa(ImportantNotes, "utf8");
            if(this.$route.query.SID){
              let arr = obj.ProdList.map((item,index)=>{
              return {
                Name: item.Name,
                SID:item.SID,
                OldPrice: item.OldPrice,
                SalePrice: item.SalePrice,
                Stock: item.Stock,
                StockType:item.StockType,
                StoreQty: item.StoreQty,
                SurplusQty:item.SurplusQty,
                // SurplusQty:item.StoreQty,
                MaxBuyCnt:item.MaxBuyCnt,//限购数量
                ProdSID: item.ProdSID,
                SpecSID: item.SpecSID,
                ProdNo: item.ProdNo,
                SpecType: item.SpecType,
              }
            })
            obj.ProdList = JSON.stringify(arr);
            }else{
              let arr = obj.ProdList.map((item,index)=>{
              return {
                Name: item.Name,
                SID:item.SID,
                OldPrice: item.OldPrice,
                SalePrice: item.SalePrice,
                Stock: item.Stock,
                StockType:item.StockType,
                StoreQty: item.StoreQty,
                // SurplusQty:item.SurplusQty,
                SurplusQty:item.StoreQty,
                MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
                ProdSID: item.ProdSID,
                SpecSID: item.SpecSID,
                ProdNo: item.ProdNo,
                SpecType: item.SpecType,
              }
            })
            obj.ProdList = JSON.stringify(arr);
            }
            // obj.ProdList = JSON.stringify(arr);
            obj.Action = "SetPromotionInfo";
            let data = await getLists(obj, "MPromotionOpera");
            setTimeout(() => {
              this.$router.push("/weChat/manager/activity/goodSetting");
            }, 300);
          } catch (e) {
            this.$message.error(e);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async delGoodsNorms(index) {
      this.ruleForm.ProdList.splice(index, 1);
    },
    // copyUrl(val) {
    //   let index = $(".el-popover").length - 1;
    //   let input = $($(".el-popover")[index]).find("input");
    //   // // 复制输入框的地址
    //   input.select();
    //   document.execCommand("Copy");
    //   this.$Message.info("复制成功");
    //   val.visibleUrl = false;
    // },
    setInputDec(FinHour, val) {
      //不让填写小数
      if (!FinHour) return;
      this.ruleForm[val] = FinHour.toString().split(".")[0];
    },
  },
};

function setData(data, label, id) {
  let arr = data;
  let nameArr = [];
  let idArr = [];
  if (arr.length > 0) {
    arr.forEach((D) => {
      nameArr.push(D[label]);
      idArr.push(D[id]);
    });
  }
  return {
    nameArr,
    idArr,
  };
}
function setJoin(item) {
  return typeof item !== "string" && item ? item.join(",") : item;
}
</script>

<style lang="less">
.addEditActive {
  .el-input {
    width: 300px;
  }
  .Spancolor{
    color: red;
  }
  .el-input-number {
    .el-input {
      width: auto;
    }
  }
  .FeaturesStyle {
    .el-form-item__content {
      line-height: 20px;
    }
  }
  .active-code-style {
    position: fixed;
    top: 150px;
    right: 150px;
    .active-code-style-title {
      text-align: center;
      padding: 8px;
      color: #409eff;
    }
  }
  .inputSty{
    width: 150px;
    .el-input__inner{
      padding: 0 0 0 15px;
    }
  }
}
</style>
