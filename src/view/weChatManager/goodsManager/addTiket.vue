<template>
  <div class="addEditGoods">
    <!-- 优惠券新增编辑 -->
    基本信息
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      v-loading="loading"
    >
      <el-form-item label="类别" prop="CateSID">
        <goodType @changeGoodType="changeGoodType" ref="goodType"></goodType>
      </el-form-item>
      <el-form-item label="电子劵">
        <el-input readonly v-model="ruleForm.ProdNo" placeholder="请选择电子劵"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="clickTicket">...</el-button>
        <div style="color:#999">只可用此设置的电子劵购买此商品</div>
      </el-form-item>
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品售价" prop="SalePrice">
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>¥
      </el-form-item>
      <el-form-item label="商品描述" prop="Describe">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="最长支持200个字符"
          maxlength="200"
          v-model="ruleForm.Describe"
        ></el-input>
      </el-form-item>
      <el-form-item label="主商品图片">
        <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsMain"
          :fileListUp="fileListUpMain"
          :limit="1"
        ></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品图片" prop="ImgList">
        <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsList"
          :fileListUp="fileListUpList"
        ></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品排序" prop="Sort">
        <el-input-number
          v-model="ruleForm.Sort"
          controls-position="right"
          :min="1"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number
          v-model="ruleForm.StoreQty"
          controls-position="right"
          :min="0"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存类型">
        <el-select v-model="ruleForm.StockType" placeholder="请选择">
          <el-option
            v-for="item in stockTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每人限购" prop="MaxBuyCnt">
        <el-input-number v-model="ruleForm.MaxBuyCnt" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="销量基数" prop="SaleCnt">
        <el-input-number
          v-model="ruleForm.SaleCnt"
          controls-position="right"
          :min="0"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品标签" prop="Tag">
        <tasteList
          ref="labelRef"
          :multiple="false"
          :Type="0"
          :allowCreate="false"
          @changeTaste="changeTasteList($event,0)"
        ></tasteList>
      </el-form-item>
      <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType">
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="1">微卡支付</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="可购买时间" prop="BuyTime">
        <el-checkbox v-model="assistRuleForm.BuyTimeBool">启用</el-checkbox>&nbsp;&nbsp;
        <el-time-picker
          is-range
          v-model="ruleForm.BuyTime"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
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
    <el-dialog class="dialogTicketFa" title="选择电子劵" :visible.sync="dialogVisible" width="600px">
    <span>名称搜索</span>
    <el-input
      v-model="tiketName"
      placeholder="请输入"
      @keyup.enter="searchName"
      style="margin-right:10px;width:180px"
    ></el-input>
    <el-table
      ref="multipleTable"
      :data="tiketList"
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="TypeNo" label="编号" align="center"></el-table-column>
      <el-table-column prop="TypeName" label="名称" align="center"></el-table-column>
      <el-table-column prop="Price" label="售价" align="center"></el-table-column>
      <el-table-column prop="TakeMoney" label="面额" align="center"></el-table-column>
      <el-table-column prop="TakeDisc" label="折扣" align="center"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmEnd">确 定</el-button>
    </span>
    </el-dialog>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun">保存</el-button>
    </div>
  </div>
</template>
<script>
import goodType from "@/components/selector/goodType";
import imgLoad from "@/components/download/imgLoad";
import Goods from "@/components/Dialog/goods";
import Tree from "@/components/tree/";
import tasteList from "@/components/selector/TasteList";
import ueditor1 from "@/components/ueditor1/";
import TicketInfo from "@/components/Dialog/ticketInfo/";
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import vuedraggable from "vuedraggable";
import { getLists } from "@/api/vipCard";
import _ from "lodash";
import "@/config/jquery.base64.js";
import * as ruleText from "@/view/wechatManager/rulesFrom";
export default {
  name: "addTiket",
  data() {
    return {
      loading: false,
      FeaturesShow: true, // 显示隐藏 产品特色
      ImportantNotesShow: true, // 显示隐藏 重要提示
      isCoverCurrentImgs: false,
      fileListUpList: [], // 显示在页面的商品图片(多张)
      fileListUpMain: [], // 显示在页面的商品图片（单张）
      goodsShow: false, // 控制商品弹框显示
      dialogVisible: false, //控制电子劵信息弹框显示
      stockTypeList: [
        // 库存类型
        { label: "不使用库存", value: "0" },
        { label: "使用商城库存", value: "1" }
      ],
      assistRuleForm: {
        BuyTimeBool: false // 购买时间
      },
      ruleForm: {
        PayType: ["1", "2"],
        ProdType:'1',//电子券类型
      },
      rules: {
        ProdNo: [ruleText.ProdNo(this)],
        ProdNoChildren: [ruleText.ProdNoChildren(this)],
        NameChildren: [ruleText.NameChildren(this)],
        Name: [ruleText.Name(this)],
        StoreQty: [ruleText.StoreQty(this)],
        CateSID: [ruleText.CateSID(this)],
        Describe: [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ],
        SalePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ]
      },
      tiketList:[],//电子券列表
      tiketName:''
    };
  },
  created() {
    this.getTicket();
  },
  methods: {
    changeGoodType(arr) {
      //类别
      this.ruleForm.CateSID = arr;
    },
    // 选择电子券
    clickTicket() {
      this.dialogVisible = true;
    },
    async getTicket() {
      try {
        let {Data} = await getLists(
          { Action: "GetTicketList", TypeName: this.tiketName },
          "MProdOpera"
        );
        this.tiketList = Data.TicketList
      } catch (error) {
        this.$message.error(error);
      }
    },
    handleCurrentChange(val) {
      this.ruleForm.ProdNo = val.TypeNo;
      this.ruleForm.Name = val.TypeName;
    },
    confirmEnd(){
      this.dialogVisible = false;
    },
    // 电子券弹窗结束
    changeDigTicket(bool) {
      this.showTicket = bool;
    },
    changeTasteList(id, index) {
      // 商品标签id
      if (index === 0) {
        // 商品标签id
        this.ruleForm.Tag = id;
      } else if (index === 3) {
        // console.log(id)
        this.ruleForm.AccessoriesInfo = id;
      }
    },
    // 图片
    upLoadImgsList(imgs) {
      // 图片集
      let arr = [];
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
    upLoadImgsMain(arr) {
      // 主图片
      this.fileListUp = arr;
      if (arr.length > 0) {
        this.ruleForm.Img = arr[0].url;
      } else {
        this.ruleForm.Img = "";
      }
    },
    // 新增、编辑保存
    preserveFun(){
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            Object.assign(obj, { Action: "SetProdInfo" });
            obj.CateSID =
              typeof obj.CateSID !== "string" && obj.CateSID
                ? obj.CateSID.join(",")
                : obj.CateSID;
            obj.PayType =
              typeof obj.PayType !== "string" && obj.PayType
                ? obj.PayType.join(",")
                : obj.PayType;
            obj.AccessoriesInfo =
              typeof obj.AccessoriesInfo !== "string" && obj.AccessoriesInfo
                ? obj.AccessoriesInfo.join(",")
                : obj.AccessoriesInfo;

            let Features = this.$refs.Features.getUEContent();
            let ImportantNotes = this.$refs.ImportantNotes.getUEContent();
            Features = Features.replace(/src="\.\.\/Files/g, `src="Files`);
            ImportantNotes = ImportantNotes.replace(
              /src="\.\.\/Files/g,
              `src="Files`
            );
            obj.Features = $.base64.btoa(Features, "utf8");
            obj.ImportantNotes = $.base64.btoa(ImportantNotes, "utf8");

            if (this.assistRuleForm.BuyTimeBool) {
              if (!obj.BuyTime) {
                this.$message.info("填写购买时间");
                return;
              }
              obj.BuyTime = obj.BuyTime.join(",");
            } else {
              obj.BuyTime = "";
            }
            if (!obj.Img) {
              this.$message.info("请添加主商品图片");
              return;
            } else {
              obj.Img = replacePre(obj, "Img");
            }
            if (!obj.ImgList) {
              this.$message.info("请添加商品图片");
              return;
            } else {
              obj.ImgList = replacePre(obj, "ImgList");
            }
            if (obj.FinHour > 0) {
              obj.FinHour =
                this.isAdvanceTime === "1" ? obj.FinHour * 24 : obj.FinHour;
            }
            await getLists(obj, "MProdOpera");
            this.$router.push("/weChat/manager/goodSetting");
            this.$message.success("操作成功");
          } catch (e) {
            this.$message.error(e);
          }
        }
      });
    },
    cancelFun(){}
  },
  components: {
    goodType,
    imgLoad,
    Goods,
    Tree,
    ueditor1,
    TicketInfo,
    vuedraggable,
    tasteList
  }
};
</script>
<style scoped>
.addEditGoods .el-input,
.el-input-number,
.el-textarea {
  width: 217px;
}
</style>
