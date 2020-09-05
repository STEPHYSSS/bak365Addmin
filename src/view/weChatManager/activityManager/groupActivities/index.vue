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
          :disabled="this.$route.query.SID?true:false"
        >
          <el-option
            v-for="item in activeTypeNorms2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品选择" :prop="ruleForm.SpecType!=='3'?'ProdNo':''" :key="1">
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods(null)"
        >选择商品</el-button>
        <!-- <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请选择商品"></el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods(null)"
        >...</el-button> -->
        <!-- <el-table
          style="margin-top: 10px;width:600px"
          v-if="ruleForm.ProdList&&ruleForm.SpecType!=='1'"
          ref="ProdNoList"
          :data="ruleForm.ProdList"
        >
          <el-table-column prop="Name" label="活动商品名称"></el-table-column>
          <el-table-column prop="SalePrice" label="活动价格¥"></el-table-column>
          <el-table-column prop="StoreQty" label="活动商品个数"></el-table-column>
          <el-table-column prop="SurplusQty" label="活动剩余商品个数"></el-table-column>
        </el-table> -->
        <el-table style="margin-top: 10px;width:700px" ref="ProdNoList" :data="ruleForm.ProdList">
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center"></el-table-column>
          <el-table-column prop="OldPrice" label="商品原价¥" align="center"></el-table-column>
          <el-table-column prop="SalePrice" label="活动价格" align="center">
            <!-- prop="Price" -->
            <template scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number"
                type="text"
                v-model="row.SalePrice"
              />
            </template>
          </el-table-column>
          <el-table-column prop="StoreQty" label="活动商品数量" align="center">
            <!-- prop="Stock" -->
            <template scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number"
                type="text"
                v-model="row.StoreQty"
              />
            </template>
          </el-table-column>
          <el-table-column prop="SurplusQty" label="活动剩余商品个数" align="center">
            <!-- prop="SurplusQty" -->
            <template scope="{ row }">
              <input
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
        label="开团售价"
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
      </el-form-item> -->
      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="提货日期" prop="activityDate">
        <el-date-picker
          v-model="activityDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="ruleForm.StartTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="ruleForm.EndTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
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
      <!-- <el-form-item label="最大购买数量" prop="MaxBuyCnt">
        <el-input-number v-model="ruleForm.MaxBuyCnt" controls-position="right" :min="0"></el-input-number>
        <div>不填或者0的时候，不限制购买数量</div>
      </el-form-item>
      <el-form-item label="状态" prop="Start">
        <el-select v-model="ruleForm.Start" placeholder="请选择">
          <el-option label="启动" value="1">启动</el-option>
          <el-option label="关闭" value="0">关闭</el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="团上线" prop="MaxGroupCnt">
        最多可开
        <p class="Inpwidth">
          <el-input v-model="ruleForm.MaxGroupCnt"></el-input>
        </p>个团
      </el-form-item>
      <el-form-item label="拼团条件" prop="GroupNum">
        凑齐
        <p class="Inpwidth">
          <el-input v-model="ruleForm.GroupNum"></el-input>
        </p>人可成团
        <span class="fontColor">成团人数只可设置一次，请谨慎填写</span>
      </el-form-item>
      <el-form-item label="每人限购" prop="MaxBuyCnt">
        每人可购买
        <p class="Inpwidth">
          <el-input v-model="ruleForm.MaxBuyCnt"></el-input>
        </p>件
      </el-form-item>
      <el-form-item label="有效期" prop="ValidTime">
        个人拼团有效期
        <p class="Inpwidth">
          <el-input v-model="ruleForm.ValidTime"></el-input>
        </p>小时
      </el-form-item>
      <el-form-item label="虚拟成团" prop="Virtual">
        <el-radio v-model="ruleForm.Virtual" label="0">未开启</el-radio>
        <el-radio v-model="ruleForm.Virtual" label="1">开启</el-radio>
        <span class="fontColor">开启虚拟成团后，活动结束以后，已开团但人数未满的团不进行退款，默认拼团成功</span>
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
      <!-- 拼团成功通知模板 -->
      <el-form-item label="产品特色" prop="Features" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow=true" v-if="FeaturesShow===false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow=false" v-if="FeaturesShow===true">隐藏</el-button>
      </el-form-item>
      <el-form-item label="重要提示" prop="ImportantNotes" class="FeaturesStyle">
        <el-button
          type="text"
          @click="ImportantNotesShow=true"
          v-if="ImportantNotesShow===false"
        >+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button type="text" @click="ImportantNotesShow=false" v-if="ImportantNotesShow===true">隐藏</el-button>
      </el-form-item>
    </el-form>

    <!-- <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods> -->
    <mall-goods
      :goodsShow="goodsShow"
      @changeDig="changeDig"
      @sureGood="sureGood"
      :prodList="prodListArr"
    ></mall-goods>
    <!-- 选择门店 -->
    <el-dialog
      class="areaTree TicketDialog"
      :title="'选择门店'"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showCheckTicket"
    >
      <div class="addScroll">
        <el-checkbox-group v-model="checkClick">
          <el-checkbox :label="item.SID" v-for="item in checkList" :key="item.SID">{{item.Name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="showCheckTicket = false">取 消</el-button>
        <el-button type="primary" @click="CheckTicketFun">确 定</el-button>
      </div>
    </el-dialog>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun">保存</el-button>
    </div>
    <!-- 新增成功后显示二维码 -->
    <div class="active-code-style" v-if="codeUrl">
      <div class="active-code-style-title">手机微信扫码浏览</div>
      <QRCode
        :newWidth="200"
        :newText="activeUrlGood + codeUrl + '?AppNo=' + AppNoMy+'&seckill=true&isBrowse=true'"
      ></QRCode>
    </div>
  </div>
</template>

<script>
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import { integralStateList, activeTypeNorms2 } from "@/config/utils";
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
        Type: "5",
        //    DeliveryType: ["2", "1"],
        // Start: "1",
        SalePrice: 0,
        MaxBuyCnt: 0,
        ProdList: [],
        // virtualSales:'',//虚拟销量
        Name:'',//活动名称
        StartTime:'',//开始时间
        EndTime:'',//结束时间
        MaxGroupCnt:''  ,//最大开团数量
        GroupNum:'' ,//成团人数
        ValidTime:'' ,//有效时间（小时）
        Virtual:'1' ,//虚拟成团开启（0未开启，1开启）
      },
      activityDate: [],
      activeUrlGood: activeUrlGood,
      AppNoMy: Cookies.get("AppNo"),
      rules: {
        ProdNo: [ruleText.ProdNo(this, "请选择活动商品")],
        Name: [ruleText.Name(this, "请填写活动名称")],
        StoreQty: [ruleText.StoreQty(this)],
        ShopInfo: [ruleText.ShopInfo(this)],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        SalePrice: [
          { required: true, message: "请填写秒杀售价", trigger: "blur" }
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
            }
          }
        ]
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
      activeTypeNorms2: activeTypeNorms2,
      codeUrl: "",
      prodListArr: []
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
                SID: this.$route.query.SID
              },
              "MPromotionOpera"
            )
          : [];
        let res = await Promise.all([info]);
        this.loading = false;
        if (this.$route.query.SID) {
          this.ruleForm = res[0].Data.Promotion;
          const abc = this.ruleForm.PromWhere.split(',')
          this.ruleForm.MaxGroupCnt = this.ruleForm.PromWhere.split(',')[0]
          this.ruleForm.GroupNum = this.ruleForm.PromWhere.split(',')[1]
          this.ruleForm.ValidTime = this.ruleForm.PromWhere.split(',')[2]
          this.ruleForm.Virtual = this.ruleForm.PromWhere.split(',')[3]


          this.ruleForm.ProdList = res[0].Data.ItemList;
          this.prodListArr = res[0].Data.ItemList;

          // console.log(this.ruleForm.ProdList,'this.ruleForm')

          this.activityDate = [this.ruleForm.StartDate, this.ruleForm.EndDate];

          this.ruleForm.MaxBuyCnt = this.ruleForm.MaxBuyCnt
            ? Number(this.ruleForm.MaxBuyCnt)
            : 0;

          this.ruleForm.ProdNo = "";
          this.ruleForm.ProdList.forEach(D => {
            this.ruleForm.ProdNo +=
              D.ProdNo + (this.ruleForm.ProdList.length > 1 ? ";" : "");
          });
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
    sureGood(val) {
      // 获取的商品的名字和编号
      this.goodsShow = false;
      this.ruleForm.ProdList = val;
      this.ruleForm.ProdNo = "";
      this.ruleForm.SpecType = val[0].SpecType;

      val.forEach(D => {
        if (this.ruleForm.SpecType === "3") {
          this.ruleForm.SpecSID += D.SpecSID + (val.length > 1 ? ";" : "");
        } else {
          this.ruleForm.ProdNo += D.ProdNo + (val.length > 1 ? ";" : "");
        }
      });
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
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
    CheckTicketFun() {
      let newArr = [];
      //供货门店
      this.checkClick.forEach(D => {
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
      this.$router.push("/weChat/manager/activity/groupGoodSetting");
    },
    preserveFun() {
      let arr = [];
      this.ruleForm.ProdList.forEach(val => {
        arr.push({
          Name: val.Name,
          StoreQty: val.StoreQty,
          OldPrice: val.OldPrice,
          SalePrice: val.SalePrice,
          Stock: val.Stock,
          SurplusQty: val.SurplusQty,
          ProdSID:val.ProdSID,
          SpecSID:val.SpecSID,
          ProdNo:val.ProdNo,
          SpecType:val.SpecType
        });
      });
      this.ruleForm.ProdList = arr;
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            // if (!obj.Img) {
            //   this.$message.info("请添加主商品图片");
            //   // return;
            // } else {
            //   obj.Img = replacePre(obj, "Img");
            // }
            // if (obj.ImgList) {
            //   obj.ImgList = replacePre(obj, "ImgList");
            // }
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

            // if (obj.SpecType === "1") {
            //   obj.ProdList[0].SalePrice = obj.SalePrice;
            //   obj.ProdList[0].StoreQty = obj.StoreQty;
            //   let SurplusQty = obj.SurplusQty ? obj.SurplusQty : 0;
            //   obj.ProdList[0].SurplusQty =
            //     Number(obj.StoreQty) - Number(SurplusQty);
            // }
            obj.ProdList = JSON.stringify(obj.ProdList);
            obj.Action = "SetPromotionInfo";
            const PromWhere = [];
            PromWhere.push(obj.MaxGroupCnt,obj.GroupNum,obj.ValidTime,obj.Virtual)            
            obj.PromWhere = PromWhere.toString()
            // console.log(obj, 5555566);
            // return;
            let data = await getLists(obj, "MPromotionOpera");
            this.$message.success("操作成功,可用二维码浏览");
            setTimeout(() => {
              this.$router.push("/weChat/manager/activity/groupGoodSetting");
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
    }
  },
  watch: {}
};

function setData(data, label, id) {
  let arr = data;
  let nameArr = [];
  let idArr = [];
  if (arr.length > 0) {
    arr.forEach(D => {
      nameArr.push(D[label]);
      idArr.push(D[id]);
    });
  }
  return {
    nameArr,
    idArr
  };
}
function setJoin(item) {
  return typeof item !== "string" && item ? item.join(",") : item;
}
</script>

<style lang="less">
.addEditActive {
  .el-input,.el-range-editor.el-input__inner {
    width: 300px;
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
  .Inpwidth {
    width: 80px;
    display: inline-block;
    margin: 0 5px;
    .el-input {
      width: 100% !important;
    }
  }
  .fontColor {
    color: #cfcfcf;
  }
}
</style>