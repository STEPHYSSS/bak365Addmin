<template>
  <div>
    <div class="rc-design-editor-component-title">秒杀活动</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div class="styleFlex">
        <el-form-item label="标题名:" prop="title">
          <el-input v-model="form.title" placeholder @input="inputText"></el-input>
        </el-form-item>
      </div>
      <div class="styleFlex">
        <el-form-item label="链接:">
          <el-input v-model="form.titleUrl" placeholder></el-input>
        </el-form-item>
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
      form: {
        title: "",       
        // 链接标题url
        titleUrl: ""
      },
      rules: {
        title: [{ required: true, message: "请填写标题名", trigger: "blur" }],
        titleUrlName: [
          { required: true, message: "请填写链接标题", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeStyleSearch() {
      this.$emit("setModeVal",this.form)
    },
    colorReset(params, color) {
      this.form[params] = color;
      this.$emit("setModeVal",this.form)
    },
    inputText(){
      this.$emit("setModeVal",this.form)
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
</style>