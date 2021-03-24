<template>
  <div class="addEditIntegral">
    基本信息
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      v-loading="loading"
    >
      <el-form-item label="类别" prop="CateSID">
        <goodType @changeGoodType="changeGoodType" ref="goodType" :isIntegral="true"></goodType>
      </el-form-item>
      <el-form-item label="商品编号" prop="ProdNo" :key="1">
        <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请填写商品编号"></el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods(null)"
          v-if="!this.$route.query.SID"
        >...</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" prop="ActivityDate">
        <el-date-picker
          v-model="ruleForm.ActivityDate"
          type="daterange"
          :editable="false"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="活动时间" prop="ActivityTime">
        <el-time-picker
          is-range
          v-model="ruleForm.ActivityTime"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>-->
      <el-form-item label="主积分商品图片" prop="Img">
        <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsMain"
          :fileListUp="fileListUpMain"
          :limit="1"
        ></imgLoad>(建议尺寸:800*800;大小:小于500kb;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="积分商品图片" prop="ImgList">
        <imgLoad
          folder="integralProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsList"
          :fileListUp="fileListUpList"
        ></imgLoad>(建议尺寸:800*800;大小:小于500kb;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品售价" prop="SalePrice">
        ¥
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="积分" prop="Score">
        ¥
        <el-input-number v-model="ruleForm.Score" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="库存" prop="StoreQty">
        ¥
        <el-input-number
          :step="1"
          v-model="ruleForm.StoreQty"
          controls-position="right"
          :min="0"
          @change="setInputDec(ruleForm.StoreQty,'StoreQty')"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="State">
        <el-select v-model="ruleForm.State" placeholder="请选择">
          <el-option
            v-for="item in integralStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供货门店">
        <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择门店"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="PickShopFun">...</el-button>
      </el-form-item>
      <el-form-item label="配送方式" prop="DeliveryType">
        <el-checkbox-group v-model="ruleForm.DeliveryType" @change="changeCheckbox">
          <!-- <el-checkbox label="3" :disabled="disabledLogistics">物流配送</el-checkbox>
          <el-checkbox label="2" :disabled="disabledTakeout">外卖配送</el-checkbox>-->
          <el-checkbox label="1">门店自取</el-checkbox>
        </el-checkbox-group>
        <!-- <div style="color:#999">物流与配送冲突</div> -->
      </el-form-item>
      <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType">
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="1">微卡支付</el-checkbox>
          <!-- <el-checkbox label="3">货到付款</el-checkbox> -->
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="推荐理由" prop="Recommend">
        <el-input
          style="width:300px"
          type="textarea"
          :rows="3"
          placeholder="最长支持200个字符"
          maxlength="200"
          v-model="ruleForm.Recommend"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品特色" prop="Features" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow=true" v-if="FeaturesShow===false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow=false" v-if="FeaturesShow===true">隐藏</el-button>
      </el-form-item>
    </el-form>

    <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods>
    <el-dialog
      class="areaTree TicketDialog"
      :title="'选择门店'"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showCheckTicket"
    >
      <div class="addScroll">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>

        <el-checkbox-group v-model="checkClick" @change="handleCheckedCitiesChange">
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
  </div>
</template>

<script>
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import { integralStateList } from "@/config/utils";
import { getLists } from "@/api/vipCard";
import goodType from "@/components/selector/goodType";
import Goods from "@/components/Dialog/goods";
import imgLoad from "@/components/download/imgLoad";
import ueditor1 from "@/components/ueditor1/";
import * as ruleText from "@/view/wechatManager/rulesFrom";
import _ from "lodash";
import "@/config/jquery.base64.js";
export default {
  name: "",
  components: { goodType, Goods, imgLoad, ueditor1 },
  data() {
    return {
      ruleForm: {
        DeliveryType: ["2", "1"],
        PayType: ["1", "2"],
        State: "1",
        SalePrice: 0
      },
      rules: {
        ProdNo: [ruleText.ProdNo(this)],
        Name: [ruleText.Name(this)],
        Score: [{ required: true, message: "请输入积分", trigger: "blur" }],
        StoreQty: [ruleText.StoreQty(this)],
        ShopInfo: [ruleText.ShopInfo(this)],
        CateSID: [ruleText.CateSID(this)],
        DeliveryType: [
          { required: true, message: "请选择配送方式", trigger: "change" }
        ],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
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
      // 全选的id数组
      allCheckList: [],
      // 获取的门店数据
      storeList: [],
      disabledTakeout: false,
      disabledLogistics: true,
      FeaturesShow: true,
      isIndeterminate: true,
      checkAll: false
    };
  },
  created() {
    // console.log(this.$route.query.SID, "sid");
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        this.loading = true;
        let info = this.$route.query.SID
          ? getLists(
              {
                Action: "GetProdInfo",
                SID: this.$route.query.SID
              },
              "MIntegralOpera"
            )
          : [];
        let res = await Promise.all([
          info,
          getLists({ Action: "GetShopList" }, "MShopOpera")
        ]);
        this.storeList = res[1].Data.ShopInfoList;
        this.loading = false;
        if (this.$route.query.SID) {
          this.ruleForm = res[0].Data.ProdInfo;
          this.ruleForm.CateSID = this.ruleForm.CateSID
            ? this.ruleForm.CateSID.split(",")
            : this.ruleForm.CateSID;
          this.$refs.goodType.value = this.ruleForm.CateSID;

          this.ruleForm.PayType = this.ruleForm.PayType
            ? this.ruleForm.PayType.split(",")
            : [];
          this.ruleForm.ActivityDate = this.ruleForm.ActivityDate
            ? this.ruleForm.ActivityDate.split(",")
            : [];
          this.ruleForm.DeliveryType = this.ruleForm.DeliveryType
            ? this.ruleForm.DeliveryType.split(",")
            : [];

          let arr = this.ruleForm.ShopInfo
            ? this.ruleForm.ShopInfo.split(",")
            : [];
          let newArr1 = [];
          arr.forEach(D => {
            newArr1.push(_.find(this.storeList, { SID: D }));
          });
          if (newArr1.length === 0) {
            this.ruleForm.PickShopName = '全部门店'
          } else {
            let data = setData(newArr1, "Name", "SID");
            this.ruleForm.PickShopName = data.nameArr.join(",");
          }

          let Features = $.base64.atob(this.ruleForm.Features, "utf8");
          Features = Features.replace(
            /src="Files/g,
            `src="${process.env.Prefix}Files`
          );
          setTimeout(() => {
            this.$refs.Features.setUEContent(Features);
          }, 300);
        }
      } catch (e) {}

      this.fileListUpMain = this.ruleForm.Img ? ImgList(this.ruleForm.Img) : [];
      this.fileListUpList = this.ruleForm.ImgList
        ? ImgList(this.ruleForm.ImgList)
        : [];
    },
    changeGoodType(id) {
      // 类别id
      this.ruleForm.CateSID = id;
    },
    selectGoods(index) {
      // 商品编号弹框
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    sureGood(val) {
      // 获取的商品的名字和编号
      this.goodsShow = false;

      if (this.goodsNormsIndex === null) {
        this.ruleForm.ProdNo = val.ProdNo;
        this.ruleForm.Name = val.ProdName;
      } else {
        // 给当前的 商品规格编号加 禁止
        this.ruleForm.SpecList[this.goodsNormsIndex].ProdNo = val.ProdNo;
      }
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
    PickShopFun() {
      // 打开提货门店的弹框
      this.showCheckTicket = true;
      this.checkList = this.storeList;
      this.allCheckList = [];
      this.checkList.forEach(D => {
        this.allCheckList.push(D.SID);
      });
      if (this.ruleForm.ShopInfo) {
        this.checkClick = this.ruleForm.ShopInfo.split(",");
        this.handleCheckedCitiesChange(this.checkClick);
      }

      addScroll(".el-dialog__body");
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
      // this.checkClick = [];
    },
    beforeClose(done) {
      // 提货门店的弹框关闭
      // this.checkClick = [];
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
      this.$router.push("/weChat/manager/integral/goodSetting");
    },
    preserveFun() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            if (this.checkClick.length === this.checkList.length) {
              // 门店全选
              obj.ShopInfo = "";
            } else {
              obj.ShopInfo = setJoin(obj.ShopInfo);
            }

            if (!obj.Img) {
              this.$message.info("请添加主商品图片");
              return;
            } else {
              obj.Img = replacePre(obj, "Img");
            }
            if (obj.ImgList) {
              obj.ImgList = replacePre(obj, "ImgList");
            }
            let Features = this.$refs.Features.getUEContent();
            Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
            obj.Features = $.base64.btoa(Features, "utf8");

            if (obj.ActivityDate) {
              obj.ActivityDate = setJoin(obj.ActivityDate);
            }

            obj.CateSID = setJoin(obj.CateSID);
            obj.DeliveryType = setJoin(obj.DeliveryType);
            obj.PayType = setJoin(obj.PayType);
            obj.Action = "SetProdInfo";

            // console.log(obj, 5555566);
            // return;
            await getLists(obj, "MIntegralOpera");
            this.$message.success("操作成功");
            setTimeout(() => {
              this.$router.push("/weChat/manager/integral/goodSetting");
            }, 300);
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
    handleCheckAllChange(val) {
      this.checkClick = val ? this.allCheckList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allCheckList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allCheckList.length;
    }
  }
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
.addEditIntegral {
  .el-input {
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
  .preserveStyle {
    position: fixed;
    background: #fff;
    width: 100%;
    text-align: center;
    transform: translateX(-30px);
    bottom: 0;
    z-index: 1100;
    padding: 15px 0;
  }
  .preserveStyle button {
    transform: translateX(-80px);
  }
}
</style>