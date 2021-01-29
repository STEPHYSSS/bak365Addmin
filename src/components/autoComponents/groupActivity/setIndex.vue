<template>
  <div class="auto-goods">
    <div class="rc-design-editor-component-title">秒杀</div>

    <el-form ref="form" :model="form" label-width="100px">
      <div class="add-good">
        <div class="imgLoad-style">
          <el-form-item label="选择活动商品:" style="margin-top:20px;">
            <div v-if="goodsList&&goodsList.length>0">
              <draggable
                v-model="goodsList"
                :move="getdata"
                @update="datadragEnd"
              >
              <div
                class="rc-design-editor-card-add__inlinOther"
                v-for="(item,index) in goodsList"
                :key="index"
                @mouseleave="currentIEel=null"
                @mouseenter="currentIEel=index"
              >
                <img style="width: 100%; height: 100%" :src="item.Img |SetImage" />

                <i
                  v-if="currentIEel === index"
                  @click="clickEdlete(index)"
                  class="el-icon-error cardEelete"
                  style="color: rgb(0, 0, 0, 0.3)"
                ></i>
              </div>
              </draggable>
            </div>
            <div class="rc-design-editor-card-add__inline" @click="cardAddFun(false)">
              <span>
                <i class="zenticon el-icon-plus rc-design-editor-card-add-icon"></i>
              </span>
            </div>
          </el-form-item>
        </div>
      </div>
      <el-form-item class="setRadioBottom" label="列表样式:" style="margin-top:20px;">
        <el-radio-group v-model="form.listStyle" @change="changeStyleSearch">
          <el-radio label="big">大图模式</el-radio>
          <el-radio label="small">一行两个</el-radio>
          <el-radio label="three">一行三个</el-radio>
          <el-radio label="list">详细列表</el-radio>
          <el-radio label="hybrid">一大两小</el-radio>
          <el-radio label="swipe">横向滑动</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="controls-card">
        <el-form-item label="页面边距:" style="margin-top:20px;">
          <div class="height-slider">
            <el-slider
              v-model="form.pageSpace"
              :max="30"
              :min="0"
              input-size="mini"
              style="flex:1;margin:0 14px 0 6px;"
              @input="changeStyleSearch"
            ></el-slider>
            <span style="margin-right:5px;">{{form.pageSpace}} 像素</span>
          </div>
        </el-form-item>
        <el-form-item label="商品间距:" style="margin-top:20px;">
          <div class="height-slider">
            <el-slider
              v-model="form.goodSpace"
              :max="30"
              :min="0"
              input-size="mini"
              style="flex:1;margin:0 14px 0 6px;"
              @input="changeStyleSearch"
            ></el-slider>
            <span style="margin-right:5px;">{{form.goodSpace}} 像素</span>
          </div>
        </el-form-item>
        <el-form-item label="商品样式:" class="setRadioBottom" style="margin-top:20px;">
          <el-radio-group v-model="form.goodStyle" @change="changePromotion">
            <el-radio label="card">无边白底</el-radio>
            <el-radio label="card-shadow">卡片投影</el-radio>
            <el-radio label="card2">描边白底</el-radio>
            <el-radio label="simple">无边透明底</el-radio>
            <el-radio label="promotion" v-if="form.listStyle==='small'">促销</el-radio>
            <!-- <el-radio label="waterfall">瀑布流</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品倒角:" style="margin-top:20px;">
          <el-radio-group v-model="form.chamfer" @change="changeStyleSearch">
            <el-radio label="rect">直角</el-radio>
            <el-radio label="circle">圆角</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片比例:" style="margin-top:20px;">
          <el-radio-group v-model="form.imgScale" @change="changeStyleSearch">
            <el-radio label="66.6667" :disabled="form.listStyle==='list'">3:2</el-radio>
            <el-radio label="100">1:1</el-radio>
            <el-radio label="133.333" :disabled="form.listStyle==='list'">3:4</el-radio>
            <el-radio label="56.25" :disabled="form.listStyle==='list'">16:9</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片填充:" style="margin-top:20px;">
          <el-radio-group v-model="form.contain" @change="changeStyleSearch">
            <el-radio label="cover">填充</el-radio>
            <el-radio label="contain">周边留白</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本样式:" style="margin-top:20px;">
          <el-radio-group v-model="form.fontWeight" @change="changeStyleSearch">
            <el-radio label="normal">常规体</el-radio>
            <el-radio label="bold">加粗体</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本对齐:" style="margin-top:20px;">
          <el-radio-group v-model="form.textCenter" @change="changeStyleSearch">
            <el-radio label="left">左对齐</el-radio>
            <el-radio
              label="center"
              :disabled="form.goodStyle==='promotion'||form.listStyle==='list'"
            >居中对齐</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="checkboxGroupStyle" label="显示内容:" style="margin-top:20px;">
          <el-checkbox-group v-model="form.showContent" @change="changeCheckbox">
            <el-checkbox
              label="1"
              :disabled="form.goodStyle==='promotion'||form.listStyle==='list'"
            >商品名称</el-checkbox>
            <el-checkbox label="2" :disabled="form.goodStyle==='promotion'">商品描述</el-checkbox>
            <el-checkbox label="3">商品价格</el-checkbox>
            <el-checkbox
              label="4"
              v-if="form.goodStyle!=='promotion'"
              :disabled="form.listStyle === 'three'&&form.textCenter == 'center'"
            >购买按钮</el-checkbox>
            <div style="margin-left:21px;" v-if="form.showContent.indexOf('4')>-1">
              <el-radio-group
                style="margin-left:5px;"
                v-model="form.buyButton"
                @change="changeStyleSearch"
              >
                <el-radio
                  v-for="(item,index) in 8"
                  :key="index"
                  :label="(index+1).toString()"
                  :disabled="((index===2||index===3||index===6||index===7)&&(form.listStyle==='swipe'||form.listStyle==='three'))
                  ||((index===0||index===1||index===4||index===5)&&(form.listStyle==='small'||form.listStyle==='big'||form.listStyle==='hybrid')
                  &&form.textCenter=='center')"
                >样式{{index+1}}</el-radio>
              </el-radio-group>
              <el-input
                v-if="buttonArr1.indexOf(form.buyButton) > -1"
                style="width:95px"
                v-model="form.buyButtonText"
                placeholder="请输入"
                @change="changeButtonText"
                :maxlength="4"
              ></el-input>
              <el-tooltip
                v-if="buttonArr1.indexOf(form.buyButton) > -1"
                content="自定义购买按钮文案，最多输入四个字"
                placement="top"
              >
                <i class="el-icon-question" style="font-size:15px;color:#999;margin-left: 10px;"></i>
              </el-tooltip>
            </div>

            <el-checkbox label="5">商品角标</el-checkbox>
            <div style="margin-left:21px;" v-if="form.showContent.indexOf('5')>-1">
              <el-radio-group v-model="form.typeSign" @change="changeStyleSearch">
                <el-radio label="0">新品</el-radio>
                <el-radio label="1">热卖</el-radio>
                <el-radio label="2">NEW</el-radio>
                <el-radio label="3">HOT</el-radio>
                <el-radio label="4">自定义</el-radio>

                <div class="imgLoad-style" v-if="form.typeSign === '4'">
                  <imgLoad
                    folder="CustomImg"
                    :isAutoFixed="true"
                    @upLoadImgs="upLoadImgsMain"
                    :fileListUrl="form.typeSignImg |SetImage"
                    :limit="1"
                    :enlarge="1"
                    :showFileList="true"
                    imgWidth="50px"
                    imgHeight="50px"
                  ></imgLoad>
                </div>
              </el-radio-group>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
    <seckill-goods ref="seckillAuto" @beforeClose="beforeClose" @sureGood="sureGood" :Type = "Type"></seckill-goods>
 
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
import { getLists } from "@/api/vipCard";
import draggable from "vuedraggable";
import SeckillGoods from '@/components/Dialog/seckillGoods.vue';//活动商品弹窗组件
export default {
  mixins: [Mixins],
  name: "",
  components: { imgLoad,draggable,SeckillGoods },
  data() {
    return {
      form: {
        listStyle: "big",
        goodSource: "0",
        goodStyle: "card",
        chamfer: "rect",
        imgScale: "100",
        pageSpace: 0,
        goodSpace: 0,
        showContent: ["1", "2", "3", "4", "5"],
        contain: "cover",
        fontWeight: "normal",
        textCenter: "left",
        buyButton: "1",
        buyButtonText: "",
        typeSign: "0",
        typeSignImg: "",
        goodsMaxNum: 6,
        _data: [] //商品弹窗数据
      },
      Type:'5',//拼团的类型为5
      buttonArr: ["1", "2", "5", "6"],
      buttonArr1: ["3", "4", "7", "8"],
      // 是数组
      goodsList: [],
      //判断打开的是那个弹框
      isGroup: false,
      currentIEel: "",
      //弹框的时候隐藏底部的提交按钮 '1'显示 '2'隐藏
      _dialogVisible: "1",
      goodInfoList: [] //用来接收
    };
  },
  created() {
    this.form.pageSpace = Number(this.form.pageSpace);
    this.form.goodSpace = Number(this.form.goodSpace);

    if (this.form.goodSource === "1") {
      this.goodsList;
    }
    this.goodsList = this.form._Prod_Data || [];
    this.goodInfoList = this.form._Prod_Data;
    // console.log(this.goodsList,'if外面的')
  },
  mounted() {},
  methods: {
    getdata (evt) {
      console.log(evt.draggedContext.element.props)
      // this.ModeValArr = evt.draggedContext.element.props;
      // console.log(this.ModeValArr,'555')
    },
    datadragEnd (evt) {
      this.$emit("setModeVal", this.form);
    },
    changeStyleSearch() {//切换样式
      if (this.form.listStyle === "list") {
        this.form.imgScale = "100";
        this.form.textCenter = "left";
        if (this.form.showContent.indexOf("1") == -1) {
          this.form.showContent.push("1");
        }
      }
      var arr = this.buttonArr; //自定义按钮 样式
      var arr1 = this.buttonArr1; //自定义按钮 样式

      if (this.form.listStyle === "swipe" || this.form.listStyle === "three") {
        if (arr1.indexOf(this.form.buyButton) > -1) {
          this.form.buyButton = "1";
        }
      }
      if (
        (this.form.listStyle === "small" ||
          this.form.listStyle === "big" ||
          this.form.listStyle === "hybrid") &&
        this.form.textCenter == "center"
      ) {
        if (arr.indexOf(this.form.buyButton) > -1) {
          this.form.buyButton = "3";
        }
      }
      if (
        this.form.listStyle !== "small" &&
        this.form.goodStyle === "promotion"
      ) {
        this.form.goodStyle = "card";
      }
      if (this.form.listStyle === "swipe" && this.form.textCenter == "center") {
        this.form.showContent.splice(this.form.showContent.indexOf("1"));
      }
      if (this.form.listStyle === "three" && this.form.textCenter == "center") {
        this.form.showContent.splice(this.form.showContent.indexOf("4"));
      }

      //切换 购买按钮样式的时候
      this.form.buyButtonText = "";
      if (["3", "7"].indexOf(this.form.buyButton) > -1) {
        this.form.buyButtonText = "马上抢";
      }
      if (["4", "8"].indexOf(this.form.buyButton) > -1) {
        this.form.buyButtonText = "购买";
      }

      this.$emit("setModeVal", this.form);
    },
    changeButtonText() {
      //购买按钮 自定义文字 为空的时候
      if (
        ["3", "7"].indexOf(this.form.buyButton) > -1 &&
        !this.form.buyButtonText
      ) {
        this.form.buyButtonText = "马上抢";
      }
      if (
        ["4", "8"].indexOf(this.form.buyButton) > -1 &&
        !this.form.buyButtonText
      ) {
        this.form.buyButtonText = "购买";
      }
      this.$emit("setModeVal", this.form);
    },
    changePromotion(val) {
      if (val === "promotion") {
        this.form.buyButton = "9";
        this.form.buyButtonText = "我要抢购";
        this.form.textCenter = "left";
        if (this.form.showContent.length > 0) {
          this.form.showContent.splice(this.form.showContent.indexOf("1"));
          this.form.showContent.splice(this.form.showContent.indexOf("2"));
          this.form.showContent.splice(this.form.showContent.indexOf("4"));

          if (this.form.showContent.indexOf("3") == -1) {
            this.$nextTick(() => {
              this.form.showContent.push("3");
            });
          }
        }
      } else {
        this.form.buyButton = "1";
        this.form.buyButtonText = "";
      }
      this.$emit("setModeVal", this.form);
    },
    changeCheckbox() {
      this.form.typeSign = "0";
    },
    upLoadImgsMain(url) {
      // 图片
      this.form.typeSignImg = url.replace(process.env.Prefix, "");
      this.$emit("setModeVal", this.form);
    },
    cardAddFun(bool) {//修改
      if (this.$refs.seckillAuto) {
        this.$refs.seckillAuto.dialogVisible = true;
      }
      this.form._dialogVisible = "1";
      this.$emit("setModeVal", this.form);
    },
    beforeClose() {//关闭弹窗
      this.form._dialogVisible = "2";
      this.$emit("setModeVal", this.form);
    },
    sureGood(arr) {
      // console.log(arr,'点击弹窗确定的时候返回的数据')
      if (arr.length === 0) {
        return;
      }
      let arrGoods = [];
      arr.forEach((item,index) => {
        arrGoods.push(item.SID);
      });
      if (!this.form._data) {
        this.form._data = [];
      }
      if (!Array.isArray(this.form._data)) {
        this.form._data = this.form._data.split(",");
      }
      this.form._data = this.form._data.concat(arrGoods);
      this.goodsList = this.goodsList.concat(arr);
      this.$set(this.form, "_Prod_Data", this.goodsList);
      this.$emit("setModeVal", this.form);
    },
    changeGoodsNum(val) {
      if (val) {
        let arr = val.toString().split(".");
        // 去除小数
        this.form.goodsMaxNum = arr.length > 1 ? arr[0] : val;
      }
    },
    clickEdlete(index) {
      this.form._data.splice(index, 1);
      this.goodsList.splice(index, 1);
      this.$set(this.form, "_Prod_Data", this.goodsList);
    }
  },
  watch: {}
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

.auto-goods {
  //设置弹框
  .v-modal {
    height: 100vh;
  }
  .el-dialog__body {
    height: 500px;
    overflow-y: scroll;
  }
  .zent-tag-style-outline {
    height: 40px;
    width: 220px;
    padding: 0 4px;
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
  }
  .rc-design-editor-card-add__inlinOther {
    position: relative;
    float: left;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin: 0 10px 10px 0;
    display: block;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .el-form-item {
    margin-top: 7px !important;
    margin-bottom: 5px !important;
  }
  .setRadioBottom {
    .el-radio {
      margin-bottom: 5px;
    }
  }
  .checkboxGroupStyle {
    .el-checkbox {
      display: block;
    }
    .el-radio {
      font-size: 12px;
      margin-right: 10px;
      margin-bottom: 15px;
    }
    .imgLoad-style {
      .el-upload--picture-card {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
    }
  }

  .controls-card {
    padding: 10px 0;
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    background: #fff;
  }
  .add-good {
    .el-form-item {
      margin-top: 0px !important;
    }
    .rc-design-editor-card-add__inline {
      position: relative;
      float: left;
      width: 50px;
      height: 50px;
      cursor: pointer;
      margin: 0 10px 10px 0;
      display: block;
      border: 1px dashed #ddd;
      background-color: #fff;
    }
    .rc-design-editor-card-add__inline .rc-design-editor-card-add-icon {
      position: absolute;
      margin: 0;
      left: 50%;
      top: 50%;
      transform: translate3D(-50%, -50%, 0);
    }
    .zenticon {
      display: inline-block;
      font-style: normal;
      vertical-align: baseline;
      text-align: center;
      text-transform: none;
      font-variant: normal;
      text-rendering: auto;
      text-decoration: inherit;
      line-height: 1;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }
  }
}
</style>
