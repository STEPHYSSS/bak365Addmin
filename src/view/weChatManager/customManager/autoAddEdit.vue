<template>
  <div class="customStyle">
    <!-- 自定义详情编辑，新增 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="模块名称:" prop="name">
        <el-input v-model="ruleForm.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label prop="custom" :style="{'padding-bottom':setBottom+'px'}">
        <div class="customBox" ref="customBox">
          <div class="customBoxTop">
            <div class="customBoxHead">
              <div class="customBoxHeadTitle">模板名称</div>
            </div>
            <div>
              <draggable v-model="currentModeArr" :move="getdata" @update="datadragEnd">
                 <div class="preview-item clearfix drag" v-for="(item,index) in currentModeArr" :key="index">
                  <div @click.stop="clickCurrentCot(item.key)" @mouseenter.stop="clickCurrentFun(item.key)" @mouseleave.stop="clickCurrentoutFun(item.key)" 
                  class="modeBox">
                    <component :is="item.viewComponets" ref="setModeRef" :propsObj="ModeValArr[item.key]"></component>
                    <i @click.stop="delMode(item.key)" v-if="currentIndexDel===item.key" class="el-icon-error error-icon-style"></i>
                  </div>
                  <div
                    class="zent-design-editor-item"
                    ref="setModeRefFun"
                    v-if="currentIndexCot === item.key&&item.viewComponets"
                  >
                    <component class="drag" :is="item.viewComponets + 'Fun'" :defaultMode="ModeValArr[item.key]" 
                    @setModeVal="setModeVal($event,item.key,index)"
                    ></component>
                  </div>
                </div> 
              </draggable>

            </div>
          </div>
          <!-- 基础组件开始 -->
          <div class="customBox_add--grouped">
            <div class="customBox_add-component">
              <div
                class="customBox_add-component__grouped"
                v-for="(item,i) in groupedList"
                :key="item.id"
              >
                <p class="customBox_add-component__groupedTitle">{{item.name}}</p>
                <div class="customBox_add-component__grouped-list">
                  <div
                    v-for="itemChild in item.list"
                    :key="itemChild.id"
                    class="add-component__grouped-btn-wrapper"
                    @mouseover="mouseoverFun(itemChild.id)"
                    @mouseout="mouseoutFun(itemChild.id)"
                    @click="clickBox(itemChild,i)"
                  >
                    <a :class="['add-component__grouped-btn',itemChild.id===currentIndex?'backgroundCurrent':'']"
                    >{{itemChild.name}}</a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <el-dialog title="查看事例" :visible.sync="dialogVisible" width="450px">
      <div style="text-align: center;">
        <img
          style="height: auto;max-width: 100%;vertical-align: middle;border: 0;position: relative;"
          width="280px"
          src="../../../assets/phoneImg/searchHotWords.png"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>

    <div class="preserveStyle" v-if="preserveButton">
      <el-button @click="cancelFun">取消</el-button>
      <el-button
        type="primary"
        style="margin-left:20px"
        :loading="loadingBtn"
        @click="submitForm('ruleForm')"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import "@/config/jquery.base64.js";
import { replacePre } from "@/config/publicFunction";
//点击 传入组件名放入一个数组里面，循环这个组件<component ref="shopinfoma" is="shopinfoma">方式渲染出组件
//获取相应的参数和组件 循环组件名ref，获取当前的组件名对应的动态参数
import shopinfoma from "@/components/autoComponents/shopInformation";
import shopinfomaFun from "@/components/autoComponents/shopInformation/setIndex";
import enterShops from "@/components/autoComponents/enterShops";
import enterShopsFun from "@/components/autoComponents/enterShops/setIndex";
import searchBox from "@/components/autoComponents/searchBox";
import searchBoxFun from "@/components/autoComponents/searchBox/setIndex";
import notice from "@/components/autoComponents/notice";
import noticeFun from "@/components/autoComponents/notice/setIndex";
import guide from "@/components/autoComponents/guide";
import guideFun from "@/components/autoComponents/guide/setIndex";
import auxiliaryBlank from "@/components/autoComponents/auxiliaryBlank";
import auxiliaryBlankFun from "@/components/autoComponents/auxiliaryBlank/setIndex";
import voice from "@/components/autoComponents/voice";
import voiceFun from "@/components/autoComponents/voice/setIndex";
import switchStores from "@/components/autoComponents/switchStores/index";
import switchStoresFun from "@/components/autoComponents/switchStores/setIndex";
// -----------
import textBox from "@/components/autoComponents/textBox";
import textBoxFun from "@/components/autoComponents/textBox/setIndex";
import linkedLinks from "@/components/autoComponents/linkedLinks";
import linkedLinksFun from "@/components/autoComponents/linkedLinks/setIndex";
import titleBox from "@/components/autoComponents/titleBox";
import titleBoxFun from "@/components/autoComponents/titleBox/setIndex";
import imgNav from "@/components/autoComponents/imgNav";
import imgNavFun from "@/components/autoComponents/imgNav/setIndex";
import magicCube from "@/components/autoComponents/magicCube";
import magicCubeFun from "@/components/autoComponents/magicCube/setIndex";
import pictureAds from "@/components/autoComponents/pictureAds";
import pictureAdsFun from "@/components/autoComponents/pictureAds/setIndex";
import goods from "@/components/autoComponents/goods";
import goodsFun from "@/components/autoComponents/goods/setIndex";
import richText from "@/components/autoComponents/richText";
import richTextFun from "@/components/autoComponents/richText/setIndex";
import goodGroup from "@/components/autoComponents/goodsGroup/";
import goodGroupFun from "@/components/autoComponents/goodsGroup/setIndex";
import draggable from "vuedraggable";
export default {
  name: "HelloWorld",
  components: {
    shopinfoma,
    shopinfomaFun,
    enterShops,
    enterShopsFun,
    searchBox,
    searchBoxFun,
    notice,
    noticeFun,
    guide,
    guideFun,
    auxiliaryBlank,
    auxiliaryBlankFun,
    voice,
    voiceFun,
    switchStores,
    switchStoresFun,
    textBox,
    textBoxFun,
    linkedLinks,
    linkedLinksFun,
    titleBox,
    titleBoxFun,
    imgNav,
    imgNavFun,
    magicCube,
    magicCubeFun,
    pictureAds,
    pictureAdsFun,
    goods,
    goodsFun,
    richText,
    richTextFun,
    goodGroup,
    goodGroupFun,
    draggable
  },
  data() {
    return {
      optionDrag: {
        group: "people",
        animation: 300,
        draggable: ".drag"
      },
      preserveButton: true,
      ruleForm: {
        name: ""
      },
      stylenum: 1,
      show: false,
      rules: {
        name: [{ required: true, message: "请填写模板名称", trigger: "blur" }]
      },
      groupedList: [
        {
          id: 1,
          name: "基础组件",
          list: [
            { id: 11, name: "富文本", viewComponets: "richText" },
            { id: 12, name: "商品", viewComponets: "goods" },
            { id: 13, name: "商品分组", viewComponets: "goodGroup" },
            { id: 14, name: "图片广告", viewComponets: "pictureAds" },
            { id: 15, name: "魔方", viewComponets: "magicCube" },
            { id: 16, name: "图文导航", viewComponets: "imgNav" },
            { id: 17, name: "文本", viewComponets: "textBox" },
            // linkedLinks
            // { id: 18, name: "关联链接", viewComponets: "" },
            { id: 19, name: "标题", viewComponets: "titleBox" }
          ]
        },
        {
          // id: 2,
          // name: "营销组件",
          // list: [
          //   { id: 21, name: "优惠券" },
          //   { id: 22, name: "拼团" },
          //   { id: 23, name: "周期购" },
          //   { id: 24, name: "限时折扣" },
          //   { id: 25, name: "秒杀" },
          //   { id: 26, name: "知识内容" },
          //   { id: 27, name: "知识专栏" },
          //   { id: 28, name: "积分商城" },
          //   { id: 29, name: "个性化推荐" }
          // ]
        },
        {
          id: 3,
          name: "其他",
          list: [
            // { id: 31, name: "商铺信息", viewComponets: "shopinfoma" },
            { id: 32, name: "进去商铺", viewComponets: "enterShops" },
            { id: 39, name: "切换门店", viewComponets: "switchStores" },
            { id: 33, name: "商品搜索", viewComponets: "searchBox" },
            { id: 34, name: "公告", viewComponets: "notice" },
            // { id: 35, name: "语音", viewComponets: "voice" },
            // { id: 36, name: "线下门店", viewComponets: "" },
            { id: 37, name: "辅助线", viewComponets: "guide" },
            { id: 38, name: "辅助空白", viewComponets: "auxiliaryBlank" }
          ]
        }
      ],
      currentIndex: "",//组件ID
      currentIndexCot: "",//当前选择的组件
      currentIndexDel: "",
      currentModeArr: [],//组件列表
      dialogVisible: false,
      ModeValArr: {}, //组件数据
      setBottom: 0,
      loadingBtn: false,
      drag: false,
      modeSID: "",
      key: 0
    };
  },

  mounted() {
    this.modeSID = this.$route.query.SID || "";

    if (this.modeSID) {
      this.getInfo();
    }
  },
  updated() {},
  methods: {
    getdata (evt) {
      console.log(evt)
      console.log(evt.draggedContext.element.props)
    },

    findModeKay(arr,key){
      for (var value of arr){
         if(key === value.key) return value;
      }
    },

    findModeIndex(arr,key){
      for(var i=0;i<arr.length;i++){
         if(arr[i].key === key) return i;
      }
    },

    datadragEnd (evt) {
      //console.log('拖动前的索引 :' + evt.oldIndex)
      //console.log('拖动后的索引 :' + evt.newIndex)
    },
    async getInfo() {// 获取详情
      try {
        let { Data } = await getLists(
          { Action: "GetDecorate", SID: this.modeSID },
          "MShopOpera"
        );
        this.currentModeArr = Data.Decorate.HtmlInfo;
        this.ruleForm.name = Data.Decorate.Name;
        this.ruleForm.SID = Data.Decorate.SID;
        this.ruleForm.IsDefault = Data.Decorate.IsDefault;
       this.currentModeArr.forEach(D => {
           if (D.props && D.props.contentRich) {
            // 解密富文本框
            // D.props.contentRich = $.base64.atob(D.props.contentRich, "utf8");            
          }          
          // Vue.set(this.ModeValArr,Kay,D.props);
          this.$set(this.ModeValArr,D.key,D.props)
        });


      } catch (e) {
        this.$message.error(e);
      }
    },
    submitForm(formName) {
      //保存按钮
      let errorTip = false;
      if (this.$refs.setModeRef) {
        this.$refs.setModeRef.forEach(D => {
          if (D.reportErrorsFun) {
            // 这个函数返回警告信息，在每个index自定义的index组件内，如果未填直接return出去警告
            errorTip = D.reportErrorsFun();
          }
        });
        if (errorTip) {
          this.$message(errorTip);
          return;
        }
      }
      let arr = JSON.parse(JSON.stringify(this.currentModeArr)); //外部数据 名称
      let autoArr = JSON.parse(JSON.stringify(this.ModeValArr)); //自定义组件数据

     for(let kay in autoArr) {
        let D = autoArr[kay];
        console.log(D)
        if (D._data && D._data instanceof Array) {
          //商品data
          D._data = D._data.join(",");
        }
        if (D.contentRich) {
          // 加密富文本框
          let contentRichObj = {
            img: D.contentRich
          };
          let contentRichStr = replacePre(contentRichObj, "img");
          D.contentRich = $.base64.btoa(contentRichStr, "utf8");
        }
        // this.findModeKay(arr,kay).props = D;
      };

      if (arr.length === 0) {
        this.$message("请选择组件");
        return;
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loadingBtn = true;
          arr = JSON.stringify(arr);
          try {
            let { Data } = await getLists(
              {
                Action: "SetDecorate",
                HtmlInfo: arr,
                Name: this.ruleForm.name,
                SID: this.ruleForm.SID,
                IsDefault: this.ruleForm.IsDefault,
                Type:'2'
              },
              "MShopOpera"
            );
            this.$message.success("操作成功");
            this.loadingBtn = false;
          } catch (e) {
            this.$message.error(e);
            this.loadingBtn = false;
          }
        } else {
          this.$message.error("请填写模块名称！");
          return false;
        }
      });
    },
    mouseoverFun(kay) {
      this.currentIndex = kay;
    },
    mouseoutFun(id) {
      this.currentIndex = null;
    },
    // 点击添加groupedList数组对象中的对象（比如：商品分组）
    clickBox(itemChild, index) {
      if (!itemChild.viewComponets) {
        return;
      }

      if (this.currentModeArr.length > 0 && itemChild.viewComponets === "shopinfoma") {

        let bool = false;
        for(var item of this.currentModeArr) {
           if(item.viewComponets === "shopinfoma") bool = true;
        }
        if (bool) {
          this.$message.info("该组件最多只能添加一个");
          return;
        }
      }
      
      var key = (new Date()).valueOf();

      this.$set(itemChild,"key",key);

      this.setHeight();
      let temp = JSON.parse(JSON.stringify(itemChild));
      this.currentModeArr.push(temp);
      this.currentIndexCot = key;
    },

    clickCurrentCot(kay) {
      this.currentIndexCot = kay;
      this.setHeight();
    },
    setHeight() {
      setTimeout(() => {
        if (this.$refs.customBox && this.$refs.setModeRefFun) {
          let setModeRefFun = this.$refs.setModeRefFun[0];
          let customBoxH =
            this.$refs.customBox.getBoundingClientRect().top +
            this.$refs.customBox.offsetHeight;
          let setModeRefFunH =
            setModeRefFun.getBoundingClientRect().top +
            setModeRefFun.offsetHeight;
          if (setModeRefFunH > customBoxH) {
            this.setBottom = setModeRefFunH - customBoxH;
          }
        }
      }, 100);
    },
    clickCurrentFun(kay) {
      this.currentIndexDel = kay;
    },
    clickCurrentoutFun() {
      this.currentIndexDel = null;
    },
    delMode(kay) {
      this.currentModeArr.splice(this.findModeIndex(this.currentModeArr,kay),1);

    },

    setModeVal(obj, kay,index) {

      this.$set(this.ModeValArr, kay, obj);
      
      this.findModeKay(this.currentModeArr,kay).props = obj;
      // 这里为保持同步，因为this.currentModeArr 的改变未被监控到
      // this.currentModeArr[index].props = obj;
      if (this.$refs.setModeRef[index].hasOwnProperty("changeBox")) {
        this.$refs.setModeRef[index].changeBox();
      }
      if (this.$refs.setModeRef[index].hasOwnProperty("setImgWidth")) {
        this.$refs.setModeRef[index].setImgWidth();
      }

      this.setHeight();

      if (obj._dialogVisible === "1") {
        this.preserveButton = false;
      } else {
        this.preserveButton = true;
      }
    },
    cancelFun() {
      this.$router.push("/weChat/manager/custom/customList");
    }
  }
};

function validateFun(_this, paramName) {
  let tipFun = "tipFun";
  if (_this.$refs[paramName].hasOwnProperty(tipFun)) {
    _this.$refs[paramName].tipFun();
    if (_this.$refs[paramName].tipFunBool) {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //   } else {
      //     this.tipFunBool = true;
      //   }
      // });
      //循环数组，每个数组这个值为true就不让下去
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.customStyle {
  margin-bottom: 70px;
}
.customStyle .error-icon-style {
  color: #bbb;
  font-size: 24px;
  position: absolute;
  z-index: 10;
  top: -10px;
  right: -10px;
}
.customStyle .el-dialog__body {
  padding: 5px 20px !important;
}
.customStyle .customBox {
  background-color: rgb(249, 249, 249);
  border: 1px solid #e5e5e5;
  width: 320px;
  min-height: 450px;
  position: relative;
  margin-top: 10px;
  box-sizing: content-box;
}
.customBox .customBoxTop {
  min-height: 304px;
  padding-bottom: 9px;
}
.customStyle .customBoxHead {
  height: 64px;
  line-height: 64px;
  width: 320px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(../../../assets/phoneImg/phoneTopCustom.png);
}
.customStyle .customBoxHead .customBoxHeadTitle {
  display: inline-block;
  padding: 12px 0px 0;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  color: #fff;
}
.customBox_add--grouped {
  background: #fff;
  padding-bottom: 5px;
  position: relative;
  border-top: 1px solid #e5e5e5;
}
.customBox_add-component {
  box-sizing: border-box;
}
.customBox_add-component__grouped {
  padding: 0 5px 0 10px;
}
.customBox_add-component__groupedTitle {
  font-size: 12px;
  margin-bottom: 8px;
  margin-top: 13px;
}
.customBox_add-component__grouped-list {
  display: flex;
  flex-wrap: wrap;
}
.add-component__grouped-btn-wrapper {
  display: inline-block;
  box-sizing: border-box;
  flex: 0 0 33.33%;
  height: 30px;
  margin-bottom: 5px;
  padding-right: 5px;
}
.add-component__grouped-btn {
  border: 1px dashed #e5e5e5;
  color: #666;
  background: #f8f8f8;
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}
.backgroundCurrent {
  color: #38f;
  background: rgb(207, 225, 248);
  border: 1px dashed #e5e5e5;
}
.preview-item {
  position: relative;
}
.preview-item:hover:before {
  z-index: 2;
  display: block;
  border: 1px dashed #38f;
}

/* 右边的设置div */
.zent-design-editor-item {
  padding: 12px 10px;
  box-sizing: border-box;
  z-index: 5;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  width: 420px;
  margin-left: 20px;
  font-size: 12px;
  position: absolute;
  left: 100%;
  top: 0;
}

.zent-design-editor-item:after,
.zent-design-editor-item:before {
  right: 100%;
  top: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.zent-design-editor-item:after {
  border-color: transparent;
  border-right-color: #f8f8f8;
  border-width: 6px;
  margin-top: -6px;
}
.zent-design-editor-item:before {
  border-color: transparent;
  border-right-color: #e5e5e5;
  border-width: 7px;
  margin-top: -7px;
}
.zent-design-editor-item a {
  color: #38f;
  text-decoration: none;
  cursor: pointer;
}
</style>
