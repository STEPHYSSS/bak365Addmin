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
      <el-form-item label="商品" :prop="ruleForm.SpecType!=='3'?'ProdNo':''" :key="1">
        <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请选择商品"></el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods(null)"
        >...</el-button>

        <el-table
          style="margin-top: 10px;width:600px"
          v-if="ruleForm.ProdList&&ruleForm.SpecType!=='1'"
          ref="ProdNoList"
          :data="ruleForm.ProdList"
        >
          <el-table-column prop="Name" label="活动商品名称"></el-table-column>
          <el-table-column prop="SalePrice" label="活动价格¥"></el-table-column>
          <el-table-column prop="StoreQty" label="活动商品个数"></el-table-column>
          <el-table-column prop="SurplusQty" label="活动剩余商品个数"></el-table-column>
        </el-table>
      </el-form-item>
      <!-- 选择了商品之后要展示 -->
      <el-form-item
        label="拼团价格 "
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

      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型">
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
      <el-form-item label="开始时间">
        <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="提货日期">
        <el-date-picker
          v-model="ruleForm.activityDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <!-- 团上线 拼团条件 有效期 虚拟成团 用PromWhere传 -->
      <!-- <el-form-item label="虚拟销量" prop="virtualSales">
        <el-input v-model="ruleForm.virtualSales"></el-input>
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
      
    </el-form>
    <mall-goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood" :prodList="prodListArr"></mall-goods>
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
    <!-- 选择门店结束 -->
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun">保存</el-button>
    </div>

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
        Type:'',
        Start: "1",
        SalePrice: 0,
        MaxBuyCnt: 0,
        ProdList: [],
        virtualSales:'',//虚拟销量
        Name:'',//活动名称
        startTime:'',//开始时间
        endTime:'',//结束时间
        MaxGroupCnt:''  ,//最大开团数量
        GroupNum:'' ,//成团人数
        ValidTime:'' ,//有效时间（小时）
        Virtual:'1' ,//虚拟成团开启（0未开启，1开启）
      },
      activityDate: [],//提货日期
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
    this.codeUrl = this.$route.query.SID;
    this.getInfo();
  },
  mounted(){
    console.log(this.ruleForm)
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
            // 单规格
          if (this.ruleForm.SpecType === "1") {
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
      // 商品编号弹框
    selectGoods(index) {
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
      // 图片
    upLoadImgsMain(arr) {
      if (arr.length > 0) {
        this.ruleForm.Img = arr[0].url;
      } else {
        this.ruleForm.Img = "";
      }
    },
      // 图片集
    upLoadImgsList(imgs) {
      let arr = [];
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
      //供货门店
    CheckTicketFun() {
      let newArr = [];
      this.checkClick.forEach(D => {
        newArr.push(_.find(this.checkList, { SID: D }));
      });
      let { nameArr, idArr } = setData(newArr, "Name", "SID");
      this.ruleForm.PickShopName = nameArr.join(",");
      this.ruleForm.ShopInfo = this.checkClick.join(",");
      this.showCheckTicket = false;
      this.checkClick = [];
    },
      // 提货门店的弹框关闭
    beforeClose(done) {
      done();
    },
      //选择了物流
    changeCheckbox(val) {
      if (val.indexOf("3") > -1) {
        this.disabledTakeout = true;
      } else if (val.indexOf("2") > -1) {
        this.disabledLogistics = true;
      } else {
        this.disabledTakeout = false;
        this.disabledLogistics = false;
      }
    },
      // 取消
    cancelFun() {
      this.$router.push("/weChat/manager/integral/goodSetting");
    },
    // 确认提交
    preserveFun() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            const PromWhere = [];
            PromWhere.push(obj.MaxGroupCnt,obj.GroupNum,obj.ValidTime,obj.Virtual)            
            obj.PromWhere = PromWhere.toString()
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

            if (obj.SpecType === "1") {
              obj.ProdList[0].SalePrice = obj.SalePrice;
              obj.ProdList[0].StoreQty = obj.StoreQty;
              let SurplusQty = obj.SurplusQty ? obj.SurplusQty : 0;
              obj.ProdList[0].SurplusQty =
                Number(obj.StoreQty) - Number(SurplusQty);
            }
            obj.ProdList = JSON.stringify(obj.ProdList);
            obj.Action = "SetPromotionInfo";
            // console.log(obj, 5555566);
            // return;
           let data = await getLists(obj, "MPromotionOpera");
            this.$message.success("操作成功,可用二维码浏览");
            // setTimeout(() => {
            //   this.$router.push("/weChat/manager/activity/goodSetting");
            // }, 300);
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
  .el-input,.el-date-editor--datetimerange.el-input__inner {
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