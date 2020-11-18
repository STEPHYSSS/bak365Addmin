<template>
  <div class="auto-goodsGroup">
    <div class="rc-design-editor-component-title">商品分组</div>
    <el-form ref="form" :model="form" label-width="100px">
      <div>
        商品分组：
        <span style="color:#999">最多添加30个商品分组</span>
      </div>
      <div>
        <div
          class="rc-design-editor-card-add_goodsG rc-design-editor-card-item"
          v-for="(item,index) in form.groupList"
          :key="index"
          @mouseleave="mouseoutInput"
          @mouseenter="mouseleaveInput(index)"
        >
          <el-form-item label="商品来源:" style="width:100%">
            <div>
              <a>{{item.groupdName}}</a>
              <a style="float:right" @click="cardAddFun(item, index)">修改</a>
            </div>
          </el-form-item>
          <el-form-item label="菜单名称:" style="width:100%">
            <el-input v-model="item.Name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- <el-form-item label="显示个数:" style="margin-top:10px !important;width:100%">
            <el-radio v-model="item.radio" label="1">
              <el-input style="width:80px;" v-model="item.showNum" placeholder></el-input>
            </el-radio>
            <el-radio v-model="item.radio" label="2">全部</el-radio>
          </el-form-item> -->
          <!-- 删除已添加商品分组按钮 -->
          <i
            v-if="currentIndex === index"
            @click="clickEdlete(index)"
            class="el-icon-error cardEelete"
          ></i>
        </div>
        <div
          v-if="form.groupList.length!==30"
          class="rc-design-editor-card-add_goodsG"
          @click="clickAddGroup"
        >
          <span>
            <i class="el-icon-plus rc-design-editor-card-add-icon"></i>
            <span>添加商品分组</span>
          </span>
        </div>
      </div>
      <el-form-item label="全部分组:" style="margin-top:20px;" v-if="form.followBoard=== '1'">
        <span style="color:#999;font-size:12px">全部分组为商品的集合分组，增加消费者逛的体验</span>
        <el-radio-group v-model="form.showAll" @change="changeShowAll">
          <el-radio label="1">展示</el-radio>
          <el-radio label="2">不展示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="展示模板:" style="margin-top:20px;">
        <el-radio-group v-model="form.followBoard">
          <el-radio label="1">顶部菜单</el-radio>
          <el-radio label="2">左侧菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="controls-card" v-if="form.followBoard=== '1'">
        <el-form-item label="菜单样式:" style="margin-top:20px;">
          <el-radio-group v-model="form.menuStyle" @change="changeStyleSearch">
            <el-radio label="0">样式1</el-radio>
            <el-radio label="1">样式2</el-radio>
            <el-radio label="2">样式3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单位置:" style="margin-top:20px;">
          <el-radio-group v-model="form.menuLocation" @change="changeStyleSearch">
            <el-radio label="1">正常模式</el-radio>
            <el-radio label="2">滚动至顶部固定</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item class="setRadioBottom" label="列表样式:" style="margin-top:20px;">
        <el-radio-group v-model="form.listStyle" @change="changeStyleSearch">
          <el-radio
            :label="item.type"
            v-for="(item) in nowlistStyleList"
            :key="item.type"
          >{{item.name}}</el-radio>
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
        <el-form-item
          label="商品样式:"
          class="setRadioBottom"
          style="margin-top:20px;"
          v-if="form.followBoard=== '1'"
        >
          <el-radio-group v-model="form.goodStyle" @change="changePromotion">
            <el-radio label="card">无边白底</el-radio>
            <el-radio label="card-shadow">卡片投影</el-radio>
            <el-radio label="card2">描边白底</el-radio>
            <el-radio label="simple">无边透明底</el-radio>
            <el-radio label="promotion" v-if="form.listStyle==='small'">促销</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品倒角:" style="margin-top:20px;">
          <el-radio-group v-model="form.chamfer" @change="changeStyleSearch">
            <el-radio label="rect">直角</el-radio>
            <el-radio label="circle">圆角</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片比例:" style="margin-top:20px;" v-if="form.followBoard=== '1'">
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
        <el-form-item label="文本对齐:" style="margin-top:20px;" v-if="form.followBoard=== '1'">
          <el-radio-group v-model="form.textCenter" @change="changeStyleSearch">
            <el-radio label="left">左对齐</el-radio>
            <el-radio
              label="center"
              :disabled="form.goodStyle==='promotion'||form.listStyle==='list'"
            >居中对齐</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="checkboxGroupStyle"
          label="显示内容:"
          style="margin-top:20px;"
          v-if="form.goodStyle!=='promotion'"
        >
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

            <el-checkbox label="5" v-if="form.followBoard=== '1'">商品角标</el-checkbox>
            <div
              style="margin-left:21px;"
              v-if="form.showContent.indexOf('5')>-1&&form.followBoard=== '1'"
            >
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
                    :fileListUrl="form.typeSignImg |setImgPrex"
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

    <goodsAuto ref="goodsAuto" @beforeClose="beforeClose" @sureGood="sureGood" :isGroup="true"></goodsAuto>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
import goodsAuto from "@/components/Dialog/goodsAuto/goodsAuto";

export default {
  mixins: [Mixins],
  name: "",
  components: { imgLoad, goodsAuto },
  data() {
    return {
      isEdit: false,
      form: {
        groupList: [
          //groupId分组id, groupdName分组名称，Name自己设置的名称，radio如果是2显示全部否则按显示个数显示，showNum显示个数
          // { groupId: "", groupdName: "", Name: "", showNum: "6", radio: "1" }
        ],
        // 展示 全部1  2不
        showAll: "1",
        // 展示模板 1顶部菜单 2左侧菜单
        followBoard: "1",
        // 菜单样式:
        menuStyle: "0",
        // 菜单位置 1正常模式 2滚动至顶部固定
        menuLocation: "1",
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
        // 放商品分组id字符串拼接
        _data: [],
        _dialogVisible: "2"
      },
      buttonArr: ["1", "2", "5", "6"],
      buttonArr1: ["3", "4", "7", "8"],
      // 是数组
      goodsList: [],
      Prod_InfoList:[],//用来展示所选系列下的商品
      editGoodsName:'',
      //判断打开的是那个弹框
      isGroup: false,
      currentIndex: null,
      listStyleList: [
        { type: "big", name: "大图模式" },
        { type: "small", name: "一行两个" },
        { type: "three", name: "一行三个" },
        { type: "list", name: "详细列表" },
        { type: "hybrid", name: "一大两小" },
        { type: "swipe", name: "横向滑动" }
      ],
      nowlistStyleList: []
    };
  },
  created() {
    this.form.pageSpace = Number(this.form.pageSpace);
    this.form.goodSpace = Number(this.form.goodSpace);
    this.nowlistStyleList = this.listStyleList;

    this.setSourceGoods();
  },
  methods: {
    changeSource(val) {
      this.isGroup = val === "1" ? true : false;
      this.goodsList = [];
    },
    changeStyleSearch() {
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
    cardAddFun(bool, index) {
      this.isEdit = true;
      this.index = index;
      if (this.$refs.goodsAuto) {
        this.$refs.goodsAuto.dialogVisible = true;
      }
      this.form._dialogVisible = "1";
      this.$emit("setModeVal", this.form);
    },
    beforeClose() {
      this.form._dialogVisible = "2";
      this.$emit("setModeVal", this.form);
    },
    sureGood(arr) {
      if (arr.length === 0 || !arr) {
        return;
      }
      let obj = {
        groupId: arr.SID,
        groupdName: arr.Name,
        Name: arr.Name,
        showNum: "6",
        radio: "1"
      };
      let _data = [];
      if (this.isEdit) {
        this.$set(this.form.groupList, this.index, obj);
      } else {
        this.form.groupList.push(obj);
      }
      this.form.groupList.forEach(D => {
        _data.push(D.groupId);
      });
      this.form._data = _data;
      this.$emit("setModeVal", this.form);
    },
    changeGoodsNum(val) {
      if (val) {
        let arr = val.toString().split(".");
        // 去除小数
        this.form.goodsMaxNum = arr.length > 1 ? arr[0] : val;
      }
    },
    clickAddGroup() {
      this.isEdit = false;
      if (this.$refs.goodsAuto) {
        this.$refs.goodsAuto.dialogVisible = true;
      }
      this.form._dialogVisible = "1";
      this.$emit("setModeVal", this.form);
    },
    mouseoutInput() {
      this.currentIndex = null;
    },
    mouseleaveInput(i) {
      this.currentIndex = i;
    },
    clickEdlete(index) {
      this.form.groupList.splice(index, 1);
    },
    changeShowAll(val) {
      this.$emit("setModeVal", this.form);
    },
    setSourceGoods() {
      let _CateObj = {};
      //更新商品来源名称
      if (this.form._Cate_Data && this.form._Cate_Data.length > 0) {
        this.form._Cate_Data.forEach(D => {
          _CateObj[D.SID] = D.Name;
        });

        this.form.groupList.forEach(D => {
          if (_CateObj[D.groupId]) {
            D.groupdName = _CateObj[D.groupId];
          }
        });
      }
    }    
  },
  watch: {
    "form.followBoard"() {
      if (this.form.followBoard === "2") {
        this.form.pageSpace = 15;
        this.form.goodSpace = 20;
        this.form.listStyle = "list";
        this.form.goodStyle = "card";
        this.form.showContent.indexOf("5");
        if (this.form.showContent.indexOf("5") > -1) {
          let i = this.form.showContent.indexOf("5");
          this.form.showContent.splice(i, 1);
        }
        this.nowlistStyleList = [{ type: "list", name: "详细列表" }];
      } else {
        this.form.goodSpace = 10;
        this.form.listStyle = "big";
        this.nowlistStyleList = this.listStyleList;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

.auto-goodsGroup {
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
    margin-bottom: 5 !important;
    margin-top: 5 !important;
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

  .rc-design-editor-card-add_goodsG {
    // display: flex;
    box-align: center;
    align-items: center;
    background: #fff;
    margin: 10px 0;
    padding: 10px;
    border: 1px dashed #e5e5e5;
    cursor: pointer;
    color: #38f;
    line-height: normal;
    .el-form-item {
      margin-bottom: 0 !important;
      margin-top: 0 !important;
    }
  }
  .rc-design-editor-card-add_goodsG:last-child {
    margin-bottom: 0;
  }
  .rc-design-editor-card-add_goodsG:first-child {
    margin-top: 0;
  }
}
</style>