<template>
  <div class="setIndexStyle">
    <div class="rc-design-editor-component-title">店铺信息</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="显示样式:">
        <el-radio-group v-model="form.typeNum" @change="changeStyleFun">
          <el-radio
            style="margin-bottom:9px"
            v-for="(item,index) in 5"
            :key="index"
            :label="index"
          >样式{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景图片:">
        <imgLoad
          folder="customImg"
          :isAutoFixed="false"
          @upLoadImgs="upLoadImgsMain"
          :fileListUrl="form.currentImg |setImgPrex"
          :limit="1"
          :showFileList="true"
        ></imgLoad>
        <span
          class="zent-design-editor__control-group-help-desc"
        >建议尺寸：750x370 像素，尺寸不匹配时，图片将被压缩或拉伸以铺满画面</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
export default {
  mixins: [Mixins],
  components: { imgLoad },
  data() {
    return {
      form: {
        typeNum: 0,
        currentImg:''
          // "https://img.yzcdn.cn/public_files/2017/07/11/f2a0a05d5a801cb51ecbc0710e6947fb.png"
      },
      fileListUpMain: []
    };
  },
  mounted() {
    this.form.typeNum = Number(this.form.typeNum);
    this.fileListUpMain = [{ url: this.form.currentImg }];
  },
  methods: {
    changeStyleFun(num) {
      this.form.typeNum = num;
      this.$emit("setModeVal", this.form);
    },
    upLoadImgsMain(url) {
      // 图片
      this.form.currentImg = url.replace(process.env.Prefix, "");
      this.$emit("setModeVal", this.form);
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
.setIndexStyle .zent-design-editor__control-group-help-desc {
  margin-top: 10px;
  color: #999;
}
</style>