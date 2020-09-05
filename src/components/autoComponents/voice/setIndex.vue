<template>
  <div>
    <div class="rc-design-editor-component-title">语音</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="音频:">
        <a>选择音频</a>
      </el-form-item>
      <el-form-item label="选择样式:">
        <el-radio-group v-model="form.capAudioStyle" @change="changeStyleSearch">
          <el-radio label="weixin" style="margin-bottom:8px">模仿微信对话样式</el-radio>
          <el-radio label="music">播放器</el-radio>
          <el-radio label="audio">简易播放器</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="controls-card" v-if="form.capAudioStyle==='weixin'">
        <el-form-item label="头像:">
          <div class="zent-design-editor__control-group-control">
            <div class="rc-design-common-choice-image-component">上传的图片</div>
            <div class="rc-design-component-audio-editor__avatar-desc">
              <a>使用店铺logo</a>
              <div
                class="rc-design-component-audio-editor__avatar-desc-tip"
              >建议尺寸80x80像素, 若不设置, 默认使用店铺logo</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="气泡:">
          <el-radio-group v-model="form.bubble" @change="changeStyleSearch">
            <el-radio label="left">居左</el-radio>
            <el-radio label="right">居右</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="controls-card" v-else>
        <div class="styleFlex">
          <el-form-item label="标题:">
            <el-input style="width:200px" size="small" v-model="form.audioTitle" @input="changeStyleSearch"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="循环:">
          <el-checkbox v-model="form.loopPlay" @change="changeStyleSearch">开启循环播放</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item label="播放:">
        <el-radio-group v-model="form.anewAudio" @change="changeStyleSearch">
          <el-radio label="1" style="margin-bottom:8px">暂停后再恢复播放时，从头开始</el-radio>
          <el-radio label="2">暂停后再恢复播放时，从暂停位置开始</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  data() {
    return {
      form: {
        capAudioStyle: "music",
        bubble: "left",
        anewAudio: '2',
        audioTitle: "",
        loopPlay: false,
        url:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
      }
    };
  },
  created(){
    this.form.loopPlay = this.form.loopPlay === "False" ?false:this.form.loopPlay
  },
  methods: {
    changeStyleSearch() {
     this.$emit("setModeVal",this.form)
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
.controls-card {
  padding: 10px 0;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
  background: #fff;
}
.controls-card > div:last-child {
  margin-bottom: 0 !important;
}
.zent-design-editor__control-group-control {
  box-flex: 1;
  flex-grow: 1;
}
.rc-design-common-choice-image-component {
  display: inline-block;
}
.rc-design-component-audio-editor__avatar-desc {
  display: inline-block;
  width: 150px;
  margin-left: 10px;
  vertical-align: top;
}
.rc-design-component-audio-editor__avatar-desc-tip {
  color: #999;
}
</style>