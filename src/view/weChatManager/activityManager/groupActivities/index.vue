<template>
  <div class="addEditActive">
    <!-- 活动详情 -->
    基本信息
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" v-loading="loading">
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
        <el-table style="margin-top: 10px;width:700px" ref="ProdNoList" :data="ruleForm.ProdList">
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center"></el-table-column>
          <el-table-column prop="OldPrice" label="商品原价¥" align="center"></el-table-column>
          <el-table-column prop="SalePrice" label="活动价格" align="center"> <!-- prop="Price" -->
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
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1" maxlength="10"
                class="number" type="text"
                oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                v-model="row.StoreQty"
              />
            </template>
          </el-table-column>
          <el-table-column prop="SurplusQty" label="剩余数量" align="center">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1" maxlength="10"
                class="number" type="text"
                oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                v-model="row.SurplusQty"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="提货日期" prop="PickDate">
        <el-date-picker v-model="PickDate" value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动日期" prop="activityDate" >
        <el-date-picker style="width:380px" v-model="activityDate" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动时间段" prop="activityStartTime">
        <el-time-picker is-range v-model="activityStartTime" value-format="HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="团上限" prop="MaxGroupCnt">
        <em class="elText">最多可开</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.MaxGroupCnt"></el-input>
        </p><em class="elText">个团</em>
      </el-form-item>
      <el-form-item label="拼团条件" prop="GroupNum">
        <em class="elText">凑齐</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.GroupNum"></el-input>
        </p><em class="elText">人可成团</em>
        <span class="fontColor">成团人数只可设置一次，请谨慎填写</span>
      </el-form-item>
      <el-form-item label="每人限购" prop="MaxBuyCnt">
        <em class="elText">每人可购买</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.MaxBuyCnt"></el-input>
        </p><em class="elText">件</em>
      </el-form-item>
      <el-form-item label="有效期" prop="ValidTime">
        <em class="elText">个人拼团有效期</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.ValidTime"></el-input>
        </p><em class="elText">小时</em>
      </el-form-item>
      <el-form-item label="虚拟成团" prop="Virtual">
        <el-radio v-model="ruleForm.Virtual" label="0">未开启</el-radio>
        <el-radio v-model="ruleForm.Virtual" label="1">开启</el-radio>
        <span class="fontColor">开启虚拟成团后，活动结束以后，已开团但人数未满的团不进行退款，默认拼团成功</span>
      </el-form-item>     
    </el-form>

    <!-- <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods> -->
    <mall-goods :goodsShow="goodsShow" :isGroup="isGroup" @changeDig="changeDig" @sureGood="sureGood" :prodList="prodListArr"></mall-goods>
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
      isGroup:'group',
      ruleForm: {
        Type: "5",
        MaxBuyCnt: 1,
        ProdList: [],
        // virtualSales:'',//虚拟销量
        Name:'',//活动名称
        // StartTime:'',//开始时间
        // EndTime:'',//结束时间
        MaxGroupCnt:''  ,//最大开团数量
        GroupNum:'' ,//成团人数
        ValidTime:'' ,//有效时间（小时）
        Virtual:'1' ,//虚拟成团开启（0未开启，1开启）
      },
      PickDate: [],//提货日期
      activityDate:[],//开始日期范围
      activityStartTime:[],//开始时间范围
      activeUrlGood: activeUrlGood,
      AppNoMy: Cookies.get("AppNo"),
      rules: {
        // ProdNo: [ruleText.ProdNo(this, "请选择活动商品")],
        Name: [ruleText.Name(this, "请填写活动名称")],
        StoreQty: [ruleText.StoreQty(this)],
        ShopInfo: [ruleText.ShopInfo(this)],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        SalePrice: [
          { required: true, message: "请填写秒杀售价", trigger: "blur" }
        ],
        PickDate: [
          {
            required: true,
            message: "请选择提货日期",
            trigger: "change",
            validator: (rules, value, callback) => {
              if (!this.PickDate) {
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
          this.ruleForm.PickStartTime=this.ruleForm.PromWhere.split(',')[4]
          this.ruleForm.PickEndTime=this.ruleForm.PromWhere.split(',')[5]
          this.PickDate = [this.ruleForm.PickStartTime, this.ruleForm.PickEndTime];//获取提货时间
          this.activityDate = [this.ruleForm.StartDate, this.ruleForm.EndDate];//获取开始时间范围
          this.activityStartTime = [this.ruleForm.StartTime,this.ruleForm.EndTime];//获取开始时间范围
          this.ruleForm.ProdList = res[0].Data.ItemList;
          this.prodListArr = res[0].Data.ItemList;
          this.ruleForm.MaxBuyCnt = this.ruleForm.MaxBuyCnt ? Number(this.ruleForm.MaxBuyCnt) : 0;
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

          // let Features = $.base64.atob(this.ruleForm.Features, "utf8");
          // let ImportantNotes = $.base64.atob(
          //   this.ruleForm.ImportantNotes,
          //   "utf8"
          // );
          // Features = Features.replace(
          //   /src="Files/g,
          //   `src="${process.env.Prefix}Files`
          // );
          // ImportantNotes = ImportantNotes.replace(
          //   /src="Files/g,
          //   `src="${process.env.Prefix}Files`
          // );
          // setTimeout(() => {
          //   this.$refs.Features.setUEContent(Features);
          //   this.$refs.ImportantNotes.setUEContent(ImportantNotes);
          // }, 300);
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
      for(let i = 0;i<this.ruleForm.ProdList.length;i++){
          if(this.ruleForm.ProdList[i].SalePrice===undefined){
            this.$message.error("请填写活动价格")
            return false;
          }
        }
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            // let Features = this.$refs.Features.getUEContent();
            // Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
            // obj.Features = $.base64.btoa(Features, "utf8");
            // let ImportantNotes = this.$refs.ImportantNotes.getUEContent();
            // ImportantNotes = ImportantNotes.replace(
            //   /src="\.\.\/Files/g,
            //   `src="Files`
            // );
            // obj.ImportantNotes = $.base64.btoa(ImportantNotes, "utf8");
            // console.log(this.PickDate,this.activityDate,this.activityStartTime)
            // if (this.PickDate) {
            //   obj.PickStartTime = this.PickDate[0];
            //   obj.PickEndTime = this.PickDate[1];
            // }
            if (this.activityDate) {
              obj.StartDate = this.activityDate[0];
              obj.EndDate = this.activityDate[1];
            }
            debugger
            if(this.activityStartTime!=null){
              obj.StartTime = this.activityStartTime[0];
              obj.EndTime = this.activityStartTime[1];
            }else{
               obj.StartTime="";
               obj.EndTime="";
            }
            obj.ProdList = JSON.stringify(obj.ProdList);
            obj.Action = "SetPromotionInfo";
            const PromWhere = [];
            PromWhere.push(obj.MaxGroupCnt,obj.GroupNum,obj.ValidTime,obj.Virtual,this.PickDate[0],this.PickDate[1])            
            obj.PromWhere = PromWhere.toString()
            let data =  getLists(obj, "MPromotionOpera");
            // this.$message.success("操作成功,可用二维码浏览");
            console.log(data)
            // setTimeout(() => {
            //   this.$router.push("/weChat/manager/activity/groupGoodSetting");
            // }, 300);
            this.codeUrl = data.Message;
          } catch (e) {
            // this.$message.error(e);
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