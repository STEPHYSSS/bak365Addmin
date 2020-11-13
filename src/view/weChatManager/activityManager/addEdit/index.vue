<template>
  <div class="addEditActive">
    <!-- 活动详情 -->
    基本信息
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      v-loading="loading"
    >
      <el-form-item label="活动类型" :key="6">
        <el-select
          v-model="ruleForm.Type"
          placeholder="请选择"
          @change="changeNorms"
          :disabled="this.$route.query.SID ? true : false"
        >
          <el-option
            v-for="item in activeTypeNorms"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品选择" :key="1">
        <!-- <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请选择商品"></el-input> -->
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="selectGoods(null)"
          >选择商品</el-button
        >
        <!-- 选择商品之后展示的表格 -->
        <!-- v-if="ruleForm.ProdList&&ruleForm.SpecType!=='1'" -->
        <el-table
          style="margin-top: 10px; width: 700px"
          ref="ProdNoList"
          :data="ruleForm.ProdList"
        >
          <el-table-column
            prop="Name"
            label="商品名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ProdNo"
            label="商品编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Stock"
            label="商品库存"
            align="center"
          ></el-table-column>
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
          <el-table-column
            prop="SurplusQty"
            label="剩余数量"
            align="center"
          >
            <template slot-scope="{ row }">
              <input
              style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number"
                type="text"
                v-model="row.SurplusQty"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- <el-form-item
        label="秒杀售价"
        prop="SalePrice"
        v-if="(ruleForm.ProdList&&ruleForm.SpecType=='1')"
      >
        ¥
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="库存" prop="StoreQty" v-if="ruleForm.ProdList&&ruleForm.SpecType=='1'">
        ¥
        <el-input-number
          :step="1"
          v-model="ruleForm.StoreQty"
          controls-position="right"
          :min="0"
          @change="setInputDec(ruleForm.StoreQty,'StoreQty')"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.ProdList&&ruleForm.SpecType=='1'"
        label="默认已售多少件"
        prop="SurplusQty"
      >
        <el-input-number v-model="ruleForm.SurplusQty" controls-position="right" :min="0"></el-input-number>
      </el-form-item>-->
      <el-form-item label="活动名称" prop="Name">
        <el-input
          v-model="ruleForm.Name"
          placeholder="请填写活动名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="activityDate" >
        <el-date-picker
        style="width:380px"
          v-model="activityDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="主活动图片" prop="Img">
        <imgLoad
          folder="activeImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsMain"
          :fileListUp="fileListUpMain"
          :limit="1"
        ></imgLoad>(建议尺寸:800*800;大小:小于500kb;格式:JPG,PNG,JPEG)
      </el-form-item>-->
      <!-- <el-form-item label="活动图片" prop="ImgList">
        <imgLoad
          folder="activeImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsList"
          :fileListUp="fileListUpList"
        ></imgLoad>(建议尺寸:800*800;大小:小于500kb;格式:JPG,PNG,JPEG)
      </el-form-item>-->
      <el-form-item label="最大购买数量" prop="MaxBuyCnt">
        <el-input-number
          v-model="ruleForm.MaxBuyCnt"
          controls-position="right"
          :min="0"
        ></el-input-number>
        <span class="Spancolor">(不填或者0的时候，不限制购买数量)</span>
      </el-form-item>
      <el-form-item label="状态" prop="Start">
        <el-select v-model="ruleForm.Start" placeholder="请选择">
          <el-option label="启动" value="1">启动</el-option>
          <el-option label="关闭" value="0">关闭</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="供货门店" prop="ShopInfo">
        <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择门店"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="PickShopFun">...</el-button>
      </el-form-item>-->
      <!-- <el-form-item label="配送方式" prop="DeliveryType">
      <el-checkbox-group v-model="ruleForm.DeliveryType" @change="changeCheckbox">-->
      <!-- <el-checkbox label="3" :disabled="disabledLogistics">物流配送</el-checkbox>
      <el-checkbox label="2" :disabled="disabledTakeout">外卖配送</el-checkbox>-->
      <!-- <el-checkbox label="1">门店自取</el-checkbox>
      </el-checkbox-group>-->
      <!-- <div style="color:#999">物流与配送冲突</div> -->
      <!-- </el-form-item> -->
      <!-- <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType">
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="1">微卡支付</el-checkbox>
        </el-checkbox-group>
      </el-form-item>-->
      <el-form-item label="产品特色" prop="Features" class="FeaturesStyle">
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
      </el-form-item>
      <el-form-item
        label="重要提示"
        prop="ImportantNotes"
        class="FeaturesStyle"
      >
        <el-button
          type="text"
          @click="ImportantNotesShow = true"
          v-if="ImportantNotesShow === false"
          >+编辑</el-button
        >
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button
          type="text"
          @click="ImportantNotesShow = false"
          v-if="ImportantNotesShow === true"
          >隐藏</el-button
        >
      </el-form-item>
    </el-form>

    <!-- <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods> -->
    <mall-goods
      :goodsShow="goodsShow"
      @changeDig="changeDig"
      @sureGood="sureGood"
      :prodList="prodListArr"
    ></mall-goods>
    <el-dialog
      class="areaTree TicketDialog"
      :title="'选择门店'"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showCheckTicket"
    >
      <div class="addScroll">
        <el-checkbox-group v-model="checkClick">
          <el-checkbox
            :label="item.SID"
            v-for="item in checkList"
            :key="item.SID"
            >{{ item.Name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="showCheckTicket = false">取 消</el-button>
        <el-button type="primary" @click="CheckTicketFun">确 定</el-button>
      </div>
    </el-dialog>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun"
        >保存</el-button
      >
    </div>

    <div class="active-code-style" v-if="codeUrl">
      <div class="active-code-style-title">手机微信扫码浏览</div>
      <QRCode
        :newWidth="200"
        :newText="
          activeUrlGood +
          codeUrl +
          '?AppNo=' +
          AppNoMy +
          '&seckill=true&isBrowse=true'
        "
      ></QRCode>
    </div>
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
      ruleForm: {
        Type: "1",
        //    DeliveryType: ["2", "1"],
        Start: "1",
        SalePrice: 0,
        MaxBuyCnt: 0,
        ProdList: [],
      },
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
      activeTypeNorms: activeTypeNorms,
      codeUrl: "",
      prodListArr: [],
    };
  },
  created() {
    // console.log(this.$route.query.SID, "sid");
    this.codeUrl = this.$route.query.SID;
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        this.loading = true;
        let info = this.$route.query.SID
          ? getLists(
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

          this.ruleForm.MaxBuyCnt = this.ruleForm.MaxBuyCnt
            ? Number(this.ruleForm.MaxBuyCnt)
            : 0;

          // this.ruleForm.ProdNo = "";
          // this.ruleForm.ProdList.forEach(D => {
          //   this.ruleForm.ProdNo +=
          //     D.ProdNo + (this.ruleForm.ProdList.length > 1 ? ";" : "");
          // });
          if (this.ruleForm.SpecType === "1") {
            // 单规格
            let ProdArr = this.ruleForm.ProdList[0];
            this.ruleForm.SalePrice = ProdArr.SalePrice;
            this.ruleForm.StoreQty = ProdArr.StoreQty;
            let SurplusQty =
              Number(ProdArr.StoreQty) - Number(ProdArr.SurplusQty);
            this.ruleForm.SurplusQty = SurplusQty;
            // console.log(this.ruleForm, 888);
          }

          let Features = $.base64.atob(this.ruleForm.Features, "utf8");
          let ImportantNotes = $.base64.atob(
            this.ruleForm.ImportantNotes,
            "utf8"
          );
          Features = Features.replace(
            /src="Files/g,
            `src="${process.env.Prefix}Files`
          );
          ImportantNotes = ImportantNotes.replace(
            /src="Files/g,
            `src="${process.env.Prefix}Files`
          );
          setTimeout(() => {
            this.$refs.Features.setUEContent(Features);
            this.$refs.ImportantNotes.setUEContent(ImportantNotes);
          }, 300);
        }
      } catch (e) {}

      // this.fileListUpMain = this.ruleForm.Img ? ImgList(this.ruleForm.Img) : [];
      // this.fileListUpList = this.ruleForm.ImgList
      //   ? ImgList(this.ruleForm.ImgList)
      //   : [];
    },
    changeNorms() {},
    selectGoods(index) {
      // 商品编号弹框
      this.prodListArr = this.prodListArr;
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    // 获取的商品的名字和编号
    sureGood(val) {
      this.goodsShow = false;
      this.ruleForm.ProdList = val;
      // this.ruleForm.ProdNo = "";
      // this.ruleForm.SpecType = val[0].SpecType;

      // val.forEach(D => {
      //   if (this.ruleForm.SpecType === "3") {
      //     this.ruleForm.SpecSID += D.SpecSID + (val.length > 1 ? ";" : "");
      //   } else {
      //     this.ruleForm.ProdNo += D.ProdNo + (val.length > 1 ? ";" : "");
      //   }
      // });
    },
    upLoadImgsMain(arr) {
      // 图片
      if (arr.length > 0) {
        this.ruleForm.Img = arr[0].url;
      } else {
        this.ruleForm.Img = "";
      }
    },
    upLoadImgsList(imgs) {
      // 图片集
      let arr = [];
      imgs.forEach((D) => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
    CheckTicketFun() {
      let newArr = [];
      //供货门店
      this.checkClick.forEach((D) => {
        newArr.push(_.find(this.checkList, { SID: D }));
      });
      let { nameArr, idArr } = setData(newArr, "Name", "SID");
      this.ruleForm.PickShopName = nameArr.join(",");
      this.ruleForm.ShopInfo = this.checkClick.join(",");
      this.showCheckTicket = false;
      this.checkClick = [];
    },
    beforeClose(done) {
      // 提货门店的弹框关闭
      done();
    },
    changeCheckbox(val) {
      if (val.indexOf("3") > -1) {
        //选择了物流
        this.disabledTakeout = true;
      } else if (val.indexOf("2") > -1) {
        this.disabledLogistics = true;
      } else {
        this.disabledTakeout = false;
        this.disabledLogistics = false;
      }
    },
    cancelFun() {
      // 取消
      // this.$router.push("/weChat/manager/integral/goodSetting");
      this.$router.push("/weChat/manager/activity/goodSetting");
    },
    preserveFun() {
      let arr = [];
      this.ruleForm.ProdList.forEach((val) => {
        arr.push({
          Name: val.Name,
          StoreQty: val.StoreQty,
          OldPrice: val.OldPrice,
          SalePrice: val.SalePrice,
          Stock: val.Stock,
          SurplusQty: val.SurplusQty,
          ProdSID: val.ProdSID,
          SpecSID: val.SpecSID,
          ProdNo: val.ProdNo,
          SpecType: val.SpecType,
        });
      });
      this.ruleForm.ProdList = arr;
        for(let i = 0;i<this.ruleForm.ProdList.length;i++){
          if(this.ruleForm.ProdList[i].SalePrice===undefined){
            this.$message.error("请填写活动价格")
            return false;
          }
        }
        this.$refs["ruleForm"].validate(async (valid) => {
          if (!valid) {
            return false;
          } else {
            try {
              let obj = _.cloneDeep(this.ruleForm);              
              let Features = this.$refs.Features.getUEContent();
              Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
              obj.Features = $.base64.btoa(Features, "utf8");
              let ImportantNotes = this.$refs.ImportantNotes.getUEContent();
              ImportantNotes = ImportantNotes.replace(
                /src="\.\.\/Files/g,
                `src="Files`
              );
              obj.ImportantNotes = $.base64.btoa(ImportantNotes, "utf8");

              if (this.activityDate) {
                obj.StartDate = this.activityDate[0];
                obj.EndDate = this.activityDate[1];
              }
              obj.ProdList = JSON.stringify(obj.ProdList);
              obj.Action = "SetPromotionInfo";
              let data = await getLists(obj, "MPromotionOpera");
              this.$message.success("操作成功,可用二维码浏览");
              setTimeout(() => {
                this.$router.push("/weChat/manager/activity/goodSetting");
              }, 300);
              this.codeUrl = data.Message;
            } catch (e) {
              this.$message.error(e);
            }
          }
        });
    },
    setInputDec(FinHour, val) {
      //不让填写小数
      if (!FinHour) return;
      this.ruleForm[val] = FinHour.toString().split(".")[0];
    },
  },
  watch: {},
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
