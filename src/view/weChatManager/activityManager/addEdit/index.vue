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
          <el-table-column prop="SurplusQty" label="剩余数量" align="center" v-if="this.$route.query.SID">
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

      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" prop="activityDate" >
        <el-date-picker style="width:380px"
          v-model="activityDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动时间段" prop="activeTime">
        <el-time-picker
        @clearable="clearable"
          is-range
          v-model="activeTime"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>

    <mall-goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood" :prodList="prodListArr" :isGroup="isGroup"></mall-goods>

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
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
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
        // DeliveryType: ["2", "1"],
        // Start: "1",
        // MaxBuyCnt: 0,
      },
      multipleL: "",
      activityDate: [],
      activeTime:[new Date(2020, 11, 27, 8, 40), new Date(2030, 12, 31, 21, 40)],//活动时间段范围
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
    };
  },
  created() {
    this.codeUrl = this.$route.query.SID;
    this.getInfo();
  },
  methods: {
    async getInfo() {
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
        if (this.$route.query.SID) {
          this.ruleForm = res[0].Data.Promotion;
          this.ruleForm.ProdList = res[0].Data.ItemList;
          this.prodListArr = res[0].Data.ItemList;
          this.activityDate = [this.ruleForm.StartDate, this.ruleForm.EndDate];
          this.activeTime = [this.ruleForm.StartTime,this.ruleForm.EndTime];
          if (this.ruleForm.SpecType === "1") {
            // 单规格
            let ProdArr = this.ruleForm.ProdList[0];
            this.ruleForm.SalePrice = ProdArr.SalePrice;
            this.ruleForm.StoreQty = ProdArr.StoreQty;
            let SurplusQty =
              Number(ProdArr.StoreQty) - Number(ProdArr.SurplusQty);
            this.ruleForm.SurplusQty = SurplusQty;
          }
        }
      } catch (e) {
        this.$message.error(e)
      }
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
      // if(this.$route.query.SID){
      //   this.ruleForm.ProdList.forEach((item2,index)=>{
      //     arr = val.filter(item => item2.ProdNo != item.ProdNo);
      //   })
      //   this.ruleForm.ProdList = this.ruleForm.ProdList.concat(arr)
      // }
      arr = val.map((item,index)=>{
        return {
          Name: item.Name,
          SID:item.SID,
          OldPrice: item.OldPrice,
          SalePrice: item.SalePrice,
          Stock: item.Stock,
          StockType:item.StockType,
          StoreQty: item.StoreQty,
          SurplusQty:item.SurplusQty,
          MaxBuyCnt:'1',//限购数量
          ProdSID: item.ProdSID,
          SpecSID: item.SpecSID,
          ProdNo: item.ProdNo,
          SpecType: item.SpecType,
        }
      })
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
      this.$refs["ruleForm"].validate(async(valid) => {
        if (valid) {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            // let abc = this.dateFormat(this.activeTime[0])
            if (this.activityDate) {
              obj.StartDate = this.activityDate[0];
              obj.EndDate = this.activityDate[1];
            }
            if(!this.$route.query.SID){
              obj.StartTime =this.dateFormat(this.activeTime[0]) ;
              obj.EndTime = this.dateFormat(this.activeTime[1]);
            }
            // if(this.activeTime!=null){
            //   obj.StartTime = this.activeTime[0];
            //   obj.EndTime = this.activeTime[1];
            // }else{
            //   obj.StartTime = "";
            //   obj.EndTime=""
            // }
            obj.ProdList = JSON.stringify(obj.ProdList);
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
}
</style>
