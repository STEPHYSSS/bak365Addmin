<template>
  <div class="addEditGoods">
    <!-- 优惠券新增编辑 -->
    基本信息
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" v-loading="loading">
      <el-form-item label="类别" prop="CateSID">
        <goodType @changeGoodType="changeGoodType" ref="goodType"></goodType>
      </el-form-item>
      <el-form-item label="电子劵">
        <el-input readonly v-model="ruleForm.TicketInfoName" placeholder="请选择电子劵"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="clickTicket">...</el-button>
        <div style="color:#999">只可用此设置的电子劵购买此商品</div>
      </el-form-item>      
      <el-form-item label="商品编号" prop="ProdNo">
        <el-input v-model="ruleForm.ProdNo" :readonly="true" placeholder="请填写商品编号"></el-input>
        <el-button type="primary" style="margin-left:10px" size="medium" @click="selectGoods(null)" v-if="!$route.query.SID">...</el-button>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="ruleForm.Name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0"></el-input-number>  ¥
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" :rows="3" placeholder="最长支持200个字符" maxlength="200" v-model="ruleForm.Describe"></el-input>
      </el-form-item>
      <el-form-item label="主商品图片">
        <imgLoad folder="ProdImg" :isAutoFixed="true" @upLoadImgs="upLoadImgsMain" :fileListUp="fileListUpMain" :limit="1"></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品图片" prop="ImgList">
        <imgLoad folder="ProdImg" :isAutoFixed="true" @upLoadImgs="upLoadImgsList" :fileListUp="fileListUpList"></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>      
      <el-form-item label="商品排序">
        <el-input-number v-model="ruleForm.Sort" controls-position="right" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number v-model="ruleForm.StoreQty" controls-position="right" :min="0" :step="1" step-strictly
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存类型">
        <el-select v-model="ruleForm.StockType" placeholder="请选择">
          <el-option v-for="item in stockTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每人限购" prop="MaxBuyCnt">
        <el-input-number v-model="ruleForm.MaxBuyCnt" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="销量基数" prop="SaleCnt">
        <el-input-number v-model="ruleForm.SaleCnt" controls-position="right" :min="0" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="商品标签">
        <tasteList ref="labelRef" :multiple="false" :Type="0" :allowCreate="false" @changeTaste="changeTasteList($event,0)"></tasteList>
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
      <el-form-item label="产品特色" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow=true" v-if="FeaturesShow===false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow=false" v-if="FeaturesShow===true">隐藏</el-button>
      </el-form-item>
      <el-form-item label="重要提示" class="FeaturesStyle">
        <el-button type="text" @click="ImportantNotesShow=true" v-if="ImportantNotesShow===false">+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button type="text" @click="ImportantNotesShow=false" v-if="ImportantNotesShow===true">隐藏</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择商品弹窗 -->
    <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods>
    <!-- 选择电子券弹窗 -->
    <TicketInfo :showTicket="showTicket" @changeDigTicket="changeDigTicket" ref="TicketInfoList"></TicketInfo>
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
  name:'addTiket',
  data(){
    return{
      loading: false,
      FeaturesShow: true, // 显示隐藏 产品特色
      ImportantNotesShow: true,// 显示隐藏 重要提示
      isCoverCurrentImgs: false,
      fileListUpList: [], // 显示在页面的商品图片(多张)
      fileListUpMain: [], // 显示在页面的商品图片（单张）
      goodsShow: false,// 控制商品弹框显示
      showTicket: false,//控制电子劵信息弹框显示
      stockTypeList : [// 库存类型 
        { label: '不使用库存', value: '0' },
        { label: '使用商城库存', value: '1' }
      ],     
      assistRuleForm:{
        BuyTimeBool: false,// 购买时间
      },
      ruleForm:{
        PayType: ["1", "2"],
      },
      rules:{
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
    }
  },
  created(){},
  methods:{
    changeGoodType(arr) {//类别
      this.ruleForm.CateSID = arr;
    },
    // 选择商品
    sureGood(val) { // 获取的商品的名字和编号
      this.goodsShow = false;
      if (this.goodsNormsIndex === null) {
        this.ruleForm.ProdNo = val.ProdNo;
        this.ruleForm.Name = val.ProdName;
      } else {
        // 给当前的 商品规格编号加 禁止
        // this.ruleForm.goodsNorms.push({number:'',norms:'',price:'',discount:''})
        this.ruleForm.SpecList[this.goodsNormsIndex].ProdNo = val.ProdNo;
        // this.ruleForm.SpecList[this.goodsNormsIndex].Name = val.ProdName
      }
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    selectGoods(index) {
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    // 选择电子券
    clickTicket(){
      this.showTicket = true;
    },
    changeDigTicket(bool) {
      this.showTicket = bool;
    },
    // 图片
    upLoadImgsList(imgs) {// 图片集
      let arr = [];
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.ImgList = arr.join(",");
    },
    upLoadImgsMain(arr) {// 主图片
      this.fileListUp = arr;
      if (arr.length > 0) {
        this.ruleForm.Img = arr[0].url;
      } else {
        this.ruleForm.Img = "";
      }
    },
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
  },
}
</script>
<style scoped>
.addEditGoods .el-input,.el-input-number,.el-textarea{
  width: 217px;
}
</style>        