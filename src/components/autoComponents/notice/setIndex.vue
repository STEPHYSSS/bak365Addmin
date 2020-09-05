<template>
  <div>
    <div class="rc-design-editor-component-title">公告</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <div class="styleFlex setInputNotice">
        <el-form-item label="公告:" prop="noticeText">
          <el-input
            v-model="form.noticeText"
            @input="inputNotice"
            placeholder="请填写内容，如果过长，将会自手机上滚动显示"
          ></el-input>
        </el-form-item>
      </div>
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
        <el-form-item label="文字颜色:">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.textColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('textColor','rgb(255, 248, 233)')">重置</a>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  props: {
  },
  data() {
    return {
      form: {
        noticeText: "",
        textColor: "rgb(102, 102, 102)",
        backGColor: "rgb(255, 248, 233)"
      },
      rules: {
        noticeText: [{ required: true, message: "请填写公告", trigger: "blur" }]
      }
    };
  },
  mounted() {
  },
  methods: {
    inputNotice() {
      this.$emit("setModeVal", this.form);
    },
    tipFun() {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          this.tipFunBool = true;
          this.$message.error("请填写公告！");
          return false;
        }
      });
    },
    colorReset(params, color) {
      this.form[params] = color;
      this.$emit("setModeVal", this.form);
    },
    changeStyleSearch() {
      this.$emit("setModeVal", this.form);
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
.setInputNotice .el-form-item__content {
  flex: 1;
}
.setInputNotice .el-input {
  width: 100%;
}
</style>