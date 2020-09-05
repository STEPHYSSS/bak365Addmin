<template>
  <div class="searchBox-style">
    <div class="rc-design-editor-component-title">商品搜索</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="搜索热词:">
        <div
          class="search-component-editor-card-tip"
          style="line-height: initial;"
        >鼠标拖拽调整热词顺序，搜索框默认展示第一个热词，其他搜索词将以标签形式显示在搜索页中</div>
        <div
          class="rc-design-editor-card search-component-editor-item-wrapper"
          style="line-height: initial;"
        >
          <div
            class="rc-design-editor-card-item"
            v-for="(item,index) in form.hotListSet"
            :key="index"
            @mouseleave="mouseoutInput"
            @mouseenter="mouseleaveInput(index)"
          >
            <el-input
              size="small"
              v-model="form.hotListSet[index]"
              style="width:100%"
              placeholder="最多十五个字"
              maxlength="15"
              @input="inputHotFun"
            ></el-input>
            <i
              v-if="currentIndex === index"
              @click="clickEdlete(index)"
              class="el-icon-error cardEelete"
            ></i>
          </div>
          <div
            v-if="form.hotListSet.length!==5"
            class="rc-design-editor-card-add"
            @click="clickAddHot"
          >
            <span>
              <i class="el-icon-plus rc-design-editor-card-add-icon"></i>
              <span>添加热词</span>
            </span>
          </div>
        </div>
      </el-form-item>

      <p class>搜索样式:</p>
      <div class="controls-card search-component-search-style-wrapper">
        <el-form-item label="框体样式:" style="margin-top:20px;">
          <el-radio-group v-model="form.shape" @change="changeStyleSearch">
            <el-radio label="rect">方形</el-radio>
            <el-radio label="circle">圆形</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="框体高度:">
          <div class="rc-design-component-search-editor__height-slider">
            <el-slider
              v-model="form.heightInput"
              :max="40"
              :min="28"
              input-size="mini"
              style="flex:1;margin:0 14px 0 6px;"
              @input="changeStyleSearch"
            ></el-slider>
            <span style="margin-right:5px;">40 像素</span>
          </div>
        </el-form-item>
        <div class="styleFlex">
          <el-form-item label="背景颜色:">
            <el-color-picker
              @change="changeStyleSearch"
              v-model="form.backGColor"
              style="vertical-align: middle;"
            ></el-color-picker>
            <a class="btnReset" @click="colorReset('backGColor','rgb(249, 249, 249)')">重置</a>
          </el-form-item>
        </div>
        <div class="styleFlex">
          <el-form-item label="框体颜色:">
            <el-color-picker
              @change="changeStyleSearch"
              v-model="form.inputBackGColor"
              style="vertical-align: middle;"
            ></el-color-picker>
            <a class="btnReset" @click="colorReset('inputBackGColor','rgb(255, 255, 255)')">重置</a>
          </el-form-item>
        </div>
        <el-form-item label="文本位置:">
          <el-radio-group v-model="form.textCenter" @change="changeStyleSearch">
            <el-radio label="1">居中</el-radio>
            <el-radio label="0">居左</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="styleFlex">
          <el-form-item label="文本颜色:">
            <el-color-picker
              @change="changeStyleSearch"
              v-model="form.inputColor"
              style="vertical-align: middle;"
            ></el-color-picker>
            <a class="btnReset" @click="colorReset('inputColor','rgb(153, 153, 153)')">重置</a>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  data() {
    return {
      dialogVisible: false,
      form: {
        shape: "rect",
        heightInput: 40,
        backGColor: "rgb(249, 249, 249)",
        inputBackGColor: "rgb(255, 255, 255)",
        textCenter: "0",
        inputColor: "rgb(153, 153, 153)",
        hotListSet: []
      },
      currentIndex: null
    };
  },
  created() {
    this.form.heightInput = Number(this.form.heightInput);
  },
  methods: {
    inputHotFun() {
      // console.log(this.form.hotList,r, "searchBox");
      var r = this.form.hotListSet.filter(function(s) {
        return s && s.trim(); //去除空白项
      });
      this.form.hotList = r;
      //热词
      this.$emit("setModeVal", this.form);
    },
    changeStyleSearch() {
      // console.log(this.form, "changeShape");
      this.$emit("setModeVal", this.form);
    },
    clickAddHot() {
      this.form.hotListSet.push("");
    },
    clickEdlete(index) {
      this.form.hotListSet.splice(index, 1);
    },
    mouseoutInput(i) {
      this.currentIndex = null;
    },
    mouseleaveInput(i) {
      this.currentIndex = i;
    },
    colorReset(params, rgb) {
      this.form[params] = rgb;
      this.$emit("setModeVal", this.form);
    },
    viewExample() {
      // this.dialogVisible = true
      this.$emit("viewExample");
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

.styleFlex .el-form-item__content {
  line-height: 0 !important;
}

.search-component-editor-card-tip {
  margin-bottom: 12px;
  color: #666;
  margin-top: 10px;
}

.rc-design-editor-card {
  position: relative;
}

/* .rc-design-editor-card-item {
  position: relative;
  background-color: #fff;
  border: 1px dashed #e5e5e5;
  margin: 10px 0;
  padding: 10px;
} */
// .cardEelete {
//   position: absolute;
//   font-size: 24px;
//   top: -12px;
//   right: -12px;
//   color: rgb(0, 0, 0, 0.3);
//   cursor: pointer;
// }
.rc-design-editor-card-add {
  display: flex;
  box-align: center;
  align-items: center;
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  border: 1px dashed #e5e5e5;
  cursor: pointer;
  color: #38f;
}
.rc-design-editor-card-add:last-child {
  margin-bottom: 0;
}
.rc-design-editor-card-add:first-child {
  margin-top: 0;
}
/* .rc-design-editor-card-add-icon {
  margin-right: 10px;
  color: #38f;
  font-weight: 700;
} */

.search-component-search-style-wrapper {
  margin-top: 10px;
  padding-top: 20px;
  border: none;
}
.controls-card {
  padding: 10px 0;
  background: #fff;
}
.rc-design-component-search-editor__height-slider {
  display: flex;
  box-align: center;
  align-items: center;
}
.btnReset {
  vertical-align: middle;
  margin-left: 6px;
}
</style>