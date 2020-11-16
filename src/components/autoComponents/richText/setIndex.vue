<template>
  <div class="richText">
    <div class="rc-design-editor-component-title">富文本</div>
    <div style="display:inline-block;margin-left:30px">
      背景颜色：
      <el-color-picker
        @change="changeStyleSearch"
        v-model="form.backGColor"
        style="vertical-align: middle;"
      ></el-color-picker>
      <a class="btnReset" @click="colorReset('backGColor','rgb(249, 249, 249)')">重置</a>
    </div>
    <div style="display:inline-block;margin-left:30px">
      是否全屏:
      <el-checkbox-group
        style="margin-left:10px;display: inline-block;"
        @change="changeCheck"
        v-model="form.fullScreen"
      >
        <el-checkbox label="1">全屏显示</el-checkbox>
      </el-checkbox-group>
      <!-- <el-checkbox style="margin-left:10px;" @change="changeCheck" v-model="formAuto.fullScreen">全屏显示</el-checkbox> -->
    </div>
    <div class="FeaturesStyle">
      <ueditor ref="ImportantNotes" :frameHeight="600" @blurUEContent="blurUEContent"></ueditor>
    </div>
  </div>
</template>

<script>
import ueditor from "@/components/ueditor1/";
import "@/config/jquery.base64.js";
// $.base64.atob('', "utf8") 解密
// $.base64.btoa('', "utf8") 加密
// Features.replace(  给富文本中的图片加../
//     /src="Files/g,
//     `src="${process.env.Prefix}Files`
//  );
// this.$refs.ImportantNotes.setUEContent(Features);  设置
// getUEContent()   获取
//  Features.replace(/src="\.\.\/Files/g, `src="Files`);   去除富文本中的图片加的../

import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  name: "",
  data() {
    return {
      form: {
        backGColor: "#F9F9F9",
        //true 全屏
        fullScreen: false,
        contentRich: ""
      }
    };
  },
  components: { ueditor },
  created() {
    this.form.fullScreen =
      this.form.fullScreen === "0"
        ? false
        : this.form.fullScreen === "1"
        ? true
        : this.form.fullScreen;
  },
  mounted() {
    setTimeout(() => {
      this.$refs.ImportantNotes.setUEContent(this.form.contentRich);
    }, 1000);
  },
  methods: {
    changeStyleSearch() {
      this.$emit("setModeVal", this.form);
    },
    colorReset(params, rgb) {
      this.form[params] = rgb;
      this.$emit("setModeVal", this.form);
    },
    blurUEContent(val) {
      let form = JSON.parse(JSON.stringify(this.form));
      form.fullScreen = form.fullScreen ? "1" : "0";
      form.contentRich = val.replace(
        /src="Files/g,
        `src="${process.env.BASE_URL}Files`
      );
      this.$refs.ImportantNotes.bool = true;     
      this.$emit("setModeVal", form);
    },
    changeCheck() {
      let form = JSON.parse(JSON.stringify(this.form));
      form.fullScreen = form.fullScreen ? "1" : "0";
      this.$emit("setModeVal", form);
    }
  },
  watch: {}
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";
.richText {
  .el-form-item__content {
    line-height: 0 !important;
  }
  .FeaturesStyle {
    margin-top: 16px;
    .edui-box {
      line-height: 20px !important;
    }
  }
}
</style>