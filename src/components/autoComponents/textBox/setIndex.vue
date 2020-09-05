<template>
  <div class="textBox-style">
    <div class="rc-design-editor-component-title">文本</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="文本:" prop="textContent">
        <el-input
          @input="changeStyleSearch"
          :rows="4"
          type="textarea"
          resize="none"
          v-model="form.textContent"
          maxlength="100"
          placeholder="请输入要说明的文字, 最多100字"
        ></el-input>
      </el-form-item>
      <el-form-item label="字体大小:" style="margin-top:20px;">
        <el-radio-group v-model="form.fontSize" @change="changeStyleSearch">
          <el-radio label="18">大</el-radio>
          <el-radio label="14">中</el-radio>
          <el-radio label="12">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="styleFlex">
        <el-form-item label="文本颜色:" class="clearLeft">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.fontColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('fontColor','rgb(0, 0, 0)')">重置</a>
        </el-form-item>
      </div>
      <div class="styleFlex">
        <el-form-item label="背景颜色:">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.backGColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('backGColor','rgb(255, 255, 255)')">重置</a>
        </el-form-item>
      </div>
      <el-form-item label="显示位置:" style="margin-top:20px;">
        <el-radio-group v-model="form.textAlign" @change="changeStyleSearch">
          <el-radio label="left">居左</el-radio>
          <el-radio label="center">居中</el-radio>
          <el-radio label="right">居右</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接:" style="margin-top:20px;">
        <a-dropdwn-link @clickDropdown="clickDropdown"></a-dropdwn-link>
      </el-form-item>
      <el-form-item label="更多设置:" class="setbottomLine" style>
        <el-checkbox-group v-model="form.bottomLine" @change="changeStyleSearch">
          <el-checkbox>显示底部分割线</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import aDropdwnLink from "../a-dropdwn-link/index";
export default {
  mixins: [Mixins],
  components: { aDropdwnLink },
  data() {
    return {
      form: {
        textContent: "",
        //18;14;12
        fontSize: "14",
        fontColor: "rgb(0, 0, 0)",
        backGColor: "rgb(255, 255, 255)",
        //left,center,right
        textAlign: "left",
        //   跳转链接
        urlClick: "",
        //底部分割线 false无true有
        bottomLine: false
      },
      rules: {
        textContent: [
          { required: true, message: "请填写文本内容", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    tipFun() {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          this.tipFunBool = true;
          this.$message.error("请填写文本内容!");
          return false;
        }
      });
    },
    changeStyleSearch() {
      // bus.$emit("textBoxFun", this.form, "textBoxFun");

      this.$emit("setModeVal", this.form);
    },
    colorReset(params, rgb) {
      this.form[params] = rgb;
      // bus.$emit("textBoxFun", this.form, "textBoxFun");
      this.$emit("setModeVal", this.form);
    },
    clickDropdown(val) {
      this.form.urlClick = val.url;
      this.$emit("setModeVal", this.form);
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

/* //链接url */
.textBox-style {
  .setbottomLine {
    margin-top: 20px;
    display: flex;
    height: 40px;
    align-items: center;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>